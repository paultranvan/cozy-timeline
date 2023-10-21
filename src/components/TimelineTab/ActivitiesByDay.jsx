import { List } from '@material-ui/core'
import React from 'react'

import PhotoList from './PhotoList' // Assuming these components are in the same directory
import TripList from './TripList'
import { groupByDay } from './helpers'
import PhotoMap from './PhotoMap'

const ActivitiesByDay = ({ trips, photos }) => {
  const groupedActivities = groupByDay(trips, photos)

  return (
    <List>
      {Object.entries(groupedActivities).map(([date, activities]) => (
        <div key={date} className="u-mt-1">
          <h2>{date}</h2>
          <PhotoMap photos={activities.photos} />
          <TripList trips={activities.trips} />
          <PhotoList photos={activities.photos} />
        </div>
      ))}
    </List>
  )
}

export default ActivitiesByDay
