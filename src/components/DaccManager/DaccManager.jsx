import React, { useState } from 'react'

import DaccPermissionsDialog from 'src/components/DaccManager/DaccPermissionsDialog'
import DaccReasonsDialog from 'src/components/DaccManager/DaccReasonsDialog'

const DaccManager = ({ onClose, onRefuse, onAccept, componentProps }) => {
  const [showReasonsDialog, setShowReasonsDialog] = useState(false)

  return (
    <>
      <DaccPermissionsDialog
        open
        onClose={onClose}
        onRefuse={onRefuse}
        onAccept={onAccept}
        showDaccReasonsDialog={() => setShowReasonsDialog(true)}
        {...componentProps.DaccPermissionsDialog}
      />
      {showReasonsDialog && (
        <DaccReasonsDialog open onClose={() => setShowReasonsDialog(false)} />
      )}
    </>
  )
}

export default DaccManager
