import classNames from 'classnames'
import justifiedLayout from 'justified-layout'
import React from 'react'

import Photo from './Photo'

const styles = {
  wrapper: {
    // position: 'relative'
  },
  section: {
    'margin-bottom': '2rem',
    display: 'flex',
    'flex-wrap': 'wrap'
  },
  container: {}
}

const photoDimensionsFallback = { width: 1, height: 1 }

// Returns pseudo responsive row height based on container width. Trying to get
// something between 190 and 240.
const adaptRowHeight = containerWidth => 180 + (containerWidth || 1800) / 30

// Some photos use EXIF orientation tags, and their width/height are thus incorrect
// if we don't take into account this orientation
const handlePhotoOrientation = metadata => {
  if (metadata.orientation && metadata.orientation > 4) {
    return { width: metadata.height, height: metadata.width }
  }
  return metadata
}

const PhotoList = ({ photos, key, containerWidth = 2100 }) => {
  // render() {
  //   const {
  //     t,
  //     key,
  //     title,
  //     photos,
  //     selected,
  //     showSelection,
  //     onPhotoToggle,
  //     onPhotosSelect,
  //     onPhotosUnselect,
  //     containerWidth
  //   } = this.props

  // containerWidth = 0 on the first render, skip it
  if (!containerWidth) {
    return null
  }
  const confDesk = {
    spacing: 16,
    padding: 32
  }
  const confMob = {
    spacing: 8,
    padding: 0
  }
  let conf = containerWidth >= 768 ? confDesk : confMob
  // @see https://flickr.github.io/justified-layout/
  const layout = justifiedLayout(
    photos.map(photo => {
      const metadata = photo.metadata || photo.attributes.metadata
      return metadata && metadata.width && metadata.height
        ? handlePhotoOrientation(metadata)
        : photoDimensionsFallback
    }),
    {
      containerWidth,
      targetRowHeight: adaptRowHeight(containerWidth),
      // Must be relevant with styles
      boxSpacing: {
        horizontal: conf.spacing,
        vertical: conf.spacing
      },
      containerPadding: {
        top: 0,
        right: conf.padding,
        bottom: 0,
        left: conf.padding
      }
    }
  )

  // we need to process the right position of the last photo of the first row so that we can align
  // the SELECT ALL button with the photo

  return (
    <div
      key={key}
      data-testid="photo-section"
      style={{
        width: `${containerWidth}px`,
        height: `${layout.containerHeight}px`,
        ...styles['section']
      }}
    >
      {photos.map((photo, index) => (
        <Photo photo={photo} box={layout.boxes[index]} key={photo.id + index} />
      ))}
    </div>
  )
}

export default PhotoList
