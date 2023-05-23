const { cache } = require('../infraestructure/cache/cache.config');

const saveData = async (key, payload)=>{
  let userData = cache.get(key);
  userData = userData ? {...userData, ...payload}: {...payload};
  cache.set(key, userData);
};

const deleteData = async (key)=> cache.take(key)

module.exports.cacheService = {
  saveData,
  deleteData
};