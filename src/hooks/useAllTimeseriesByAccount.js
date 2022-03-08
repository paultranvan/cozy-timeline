import { useContext } from 'react'

import { isQueryLoading, useQuery } from 'cozy-client'

import { AccountContext } from 'src/components/AccountProvider'
import {
  buildGeoJSONQueryByAccountIdNoLimit,
  buildAccountQuery
} from 'src/queries/queries'

const useAllTimeseriesByAccount = () => {
  const { selectedAccount } = useContext(AccountContext)

  const accountQuery = buildAccountQuery()
  const { data: accounts, ...accountQueryRes } = useQuery(
    accountQuery.definition,
    accountQuery.options
  )

  const isAccountLoading = isQueryLoading(accountQueryRes)

  const account = isAccountLoading ? null : selectedAccount || accounts[0]

  const geoJsonQuery = buildGeoJSONQueryByAccountIdNoLimit(account?._id)
  const { data: timeseries, ...timeseriesQueryResult } = useQuery(
    geoJsonQuery.definition,
    {
      ...geoJsonQuery.options,
      enabled: !isAccountLoading
    }
  )

  const isAllQueriesLoading =
    isAccountLoading || isQueryLoading(timeseriesQueryResult)

  return { timeseries, isLoading: isAllQueriesLoading }
}

export default useAllTimeseriesByAccount