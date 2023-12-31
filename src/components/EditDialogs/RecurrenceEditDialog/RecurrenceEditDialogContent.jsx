import React from 'react'

import List from 'cozy-ui/transpiled/react/List'
import ListItem from 'cozy-ui/transpiled/react/ListItem'
import ListItemIcon from 'cozy-ui/transpiled/react/ListItemIcon'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import Radio from 'cozy-ui/transpiled/react/Radios'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

const RecurrenceEditDialogContent = ({ recurring, setRecurring }) => {
  const { t } = useI18n()

  return (
    <List>
      <ListItem button onClick={() => setRecurring(false)}>
        <ListItemIcon>
          <Radio value="no" checked={!recurring} />
        </ListItemIcon>
        <ListItemText primary={t('recurring.occasionalTrip')} />
      </ListItem>
      <ListItem button onClick={() => setRecurring(true)}>
        <ListItemIcon>
          <Radio value="yes" checked={recurring} />
        </ListItemIcon>
        <ListItemText primary={t('recurring.recurringTrip')} />
      </ListItem>
    </List>
  )
}

export default RecurrenceEditDialogContent
