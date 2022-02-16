import { http } from '@/utils/http'
import Taro from '@tarojs/taro'

// 数据库把 openid 绑定到了用户
export interface UserModel extends Taro.UserInfo {
  openid?: string
}

export async function apiUserLogin(code: string) {
  return http.post<{ user: UserModel; openid: string }>('/user/login', { code })
}

export async function apiUserSignUp(user: UserModel) {
  return http.post('/user/sign-up', (user as unknown) as Record<string, unknown>)
}
