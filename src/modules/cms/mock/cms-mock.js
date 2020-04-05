import Mock from 'mockjs'
import urls from '@/config/urls'

Mock.mock(urls.cms.policyList, 'post', () => {
  return require('./json/policy-list')
})
