## Install Application
- git clone https://github.com/ezzik1/nodejs-cource-task5.git
- checkout develop branch
- npm install
- npm run start
- Read [Readme.md](https://github.com/lased/node-nodejs-basics/blob/feat-graphql/services/README.md) to run microservices and test this application

## Use Application
- pass in browser http://localhost:3000/ 

## Implemented Queries and mutations:
<details>
   <summary> Queries </summary>
   
* artist
* artists
* band
* bands
* album
* albums
* genre
* genres
* tracks
* track
* jwt
* user
* getFavourites
</details>
 
<details>
   <summary> Mutations </summary>

* createArtist
* deleteArtist
* updateArtist
* createBand
* updateBand
* deleteBand
* createAlbum
* updateAlbum
* deleteAlbum
* createGenre
* updateGenre
* deleteGenre
* createTrack
* updateTrack
* deleteTrack
* register
* addTrackToFavourites
* addBandToFavourites
* addArtistToFavourites
* addGenreToFavourites
</details>

<details>
   <summary> Example Query </summary>

```graphql
query {
   jwt(email: "test@test.com", password: "123123qwe")
}
```
   
```Json
{
   "data": {
      "jwt": "token"
   }
}
```

</details>

<details>
   <summary> Example Mutation </summary>

```graphql
mutation {
   createGenre(name: "test", description: "random") {
      name
      description
   }
}
```
   
```Json
{
   "data": {
      "createGenre": {
         "name": "test"
         "description": "random"
      }
   }
}
```

</details>

