import { http } from '@/utils/http'
import Taro from '@tarojs/taro'

// 数据库把 openid 绑定到了用户
export interface UserModel extends Taro.UserInfo {
  _id?: string
  openid?: string
}

export async function apiUserLogin(code: string) {
  // 如果登录失败，只返回 openid
  // 如果成功，返回 user，token
  return http.post<{ user: UserModel; openid: string; token?: string }>('/user/login', { code })
}

export async function apiUserSignUp(user: UserModel) {
  return http.post<{ user: UserModel }>('/user/sign-up', (user as unknown) as Record<string, unknown>)
}
