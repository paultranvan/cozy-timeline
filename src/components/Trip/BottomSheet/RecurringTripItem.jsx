import React from 'react'
import { OTHER_PURPOSE } from 'src/constants'

import Icon from 'cozy-ui/transpiled/react/Icon'
import Refresh from 'cozy-ui/transpiled/react/Icons/Refresh'
import ListItem from 'cozy-ui/transpiled/react/ListItem'
import ListItemIcon from 'cozy-ui/transpiled/react/ListItemIcon'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

const RecurringTripItem = ({ isRecurringTrip, purpose, onClick }) => {
  const { t } = useI18n()

  if (purpose === OTHER_PURPOSE) {
    return null
  }
  return (
    <ListItem button onClick={onClick}>
      <ListItemIcon>
        <Icon icon={Refresh} />
      </ListItemIcon>
      <ListItemText
        primary={t('recurring.title')}
        primaryTypographyProps={{ variant: 'caption' }}
        secondary={t(
          `recurring.${isRecurringTrip ? 'recurringTrip' : 'occasionalTrip'}`
        )}
        secondaryTypographyProps={{ variant: 'body1', color: 'textPrimary' }}
      />
    </ListItem>
  )
}

export default RecurringTripItem
