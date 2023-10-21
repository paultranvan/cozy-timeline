import isSameDay from 'date-fns/isSameDay'
import React, { useCallback } from 'react'
import {
  getAccountLabel,
  useAccountContext
} from 'src/components/Providers/AccountProvider'
import Titlebar from 'src/components/Titlebar'
import { getStartDate } from 'src/lib/timeseries'
import {
  buildAggregatedTimeseriesQuery,
  buildPhotosQueryByDatetime
} from 'src/queries/queries'

import {
  hasQueryBeenLoaded,
  isQueryLoading,
  useClient,
  useQuery
} from 'cozy-client'
import Label from 'cozy-ui/transpiled/react/Label'
import List from 'cozy-ui/transpiled/react/List'
import LoadMore from 'cozy-ui/transpiled/react/LoadMore'
import Spinner from 'cozy-ui/transpiled/react/Spinner'
import useBreakpoints from 'cozy-ui/transpiled/react/providers/Breakpoints'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import PhotoBoard from './PhotoBoard'
import PhotoList from './PhotoList'
import Photos from './Photos'
import { getPhotoLink, groupByDay } from './helpers'
import TripProvider from '../Providers/TripProvider'
import SpinnerOrEmptyContent from '../SpinnerOrEmptyContent'
import TripMap from '../Trip/TripMap'
import { TripItem } from '../TripItem'
import ActivitiesByDay from './ActivitiesByDay'

const styles = {
  map: {
    height: '300px',
    width: '30%'
  },
  divider: {
    margin: '10px -32px 25px'
  }
}

export const Timeline = () => {
  const { t } = useI18n()
  const { isMobile } = useBreakpoints()
  const client = useClient()
  const { account, isAccountLoading } = useAccountContext()

  const hasDateHeader = useCallback((timeserie, timeseries, index) => {
    if (!timeserie || !timeseries || timeseries.length < 1) {
      return false
    }
    return (
      index === 0 ||
      !isSameDay(getStartDate(timeserie), getStartDate(timeseries[index - 1]))
    )
  }, [])

  const timeseriesQuery = buildAggregatedTimeseriesQuery({
    accountId: account?._id,
    limitBy: 10
  })
  const photosQuery = buildPhotosQueryByDatetime({
    limitBy: 10
  })

  const { data: timeseries, ...timeseriesQueryLeft } = useQuery(
    timeseriesQuery.definition,
    timeseriesQuery.options
  )
  const { data: photos, ...photosQueryLeft } = useQuery(
    photosQuery.definition,
    photosQuery.options
  )

  const isLoadingTimeseriesQuery =
    isQueryLoading(timeseriesQueryLeft) &&
    !hasQueryBeenLoaded(timeseriesQueryLeft)

  const isLoadingPhotosQuery =
    isQueryLoading(photosQueryLeft) && !hasQueryBeenLoaded(photosQueryLeft)

  const isLoadingOrEmpty =
    !account ||
    isAccountLoading ||
    isLoadingTimeseriesQuery ||
    timeseries.length === 0 ||
    isLoadingPhotosQuery

  if (isLoadingOrEmpty) {
    return (
      <SpinnerOrEmptyContent
        account={account}
        isAccountLoading={isAccountLoading}
        isQueryLoading={isLoadingTimeseriesQuery}
        timeseries={timeseries}
      />
    )
  }

  console.log('timeseries : ', timeseries?.length)
  return (
    <>
      <Titlebar label={t('trips.from') + ' ' + getAccountLabel(account)} />
        <ActivitiesByDay photos={photos} trips={timeseries} />
        {/*
        <List>

          {timeseries.map((timeserie, index) => (
            <div key={`${timeserie._id}`} className="u-mt-1">
              <PhotoList photos={[photos?.[index]]} />
              <TripProvider timeserie={timeserie}>
                <TripItem
                  timeserie={timeserie}
                  hasDateHeader={hasDateHeader(timeserie, timeseries, index)}
                />
                <div style={styles.map}>
                  <TripMap />
                </div>
              </TripProvider>
            </div>
          ))} 
        </List> */}
      {/* {timeseriesQueryLeft.hasMore && (
        <LoadMore
          label={t('loadMore')}
          fetchMore={timeseriesQueryLeft.fetchMore}
        />
      )} */}
    </>
  )
}

export default Timeline
