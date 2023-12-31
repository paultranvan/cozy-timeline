/* eslint-disable react/display-name */

import { render } from '@testing-library/react'
import React from 'react'
import { useParams } from 'react-router-dom'
import LoadedPurposesList from 'src/components/Analysis/Purposes/LoadedPurposesList'
import { makeChartProps } from 'src/components/Analysis/helpers'
import {
  sortTimeseriesByCO2GroupedByPurpose,
  computeCO2Timeseries,
  transformTimeseriesToTrips
} from 'src/lib/timeseries'

import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

jest.mock('src/components/TripsList', () => () => (
  <div data-testid="TripsList" />
))
jest.mock('react-router-dom', () => ({
  useParams: jest.fn().mockReturnValue(() => ({ purpose: '', mode: '' }))
}))
jest.mock('src/components/Analysis/helpers')
jest.mock('src/lib/timeseries')
jest.mock('cozy-ui/transpiled/react/providers/Breakpoints', () => () => ({
  isMobile: false
}))
jest.mock('cozy-ui/transpiled/react/providers/I18n')
jest.mock(
  'src/components/Analysis/AnalysisListItem',
  () =>
    ({ type, sortedTimeserie, totalCO2 }) => (
      <div
        data-testid="AnalysisListItem"
        data-test-type={type}
        data-timeserie={sortedTimeserie}
        data-total={totalCO2}
      />
    )
)
jest.mock(
  'cozy-ui/transpiled/react/PieChart',
  () =>
    ({ data, options, primaryText, secondaryText }) => (
      <div
        data-testid="PieChart"
        data-test={data}
        data-options={options}
        data-primarytext={primaryText}
        data-secondarytext={secondaryText}
      />
    )
)

describe('LoadedPurposesList', () => {
  const timeseries = ['timeseries']
  const t = x => x
  const firstTimeserieSortedByPurposes = {
    timeseries: [],
    totalCO2: 22
  }
  const timeseriesSortedByPurposes = {
    firstTimeserieSortedByPurposes,
    WORK: {
      timeseries: [],
      totalCO2: 23
    }
  }

  beforeEach(() => {
    useI18n.mockReturnValue({ t })
    sortTimeseriesByCO2GroupedByPurpose.mockReturnValue(
      timeseriesSortedByPurposes
    )
    computeCO2Timeseries.mockReturnValue(48)
    makeChartProps.mockReturnValue({ data: 'data', options: 'options' })
  })

  it('should contain a AnalysisListItem with correct timeseriesSortedByPurposes and total CO2', () => {
    const { getAllByTestId } = render(<LoadedPurposesList />)

    expect(
      getAllByTestId('AnalysisListItem')[0].getAttribute('data-test-type')
    ).toEqual('purposes')
    expect(
      getAllByTestId('AnalysisListItem')[0].getAttribute('data-timeserie')
    ).toEqual('firstTimeserieSortedByPurposes,[object Object]')
    expect(
      getAllByTestId('AnalysisListItem')[0].getAttribute('data-total')
    ).toEqual('48')
  })

  it('should contain a PieChart with correct total CO2', () => {
    const { getByTestId } = render(<LoadedPurposesList />)

    expect(getByTestId('PieChart').getAttribute('data-secondarytext')).toEqual(
      'analysis.emittedCO2'
    )
    expect(getByTestId('PieChart').getAttribute('data-options')).toEqual(
      'options'
    )
    expect(getByTestId('PieChart').getAttribute('data-test')).toEqual('data')
    expect(getByTestId('PieChart').getAttribute('data-primarytext')).toEqual(
      '48 kg'
    )
  })

  it('should sortTimeseriesByCO2GroupedByPurpose from timeseries', () => {
    render(<LoadedPurposesList timeseries={timeseries} />)

    expect(sortTimeseriesByCO2GroupedByPurpose).toHaveBeenCalledWith(timeseries)
  })

  it('should computeCO2Timeseries from timeseries', () => {
    render(<LoadedPurposesList timeseries={timeseries} />)

    expect(computeCO2Timeseries).toHaveBeenCalledWith(timeseries)
  })

  it('should makeChartProps from timeseries', () => {
    render(<LoadedPurposesList timeseries={timeseries} />)

    expect(makeChartProps).toHaveBeenCalledWith(
      {
        WORK: { timeseries: [], totalCO2: 23 },
        firstTimeserieSortedByPurposes: { timeseries: [], totalCO2: 22 }
      },
      'purposes',
      t
    )
  })

  it('should render TripsList if purpose param is defined', () => {
    useParams.mockReturnValue({ purpose: 'WORK' })
    transformTimeseriesToTrips.mockReturnValue([])
    const { queryByTestId } = render(
      <LoadedPurposesList timeseries={timeseries} />
    )
    expect(queryByTestId('TripsList')).toBeTruthy()
    expect(queryByTestId('PieChart')).not.toBeTruthy()
    expect(queryByTestId('AnalysisListItem')).not.toBeTruthy()
  })

  it('should render AnalysisListItem & PieChart if purpose param is undefined', () => {
    useParams.mockReturnValue({ purpose: '' })
    transformTimeseriesToTrips.mockReturnValue([])
    const { queryByTestId, queryAllByTestId } = render(
      <LoadedPurposesList timeseries={timeseries} />
    )
    expect(queryByTestId('PieChart')).toBeTruthy()
    expect(queryAllByTestId('AnalysisListItem')).toBeTruthy()
    expect(queryByTestId('TripsList')).not.toBeTruthy()
  })
})
