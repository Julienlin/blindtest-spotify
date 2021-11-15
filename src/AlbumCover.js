const AlbumCover = props => {
  const { track } = props
  const src = track.track.album.images[0].url // A changer ;)

  return (
    <div>
      <img src={src} style={{ width: 400, height: 400 }} alt={src} />
    </div>
  )
}

export default AlbumCover
