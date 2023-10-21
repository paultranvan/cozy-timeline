export const getPhotoLink = (client, file, linkType) => {
  try {
    const link = file.links ? file.links[linkType] : false

    if (!link) throw new Error(`${linkType} link is not available`)

    const src = client.getStackClient().uri + link
    return src
  } catch (e) {
    throw new Error(`${linkType} link is not available`)
  }
}

const getDateString = dateStr => {
  const date = new Date(dateStr)
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

export const groupByDay = (trips, photos) => {
  const grouped = {}

  // Grouping trips by day
  trips.forEach(trip => {
    const dateKey = getDateString(trip.startDate)
    if (!grouped[dateKey]) {
      grouped[dateKey] = {
        trips: [],
        photos: []
      }
    }
    grouped[dateKey].trips.push(trip)
  })

  // Grouping photos by day
  photos.forEach(photo => {
    const dateKey = getDateString(photo.metadata.datetime)
    if (!grouped[dateKey]) {
      grouped[dateKey] = {
        trips: [],
        photos: []
      }
    }
    grouped[dateKey].photos.push(photo)
  })

  return grouped
}
