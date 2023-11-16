const path = require('path');
const fs = require('fs/promises');
const toml = require('@iarna/toml');

const ROOT = path.resolve(`${__dirname}/../..`);
async function getPreset() {
  if (!process.env.TEST_TOML) {
    return 'main';
  }
  const config = await fs.readFile(`${ROOT}/${process.env.TEST_TOML}`, 'utf8');
  const { setting } = toml.parse(config);
  return setting?.target_preset?.defaultValue ?? 'main';
}

module.exports = {
  getPreset,
};
