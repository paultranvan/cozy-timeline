import React, { useMemo } from 'react'
import PropTypes from 'prop-types'

import Icon from 'cozy-ui/transpiled/react/Icon'

import BikeIcon from 'src/assets/icons/icon-bike.svg'
import CarIcon from 'src/assets/icons/icon-car.svg'
import PlaneIcone from 'src/assets/icons/icon-plane.svg'
import SubwayIcon from 'src/assets/icons/icon-subway.svg'
import TrainIcon from 'src/assets/icons/icon-train.svg'
import WalkIcon from 'src/assets/icons/icon-walk.svg'
import UnknownIcon from 'src/assets/icons/icon-question-mark.svg'

import {
  AIR_MODE,
  BICYCLING_MODE,
  CAR_MODE,
  SUBWAY_MODE,
  TRAIN_MODE,
  WALKING_MODE,
  UNKNOWN_MODE
} from 'src/constants/const'
import { getMainMode } from './trips'

const MainModeIcon = ({ trip }) => {
  const mainMode = useMemo(() => getMainMode(trip), [trip])

  const pickIcon = () => {
    switch (mainMode) {
      case AIR_MODE:
        return PlaneIcone
      case BICYCLING_MODE:
        return BikeIcon
      case CAR_MODE:
        return CarIcon
      case SUBWAY_MODE:
        return SubwayIcon
      case TRAIN_MODE:
        return TrainIcon
      case WALKING_MODE:
        return WalkIcon
      case UNKNOWN_MODE:
        return UnknownIcon
      default:
        return UnknownIcon
    }
  }
  return <Icon icon={pickIcon()} width="32" height="32" />
}

MainModeIcon.propTypes = {
  mode: PropTypes.string.isRequired
}

export default MainModeIcon
