const nodeCache = require("node-cache");
const cache = new nodeCache({
  stdTTL: 900,
  checkperiod: 0,
  useClones: false,
  deleteOnExpire: true,
  enableLegacyCallbacks: false,
  maxKeys: -1
});

module.exports.cache = cache;
