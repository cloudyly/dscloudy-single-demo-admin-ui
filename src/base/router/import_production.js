module.exports = file => () => {
  return import('@/modules/' + file + '.vue')
}
