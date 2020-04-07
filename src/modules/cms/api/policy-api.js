import { get } from '@/base/axios'
import urls from '@/config/urls'

/** 登录 */
export const getDetails = id => get(`${urls.cms.policyDetails}/${id}`)
