const axios = require('axios');
const color = require('cli-color');
const terminalLink = require('terminal-link');
const compareVersions = require('compare-versions');

module.exports = async (v) => {
  try {
    const { data } = await axios.get('https://nodejs.org/dist/index.json');
    return data
      .filter((node) => {
        const cp = v
          ? compareVersions(node.version, 'v' + v + '.0.0') >= 0
          : true;
        return node.lts && cp;
      })
      .map((it) => {
        const { files, ...rest } = it;
        return { ...rest };
      });
  } catch (e) {
    console.log(e);
  }
};
