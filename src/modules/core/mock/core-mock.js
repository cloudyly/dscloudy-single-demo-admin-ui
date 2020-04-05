import Mock from 'mockjs'
import urls from '@/config/urls'

Mock.mock(urls.core.login, 'post', () => {
  return require('./json/login')
})
Mock.mock(urls.core.userInfo, 'get', () => {
  return require('./json/user-info')
})
