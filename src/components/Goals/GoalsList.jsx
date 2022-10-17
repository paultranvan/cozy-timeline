import React from 'react'

import Typography from 'cozy-ui/transpiled/react/Typography'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'

import BikeGoalManager from 'src/components/Goals/BikeGoal/BikeGoalManager'

const GoalsList = () => {
  const { t } = useI18n()

  return (
    <>
      <Typography
        className="u-mb-1-s u-mt-1 u-mb-1-s u-mb-2 u-ml-1"
        variant="h5"
      >
        {t('bikeGoal.goals')}
      </Typography>
      <BikeGoalManager />
    </>
  )
}

export default GoalsList
