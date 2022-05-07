// 首页点击分类链接，跳转到 market 页面，需要带参数
// 但是 tab 页面不能带参数，所以把它存到全局
import { atom, useRecoilState } from 'recoil'

const stateAtom = atom<{ categoryId?: string }>({
  key: 'market-params',
  default: { categoryId: undefined }
})

export function useMarketParams() {
  const [params, setParams] = useRecoilState(stateAtom)
  return { params, setParams }
}
