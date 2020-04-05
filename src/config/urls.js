import config from '@/config/index'

export default {
  test: {
    test: `${config.host.demo}/test`
  },
  core: {
    login: `${config.host.core}/login`,
    userInfo: `${config.host.core}/userInfo`
  },
  cms: {
    policyList: `${config.host.cms}/policyList`
  }
}
