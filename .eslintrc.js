module.exports = require(`deepmerge`)(
  {
    env: { jest: true },
  },
  require(`@jgierer12/js-configs/eslint`),
  require(`@jgierer12/js-configs/eslint/react`)
);
