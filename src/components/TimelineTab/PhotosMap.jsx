import { useClient } from 'cozy-client'

import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import React from 'react'
import { Marker, Popup } from 'react-leaflet'
// import Camera from 'src/assets/icons/camera.svg'

// function svgToBase64Url(svgString) {
//   return 'data:image/svg+xml;base64,' + btoa(svgString)
// }

// FIXME: importing through cozy-ui, or directly from the svg didn't work...
const cameraBase64 =
  'PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDE2IDE2Ij4KICAgIDxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTUuNSAxaDVsMiAySDE0YzEuMSAwIDIgLjkgMiAydjhjMCAxLjEtLjkgMi0yIDJIMmMtMS4xIDAtMi0uOS0yLTJWNWMwLTEuMS45LTIgMi0yaDEuNWwyLTJ6TTggMTNjMi4yMDggMCA0LTEuNzkyIDQtNHMtMS43OTItNC00LTQtNCAxLjc5Mi00IDQgMS43OTIgNCA0IDR6bTAtMmEyIDIgMCAxIDEgMC00IDIgMiAwIDAgMSAwIDR6Ii8+Cjwvc3ZnPg=='

// Overcome the known issue with markers in react-leaflet v3.x
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

const PhotosMap = ({ photos }) => {
  const client = useClient()

  const cameraIcon = new L.Icon({
    iconUrl: `data:image/svg+xml;base64,${cameraBase64}`, // svgToBase64Url(Camera),
    iconSize: [25, 25]
  })

  if (!photos) {
    return null
  }

  const photosWithGPS = photos.filter(
    photo =>
      photo.attributes.metadata?.gps?.lat &&
      photo.attributes.metadata?.gps?.long
  )
  if (photosWithGPS.length < 1) {
    return null
  }

  const getLink = photo => {
    const link = photo.links ? photo.links['small'] : false
    const src = client.getStackClient().uri + link
    return src
  }

  return photosWithGPS.map(photo => (
    <Marker
      key={photo._id}
      position={[
        photo.attributes.metadata.gps.lat,
        photo.attributes.metadata.gps.long
      ]}
      icon={cameraIcon}
    >
      <Popup>
        <img src={getLink(photo)} alt={photo.name} width="200" />
      </Popup>
    </Marker>
  ))
}

export default PhotosMap
