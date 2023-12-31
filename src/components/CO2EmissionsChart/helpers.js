import { computeMonthsAndCO2s } from 'src/lib/timeseries'

import flag from 'cozy-flags'
import { alpha } from 'cozy-ui/transpiled/react/styles'

export const makeData = ({
  theme,
  isMobile,
  oneYearOldTimeseries,
  sendToDACC,
  globalAverages,
  f,
  t
}) => {
  const { months, CO2s } = computeMonthsAndCO2s(oneYearOldTimeseries, f)

  const data = {
    labels: months,
    datasets: [
      {
        label: t('vericalBarChart.legend.yours'),
        backgroundColor: theme.palette.primary.main,
        borderRadius: isMobile ? 8 : 4,
        barThickness: isMobile ? (sendToDACC ? 6 : 8) : 24,
        data: CO2s
      }
    ]
  }

  if (sendToDACC) {
    data.datasets.push({
      label: t('vericalBarChart.legend.average'),
      backgroundColor: alpha(theme.palette.primary.main, 0.24),
      borderRadius: isMobile ? 8 : 4,
      barPercentage: isMobile ? 0.55 : 0.85,
      data: flag('coachco2.fake-dacc-datas.enabled') ? CO2s : globalAverages
    })
  }

  return data
}

export const makeOptions = theme => ({
  maintainAspectRatio: false,
  scales: {
    x: {
      grid: {
        display: false,
        drawBorder: false
      },
      ticks: {
        color: theme.palette.text.secondary
      }
    },
    y: {
      grid: {
        color: theme.palette.border.main,
        drawBorder: false
      },
      ticks: {
        color: theme.palette.text.secondary,
        // don't use arrow func here to keep reference to `this`
        callback: function (value, index) {
          return index % 2 === 0 ? `${value} kg` : ''
        }
      }
    }
  },
  plugins: {
    tooltip: {
      displayColors: false
    }
  }
})
