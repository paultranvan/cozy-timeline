import React, { useMemo } from 'react'

import Typography from 'cozy-ui/transpiled/react/Typography'

const createStyles = ({ highlighted }) => ({
  infoBlock: {
    backgroundColor: highlighted ? 'var(--primaryColor)' : 'none',
    margin: '0.5rem'
  },
  typography: {
    ...(highlighted && {
      color: 'var(--primaryContrastTextColor)'
    })
  }
})

const InfoBlock = ({ title, value, highlighted }) => {
  const styles = useMemo(() => createStyles({ highlighted }), [highlighted])

  return (
    <div
      style={styles.infoBlock}
      className="u-h-100 u-flex u-flex-column u-flex-items-center u-flex-justify-center u-flex-grow-1  u-bdrs-4"
    >
      <Typography style={styles.typography} variant="caption">
        {title}
      </Typography>
      <Typography
        style={styles.typography}
        variant={highlighted ? 'h6' : 'body1'}
      >
        {value}
      </Typography>
    </div>
  )
}

export default React.memo(InfoBlock)
