// const devGatewayUrl = 'http://localhost:8765'
const devGatewayUrl = 'http://172.18.208.29:8765'
const devBlobUrl = 'http://172.18.208.38'

const uatGatewayUrl = 'http://172.18.8.88:8765'
const uatBlobUrl = 'http://172.18.8.88:8999'

const prodGatewayUrl = 'http://172.18.8.89:8765'
const prodBlobUrl = 'http://172.18.8.89:8999'

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
    title: '山西省农业补贴管理平台',
    subtitle: 'Shanxi agricultural subsidy management platform'
    // title: '微前端技术测试',
    // subtitle: 'Micro Font End Technical Test'
  },
  /**
   * 路由的白名单
   */
  whiteList: [
    '/login',
    '/authredirect'
  ],
  tokenKeyName: 'HLA-SCRM-ADMIN-Token',
  usernameKeyName: 'HLA-SCRM-ADMIN-UerName',
  isPwdSafeKeyName: 'HLA-SCRM-ADMIN-IsPwdSafe'
}

config.host = envHostMap[process.env.NODE_ENV]

export default config
