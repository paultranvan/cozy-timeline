import React from 'react'
import { Link } from 'react-router-dom'

import FileImageLoader from 'cozy-ui/transpiled/react/FileImageLoader'

const styles = {
  display: 'inline-block',
  backgroundColor: 'var(--paleGrey)',
  margin: '0 1rem 1rem 0'
}

const getStyleFromBox = box => {
  let style = {}
  if (box) {
    if (box.width) {
      style.width = `${box.width}px`
    }
    if (box.height) {
      style.height = `${box.height}px`
    }
    if (box.top) {
      style.top = `${box.top}px`
    }
    if (box.left) {
      style.left = `${box.left}px`
    }
  }
  return style
}

const Photo = props => {
  const { photo, box } = props
  const style = getStyleFromBox(box)
  // TODO : add back query to link
  return (
    <div style={styles} data-test-item={photo.name}>
      <Link to={`photo/${photo.id}`}>
        <FileImageLoader
          file={photo}
          linkType="small"
          render={src => (
            <img data-testid="pho-photo-item" src={src} style={style} />
          )}
        />
      </Link>
    </div>
  )
}

export default Photo
