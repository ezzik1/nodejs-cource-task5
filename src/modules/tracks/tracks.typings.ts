import { Album } from '../albums/albums.typings'
import { Artist } from '../artists/artists.typings'
import { Band } from '../bands/bands.typings'
import { Genre } from '../genres/genres.typings'

export interface Track {
    _id: string
    id: string
    title: string
    albumId: string
    album: Album
    artistsIds: string[]
    artists: Artist[]
    bandsIds: string[]
    bands: Band[]
    duration: number
    released: number
    genresIds: string[]
    genres: Genre[]
}
