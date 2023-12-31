import PropTypes from 'prop-types'
import React from 'react'

import { ConfirmDialog } from 'cozy-ui/transpiled/react/CozyDialogs'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

const DaccReasonsDialog = ({ open, onClose }) => {
  const { t } = useI18n()

  return (
    <ConfirmDialog
      open={open}
      onClose={onClose}
      title={t('dacc.reasonsDialog.title')}
      content={t('dacc.reasonsDialog.content')}
    />
  )
}

DaccReasonsDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

export default DaccReasonsDialog
