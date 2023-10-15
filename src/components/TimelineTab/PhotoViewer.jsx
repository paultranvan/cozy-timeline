import React, { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import Viewer from 'cozy-ui/transpiled/react/Viewer'
import Overlay from 'cozy-ui/transpiled/react/deprecated/Overlay'
import FooterActionButtons from 'cozy-ui/transpiled/react/Viewer/Footer/FooterActionButtons'
import ForwardOrDownloadButton from 'cozy-ui/transpiled/react/Viewer/Footer/ForwardOrDownloadButton'
import SharingButton from 'cozy-ui/transpiled/react/Viewer/Footer/Sharing'

const PhotoViewer = ({ photos, isPublic = false }) => {
  const navigate = useNavigate()
  let { photoId } = useParams()

  const currentIndex = useMemo(
    () => (photos ? photos.findIndex(p => p.id === photoId) : 0),
    [photos, photoId]
  )

  return (
    <Overlay>
      <Viewer
        files={photos}
        currentIndex={currentIndex}
        onChangeRequest={nextPhoto => navigate(`../${nextPhoto.id}`)}
        onCloseRequest={() => navigate('..')}
        componentsProps={{
          toolbarProps: {
            showFilePath: !isPublic
          }
        }}
      >
        <FooterActionButtons>
          <SharingButton />
          <ForwardOrDownloadButton />
        </FooterActionButtons>
      </Viewer>
    </Overlay>
  )
}

export default PhotoViewer
