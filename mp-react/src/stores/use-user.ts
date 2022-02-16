import Taro from '@tarojs/taro'
import { atom, useRecoilState } from 'recoil'
import { apiUserLogin, apiUserSignUp, UserModel } from '@/apis/user'

const stateAtom = atom<UserModel>({
  key: 'user',
  default: {
    openid: undefined,
    avatarUrl: '',
    city: '',
    country: '',
    gender: 0,
    language: 'zh_CN',
    nickName: '',
    province: ''
  }
})

export function useUser() {
  const [info, setInfo] = useRecoilState(stateAtom)

  // 进入 app 自动登录
  const loginOnLaunch = async () => {
    // 1. 微信登录，获取当前会话的 code（有效时间5分钟）
    const { code } = await Taro.login()
    // 2. 后台通过 code 获取当前用户的 openid
    const res = await apiUserLogin(code)

    // 如果有用户直接设置
    if (res.user) {
      setInfo(res.user)
    } else if (res.openid) {
      // 没有则保存 openid，为后续注册准备
      setInfo(prev => Object.assign(prev, { openid: res.openid }))
    }
  }

  const signUp = async () => {
    if (info.nickName) return
    const res = await Taro.getUserProfile({ desc: '登录' })

    // 注册时，合并保存的 openid，保存到后台
    const userInfo = Object.assign({}, res.userInfo, { openid: info.openid })
    await apiUserSignUp(userInfo)
    setInfo(userInfo)
  }

  return { info, loginOnLaunch, signUp }
}
