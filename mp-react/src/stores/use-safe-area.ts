import { atom, useRecoilState } from 'recoil'

const stateAtom = atom<TaroGeneral.SafeAreaResult>({
  key: 'safe-area',
  default: { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 }
})

export function useSafeArea() {
  const [safeArea, updateSafeArea] = useRecoilState(stateAtom)
  return { safeArea, updateSafeArea }
}
