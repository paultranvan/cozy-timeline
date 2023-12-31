import React from 'react'
import EmptySvg from 'src/assets/icons/empty.svg'

import Empty from 'cozy-ui/transpiled/react/Empty'
import useBreakpoints from 'cozy-ui/transpiled/react/providers/Breakpoints'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

const EmptyContent = () => {
  const { t } = useI18n()
  const { isMobile } = useBreakpoints()

  return (
    <Empty
      data-testid="EmptyContent"
      className={isMobile ? 'u-p-1' : 'u-flex-justify-start u-p-3'}
      icon={EmptySvg}
      iconSize="large"
      title={t('empty.title')}
      text={t('empty.text')}
    />
  )
}

export default EmptyContent
