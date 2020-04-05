import { post, get } from '@/base/axios'
import urls from '@/config/urls'

/** 登录 */
export const login = param => post(urls.core.login, param)

/** 获取当前用户的全部信息（基本信息、数据权限、功能权限） */
export const getUserInfo = () => get(urls.core.userInfo)
