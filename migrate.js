
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

const convert = (conf) => {
  const c = Object.assign({}, {
    test: conf.test,
    use: getLoader(conf).map( (loader) => {
      return convertLoader(loader, conf)
    })
  })
  return c
}

module.exports = (config) => {
  return config.map( (conf) => {
    return convert(conf)
  })
}