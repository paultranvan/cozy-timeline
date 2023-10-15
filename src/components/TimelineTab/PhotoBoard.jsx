import React from 'react'
import { withContentRect } from 'react-measure'

import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import PhotoList from './PhotoList'

const PhotoBoard = ({
  lists,
  measureRef,
  contentRect: {
    entry: { width }
  }
}) => {
  const { f } = useI18n()

  return (
    <div ref={measureRef}>
      {lists.map((photoList, idx) => (
        <PhotoList
          key={idx}
          title={
            photoList.title ||
            (photoList.month ? f(photoList.month, 'MMMM YYYY') : '')
          }
          photos={photoList.photos}
          containerWidth={width}
        />
      ))}
    </div>
  )
}

export default withContentRect()(PhotoBoard)
