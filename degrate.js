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

module.exports = (config) => {
  return flatten(config.map( (conf) => {
    return convert(conf)
  }))
}