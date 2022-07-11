import { Artist } from '../artists/artists.typings'
import { Band } from '../bands/bands.typings'
import { Track } from '../tracks/tracks.typings'
import { Genre } from '../genres/genres.typings'

export interface Album {
    _id: string
    id: string
    name: string
    released: number
    artistsIds: [string]
    bandsIds: [string]
    tracksIds: [string]
    genresIds: [string]
    artists: Artist[]
    bands: Band[]
    tracks: Track[]
    genres: Genre[]
    image: string
}
