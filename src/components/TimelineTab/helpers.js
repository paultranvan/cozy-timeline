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
