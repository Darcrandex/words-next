/**
 * @name ScreenLoading
 * @description 全屏 loading 遮罩
 * @author darcrand
 */

import classNames from 'classnames'
import './styles.less'

interface ScreenLoadingProps {
  loading?: boolean
  zIndex?: number
}

const ScreenLoading: React.FC<ScreenLoadingProps> = props => {
  return (
    <>
      <section
        className={classNames('cover-container', props.loading ? 'show' : 'hide')}
        style={{ zIndex: props.zIndex || 10 }}
      >
        <i className='loading-ico'></i>
      </section>
    </>
  )
}

export default ScreenLoading
