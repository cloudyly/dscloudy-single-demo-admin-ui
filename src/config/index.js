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
    memberHost: `${gatewayUrl}/api/member`, // 会员模块
    marketHost: `${gatewayUrl}/api/campaign`, // 营销模块
    operateHost: `${gatewayUrl}/api/operation`, // 运营模块
    sysHost: `${gatewayUrl}/api/operation`, // 运营模块
    internalHost: `${gatewayUrl}/api/internalIntegration`, // 内部集成
    externalHost: `${gatewayUrl}/api/externalIntegration` // 外部集成
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
  isMock: false,
  isMockMenu: false,
  host: {
    demo: ''
  },
  info: {
    // title: '山西省农业补贴管理平台',
    // subtitle: 'Shanxi agricultural subsidy management platform'
    title: '微前端技术测试',
    subtitle: 'Micro Font End Technical Test'
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
  isPwdSafeKeyName: 'HLA-SCRM-ADMIN-IsPwdSafe',
  azName: 'ibmztimg',
  azSas: '?sv=2018-03-28&ss=b&srt=sco&sp=rwdlac&se=2021-12-11T13:51:24Z&st=2019-11-06T05:51:24Z&spr=https,http&sig=lL3mytxDXKYbdgvSfQXhXKG3QtYIRrYrNdRw0Y%2BeHWY%3D',
  aesKey: 'a8e7w5f9r7d1e8r1'
}

config.host = envHostMap[process.env.NODE_ENV]

export default config
