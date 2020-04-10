const devGatewayUrl = 'http://localhost:8765'
const devBlobUrl = 'http://localhost:1234'

const uatGatewayUrl = ''
const uatBlobUrl = ''

const prodGatewayUrl = ''
const prodBlobUrl = ''

const getHost = (gatewayUrl, blobUrl) => {
  return {
    host: gatewayUrl, // 网关
    blobUrl: blobUrl, // 文件上传
    coreHost: `${gatewayUrl}`, // 核心模块
    cms: `${gatewayUrl}/api/cms`,
    sys: `${gatewayUrl}/api/operation`
  }
}

const envHostMap = {
  development: getHost(devGatewayUrl, devBlobUrl),
  dev: getHost(devGatewayUrl, devBlobUrl),
  sit: getHost(devGatewayUrl, devBlobUrl),
  uat: getHost(uatGatewayUrl, uatBlobUrl),
  prod: getHost(prodGatewayUrl, prodBlobUrl)
}

/**
 * 定义系统业务相关的配置
 */
const config = {
  isMock: true,
  isMockMenu: true,
  host: {
    core: '',
    cms: '',
    sys: ''
  },
  info: {
    title: '{{titleZH}}',
    subtitle: '{{titleEN}}'
  },
  /**
   * 路由的白名单
   */
  whiteList: [
    '/login',
    '/authredirect'
  ]
}

config.host = envHostMap[process.env.NODE_ENV]

export default config
