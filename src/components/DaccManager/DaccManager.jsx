import React, { useState } from 'react'

import { isQueryLoading, useClient, useQuery } from 'cozy-client'

import { SETTINGS_DOCTYPE } from 'src/doctypes'
import { buildSettingsQuery } from 'src/queries/queries'
import DaccBanner from 'src/components/DaccBanner/DaccBanner'
import DaccCompareDialog from 'src/components/DaccManager/DaccCompareDialog'
import DaccPermissionsDialog from 'src/components/DaccManager/DaccPermissionsDialog'
import DaccReasonsDialog from 'src/components/DaccManager/DaccReasonsDialog'

const DaccManager = () => {
  const [showCompareDialog, setShowCompareDialog] = useState(false)
  const [showPermissionsDialog, setShowPermissionsDialog] = useState(false)
  const [showReasonsDialog, setShowReasonsDialog] = useState(false)
  const client = useClient()
  const settingsQuery = buildSettingsQuery()
  const { data: settings, ...settingsQueryLeft } = useQuery(
    settingsQuery.definition,
    settingsQuery.options
  )

  const isLoading = isQueryLoading(settingsQueryLeft)

  if (isLoading) {
    return null
  }

  const CO2Emission = settings[0]?.CO2Emission || {}

  const { showAlert = true, sendToDacc = false } = CO2Emission

  const handleOnDiscard = () => {
    client.save({
      ...settings[0],
      _type: SETTINGS_DOCTYPE,
      CO2Emission: {
        ...CO2Emission,
        showAlert: false
      }
    })
  }

  const handleOnAccept = () => {
    client.save({
      ...settings[0],
      _type: SETTINGS_DOCTYPE,
      CO2Emission: {
        ...CO2Emission,
        showAlert: false,
        sendToDACC: true
      }
    })
  }

  return (
    <>
      {showAlert && !sendToDacc && (
        <DaccBanner
          onDiscard={handleOnDiscard}
          onAccept={() => setShowCompareDialog(true)}
        />
      )}
      <DaccCompareDialog
        open={showCompareDialog}
        onClose={() => setShowCompareDialog(false)}
        showDaccPermissionsDialog={() => {
          setShowCompareDialog(false)
          setShowPermissionsDialog(true)
        }}
      />
      <DaccPermissionsDialog
        open={showPermissionsDialog}
        onClose={() => setShowPermissionsDialog(false)}
        onAccept={() => {
          handleOnAccept()
          setShowPermissionsDialog(false)
        }}
        showDaccReasonsDialog={() => setShowReasonsDialog(true)}
      />
      <DaccReasonsDialog
        open={showReasonsDialog}
        onClose={() => setShowReasonsDialog(false)}
      />
    </>
  )
}

export default DaccManager
