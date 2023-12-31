import React from 'react'
import { useNavigate } from 'react-router-dom'
import BikeGoalChart from 'src/components/Goals/BikeGoal/BikeGoalChart'
import BikeGoalSummaryDaccItems from 'src/components/Goals/BikeGoal/BikeGoalSummaryDaccItems'
import BikeGoalSummaryYearlyItem from 'src/components/Goals/BikeGoal/BikeGoalSummaryYearlyItem'
import { useAccountContext } from 'src/components/Providers/AccountProvider'
import { filterTimeseriesByYear } from 'src/lib/timeseries'
import {
  buildBikeCommuteTimeseriesQueryByAccountId,
  buildSettingsQuery
} from 'src/queries/queries'

import { isQueryLoading, useQueryAll, useQuery } from 'cozy-client'
import Paper from 'cozy-ui/transpiled/react/Paper'
import Spinner from 'cozy-ui/transpiled/react/Spinner'
import Typography from 'cozy-ui/transpiled/react/Typography'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

const style = {
  paper: { gap: '1rem' },
  div: { height: 65 }
}

const BikeGoalSummary = () => {
  const { t } = useI18n()
  const navigate = useNavigate()
  const { account, isAccountLoading } = useAccountContext()

  const settingsQuery = buildSettingsQuery()
  const { data: settings, ...settingsQueryLeft } = useQuery(
    settingsQuery.definition,
    settingsQuery.options
  )
  const isSettingsLoading = isQueryLoading(settingsQueryLeft)

  const timeseriesQuery = buildBikeCommuteTimeseriesQueryByAccountId(
    { accountId: account?._id },
    Boolean(account)
  )
  const { data: timeseries, ...timeseriesQueryLeft } = useQueryAll(
    timeseriesQuery.definition,
    timeseriesQuery.options
  )

  const isLoadingTimeseriesQuery =
    isQueryLoading(timeseriesQueryLeft) || timeseriesQueryLeft.hasMore

  const isLoading =
    isAccountLoading || isLoadingTimeseriesQuery || isSettingsLoading

  if (isLoading) {
    return (
      <Paper
        elevation={2}
        className="u-flex u-flex-items-center u-mh-1-s u-mh-2 u-mb-1 u-flex-items-start"
      >
        <Spinner size="xlarge" className="u-m-1" />
      </Paper>
    )
  }

  const currentYear = new Date().getFullYear().toString()
  const timeseriesByYear = filterTimeseriesByYear(timeseries, currentYear)
  const sendToDACC = !!settings?.[0].bikeGoal?.sendToDACC

  return (
    <>
      <Paper
        elevation={2}
        className="u-flex u-flex-items-start-s u-flex-items-center u-mh-1-s u-mh-2 u-mb-1 u-p-1 u-c-pointer"
        style={style.paper}
        onClick={() => navigate(`/bikegoal/${currentYear}/trips`)}
      >
        <div style={style.div}>
          <BikeGoalChart
            timeseries={timeseriesByYear}
            sendToDACC={sendToDACC}
            size="small"
          />
        </div>
        <div>
          <Typography variant="h6">{t('bikeGoal.title')}</Typography>
          {sendToDACC ? (
            <BikeGoalSummaryDaccItems timeseries={timeseriesByYear} />
          ) : (
            <BikeGoalSummaryYearlyItem
              timeseriesByYear={timeseriesByYear}
              variant="caption"
              preLine
            />
          )}
        </div>
      </Paper>
    </>
  )
}

export default BikeGoalSummary
