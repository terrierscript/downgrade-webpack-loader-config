const flatten = require("lodash.flatten")

const getLoader = (conf) => (
  (!!conf.loaders) ? conf.loaders : [conf.loader]
)
const getOption = (conf) => (
  (!!conf.query) ? { options: conf.query } : {}
)


const convertLoader = (loader, conf) => {
  return Object.assign({}, {
    loader
  }, getOption(conf) )
}

const wrap = (key, item) => ( !!item ? {[key]: item} : {} )

const convert = (configs, enforce) => {
  if(!configs){
    return []
  }
  return configs.map(conf => {
    return Object.assign({}, {
      test: conf.test,
      use: getLoader(conf).map( (loader) => {
        return convertLoader(loader, conf)
      }, wrap("enforce", enforce))
    })
  })
}

module.exports = (config) => {
  return flatten([
    convert(config.preLoaders, "pre"),
    convert(config.loaders),
    convert(config.postLoaders, "post")
  ])
}