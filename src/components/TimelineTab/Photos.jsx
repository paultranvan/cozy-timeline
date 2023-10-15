import { ImageList, ImageListItem } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'

import FileImageLoader from 'cozy-ui/transpiled/react/FileImageLoader'

const style = {
  height: '15rem',
  transition: 'transform 0.2s ease'
}
const Photos = ({ photos }) => {
  if (!photos) {
    return null
  }

  return (
    <ImageList sx={{ height: 100 }} cols={4} rowHeight={164}>
      {photos.map(photo => {
        return (
          <ImageListItem key={photo._id}>
            <Link to={photo.id}>
              <FileImageLoader
                file={photo}
                linkType="small"
                render={src => (
                  <img
                    data-testid="pho-photo-item"
                    src={src}
                    className={style}
                    style={style}
                  />
                )}
              />
            </Link>
          </ImageListItem>
        )
      })}
    </ImageList>
  )
}

export default Photos
