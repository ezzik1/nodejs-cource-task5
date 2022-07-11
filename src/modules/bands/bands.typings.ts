import { Genre } from '../genres/genres.typings'

export interface Band {
    id: string
    _id: string
    name: string
    origin: string
    members: Member[]
    website: string
    genresIds: string[]
    genres: Genre[]
}

export interface Member {
    _id: string
    id: string
    instrument: string
}
