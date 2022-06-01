// import places from './Places.json'
// import images from './Images.json'
// import imagesOfPlaces from './ImagesOfPlaces.json'
// import { Image } from '../models/Image'
// import { Place } from '../models/Place'
// import { ImageOfPlace } from '../models/ImageOfPlace'
import { FAQ } from '../models/FAQ'
import faqs from './FAQS.json'

function setData () {
  // images.forEach(({ id, name, path }) => {
  //   Image.create({ name, path, id })
  // })

  // places.forEach(({ description, direction, id, kind, name }) => {
  //   Place.create({ description, direction, name, id, kind, userId: 1 })
  // })

  // imagesOfPlaces.forEach(({ imageId, id, placeId }) => {
  //   ImageOfPlace.create({ imageId, placeId, id })
  // })

  faqs.forEach(({ answer, id, question }) => {
    FAQ.findOrCreate({ where: { id }, defaults: { answer, question } })
  })
}

export default setData
