#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');
const { extractChain } = require('viem');
const chains = require('viem/chains');
const pako = require('pako');
const { prettyMd, prettyHtml } = require('./docgen/lib/pretty');
const { addrHtmlLink } = require('./docgen/lib/addrLink');
const { rawValue, readableNumber, readableWei } = require('./docgen/lib/numbers');
const { ethers } = require('ethers');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

const CACHE_DIR = path.resolve(__dirname, './tmp');

async function exists(filePath) {
  return fs.promises.access(filePath, fs.constants.R_OK | fs.constants.W_OK).then(
    () => true,
    () => false
  );
}

function renderSettingsValue({ chainId, val }) {
  if (val.startsWith('0x') && val.length === 42) {
    return addrHtmlLink(chainId, val);
  }
  if (`${parseFloat(val)}` === val) {
    const num = ethers.BigNumber.from(val);
    if (num.gt(1e10)) {
      return readableWei(num);
    }
    return readableNumber(val);
  }
  return val;
}

async function getFromIpfs(qm) {
  const filePath = path.resolve(CACHE_DIR, `${qm}.json`);
  if (await exists(filePath)) {
    return require(filePath);
  }
  const res = await fetch(`https://ipfs.synthetix.io/ipfs/${qm}`);
  const buffer = await res.arrayBuffer();
  const data = JSON.parse(pako.inflate(buffer, { to: 'string' }));
  await fs.promises.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
  return data;
}

async function dashboard() {
  await fs.promises.mkdir(CACHE_DIR, { recursive: true });

  const out = [];

  const deploymentFiles = (await fs.promises.readdir(path.resolve(__dirname, './cannon'))).filter(
    (file) => path.extname(file) === '.json'
  );
  for await (const deploymentFile of deploymentFiles) {
    const [chainIdString, preset] = path.basename(deploymentFile, '.json').split('-');
    const chainId = Number(chainIdString);
    const chain = extractChain({ chains: Object.values(chains), id: chainId });
    const prettyPreset = `${preset.slice(0, 1).toUpperCase()}${preset.slice(1)}`;
    out.push(`# ${chain.name} (${chain.id}, ${prettyPreset})`);

    const table = [];
    table.push(`
      <table data-full-width="true">
        <thead>
          <tr>
            <th width="200">Import name</th>
            <th width="400">Provisioned package</th>
            <th width="500">IPFS (zlib compressed)</th>
            <th width="500">Settings</th>
          </tr>
        </thead>
        <tbody>
    `);

    const cannon = require(path.resolve(__dirname, './cannon', deploymentFile));

    const provisions = Object.keys(cannon.state).filter((key) => key.startsWith('provision.'));
    for await (const provision of provisions) {
      const [, importName] = provision.split('.');
      const { url, settings } = cannon.state[provision].artifacts.imports[importName];
      const loc = new URL(url);
      if (loc.protocol === 'ipfs:') {
        const data = await getFromIpfs(loc.host);
        const name = data.def?.name;
        const version =
          data.def?.version === '<%= package.version %>' ? data.meta?.version : data.def?.version;
        const qm = loc.host;
        log({
          importName,
          name,
          version,
          chainId,
          preset,
          description: data.def?.description ?? data.meta?.description,
          url: `https://usecannon.com/packages/${name}/${version}/${chainId}-${preset}`,
          ipfs: qm,
          settings,
        });

        table.push(`
          <tr>
            <td>${importName}</td>
            <td><a href="https://usecannon.com/packages/${name}/${version}/${chainId}-${preset}">${name}:${version}@${preset}</a></td>
            <td><a href="https://ipfs.synthetix.io/ipfs/${qm}">${qm}</a></td>
            <td>${
              settings
                ? Object.entries(settings)
                    .map(([key, val]) => `${key}: ${renderSettingsValue({ chainId, val })}`)
                    .join('<br />')
                : 'n/a'
            }</td>
          </tr>
        `);
      }
    }

    out.push(await prettyHtml(table.join('\n')));
  }

  return out.join('\n');
}

module.exports = {
  dashboard,
};

if (require.main === module) {
  require('./inspect');
  dashboard().then(prettyMd).then(console.log);
}
