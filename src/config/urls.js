import config from '@/config/index'

export default {
  core: {
    login: `${config.host.core}/login`,
    userInfo: `${config.host.core}/userInfo`
  },
  demo: {
    demoList: `${config.host.cms}/demoList`,
    demoDetails: `${config.host.cms}/demoById`
  }
}
