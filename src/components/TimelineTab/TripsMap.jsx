import L from 'leaflet'
import React from 'react'
import { GeoJSON, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import styles from 'src/components/Trip/tripmap.styl'

const createIcon = ({ isStart }) => {
  return L.divIcon({
    html: `<div></div>`,
    iconSize: [12, 12],
    className: `${styles['cozy-leaflet-markers']} ${
      isStart
        ? `${styles['cozy-leaflet-markers-start']}`
        : `${styles['cozy-leaflet-markers-end']}`
    }`
  })
}

const colors = ['red', 'blue', 'green', 'yellow'] // Add more colors as needed

const TripsMap = ({ timeseries }) => {
  return timeseries.map((timeserie, index) => {
    const trip = timeserie.series[0]
    const startCoordinates = trip.properties.start_loc.coordinates
    const endCoordinates = trip.properties.end_loc.coordinates

    return (
      <div key={index}>
        {/* Drawing the trip path */}
        <GeoJSON
          data={trip}
          style={() => ({ color: colors[index % colors.length] })}
        />

        <Marker
          position={[startCoordinates[1], startCoordinates[0]]}
          icon={
            index === 0
              ? createIcon({ isStart: true })
              : createIcon({ isStart: true })
          }
        >
          <Popup>Start of Trip {index + 1}</Popup>
        </Marker>

        <Marker
          position={[endCoordinates[1], endCoordinates[0]]}
          icon={
            index === timeseries.length - 1
              ? createIcon({ isStart: false })
              : createIcon({ isStart: false })
          }
        >
          <Popup>End of Trip {index + 1}</Popup>
        </Marker>
      </div>
    )
  })
}

export default TripsMap
