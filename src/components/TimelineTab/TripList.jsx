import React from 'react'

import TripProvider from '../Providers/TripProvider'
import TripMap from '../Trip/TripMap'
import { TripItem } from '../TripItem'

const styles = {
  map: {
    height: '300px',
    width: '30%'
  }
}

const TripList = ({ trips }) => {
  return (
    <div>
      {trips.map(timeserie => (
        <div key={`${timeserie._id}`}>
          <TripProvider timeserie={timeserie}>
            <TripItem timeserie={timeserie} hasDateHeader={false} />
            <div style={styles.map}>
              <TripMap />
            </div>
          </TripProvider>
        </div>
      ))}
    </div>
  )
}

export default TripList
