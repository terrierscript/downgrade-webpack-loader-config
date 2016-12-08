
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
const convert = (conf, enforce) => {
  const c = Object.assign({}, {
    test: conf.test,
    use: getLoader(conf).map( (loader) => {
      return convertLoader(loader, conf)
    }, wrap("enforce", enforce))
  })
  return c
}

module.exports = (config) => {
  return config.map( (conf) => {
    return convert(conf)
  })
}