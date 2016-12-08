// https://webpack.js.org/guides/migrating/
const flatten = require("lodash.flatten")

const getLoader = (loaderConf) => {
  const loader = (typeof loaderConf === "string") ? loaderConf :loaderConf.loader
  return { loader }
}
const getQuery = (loader) => (
  (!!loader.options) ? { query: loader.options } : {}
)

const convert = (conf) => {
  return flatten(conf.use.map( (loaderConf) => {
    return Object.assign(
      { test: conf.test },
      getLoader(loaderConf),
      getQuery(loaderConf)
    )
  }))
}

const convertLoaders = (config) => {
  return flatten(config.map( (conf) => {
    return convert(conf)
  }) )
}

const filterConfig = (config, enfoceFlag) => {
  return config.filter( (conf) => {
    if(enfoceFlag == null && !conf.enforce){
      return true
    }
    return conf.enforce === enfoceFlag
  })
}
const convertEnfoceLoaders = (config, key, enfoceFlag) => {
  const filterd = filterConfig(config, enfoceFlag)
  if(filterd.length === 0){
    return {}
  }
  return {
    [key]: convertLoaders(filterd)
  }
}

module.exports = (config) => {
  return Object.assign(
    convertEnfoceLoaders(config, "preLoaders", "pre"),
    convertEnfoceLoaders(config, "loaders", null),
    convertEnfoceLoaders(config, "postLoaders", "post")
  )
}