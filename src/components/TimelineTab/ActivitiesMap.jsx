import React from 'react'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

import PhotosMap from './PhotosMap'
import TripsMap from './TripsMap'
import { computeBoundingBox } from './helpers'

const MapTrips = ({ activities }) => {
  const timeseries = activities.trips
  const photos = activities.photos
  const boundingBox = computeBoundingBox(timeseries)
  const center = [
    (boundingBox[0][0] + boundingBox[1][0]) / 2,
    (boundingBox[0][1] + boundingBox[1][1]) / 2
  ]
  // const greenIcon = createMarkerIcon('green')
  // const redIcon = createMarkerIcon('red')
  // const lightGreenIcon = createMarkerIcon('lightgreen')
  // const lightRedIcon = createMarkerIcon('pink')

  const AdjustView = () => {
    const map = useMap()
    map.fitBounds(boundingBox)
    return null
  }

  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{ width: '50%', height: '400px' }}
    >
      <AdjustView />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <TripsMap timeseries={timeseries} />
      <PhotosMap photos={photos} />
    </MapContainer>
  )
}

export default MapTrips
