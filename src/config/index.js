const devGatewayUrl = 'http://localhost:8765'
const uatGatewayUrl = ''
const prodGatewayUrl = ''

const getHost = (gatewayUrl) => {
  return {
    host: gatewayUrl, // 网关
    coreHost: `${gatewayUrl}`, // 核心模块
    demoHost: `${gatewayUrl}/api/demo`,
    sysHost: `${gatewayUrl}/api/operation`
  }
}

const envHostMap = {
  development: getHost(devGatewayUrl),
  dev: getHost(devGatewayUrl),
  sit: getHost(devGatewayUrl),
  uat: getHost(uatGatewayUrl),
  prod: getHost(prodGatewayUrl)
}

/**
 * 定义系统业务相关的配置
 */
const config = {
  isMock: true,
  isMockMenu: true,
  host: {
    coreHost: '',
    sysHost: '',
    demoHost: ''
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
