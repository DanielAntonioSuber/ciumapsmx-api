import { Sequelize } from 'sequelize'
import { Comment, CommentAttributes } from './models/Comment'
import { Event, EventAttributes } from './models/Event'
import { FAQ, FAQAttributes } from './models/FAQ'
import { Image, ImageAttributes } from './models/Image'
import { ImageOfPlace, ImageOfPlaceAttributes } from './models/ImageOfPlace'
import { KindOfPlace, KindOfPlaceAttributes } from './models/KindOfPlace'
import { Place, PlaceAttributes } from './models/Place'
import { PlaceScore, PlaceScoreAttributes } from './models/PlaceScore'
import { Report, ReportAttributes } from './models/Report'
import { Role, RoleAttributes } from './models/Role'
import { User, UserAttributes } from './models/User'

function setupModels (sequelize: Sequelize) {
  User.init(UserAttributes, User.config(sequelize))
  Role.init(RoleAttributes, Role.config(sequelize))
  Image.init(ImageAttributes, Image.config(sequelize))
  PlaceScore.init(PlaceScoreAttributes, PlaceScore.config(sequelize))
  ImageOfPlace.init(ImageOfPlaceAttributes, ImageOfPlace.config(sequelize))
  KindOfPlace.init(KindOfPlaceAttributes, KindOfPlace.config(sequelize))
  Place.init(PlaceAttributes, Place.config(sequelize))
  Comment.init(CommentAttributes, Comment.config(sequelize))
  FAQ.init(FAQAttributes, FAQ.config(sequelize))
  Report.init(ReportAttributes, Report.config(sequelize))
  Event.init(EventAttributes, Event.config(sequelize))

  Role.hasMany(User, {
    foreignKey: 'roleId',
    as: 'users'
  })
  User.belongsTo(Role, { foreignKey: 'roleId', as: 'role' })

  Image.hasMany(User, {
    foreignKey: 'avatarImage',
    as: 'users'
  })
  User.belongsTo(Image, { foreignKey: 'avatarImage', as: 'image' })

  User.hasMany(PlaceScore, {
    foreignKey: 'userId',
    as: 'placeScores'
  })
  PlaceScore.belongsTo(User, { foreignKey: 'userId' })

  Place.hasMany(PlaceScore, {
    foreignKey: 'placeId',
    as: 'placeScores'
  })
  PlaceScore.belongsTo(Place, { foreignKey: 'placeId' })

  KindOfPlace.hasMany(Place, {
    foreignKey: 'kind',
    as: 'places'
  })
  Place.belongsTo(KindOfPlace, { foreignKey: 'kind', as: 'kindOfPlace' })

  Image.hasOne(ImageOfPlace, {
    foreignKey: 'imageId',
    as: 'imageOfPlace'
  })
  ImageOfPlace.belongsTo(Image, {
    foreignKey: 'imageId',
    as: 'image'
  })

  Place.hasMany(ImageOfPlace, {
    foreignKey: 'placeId',
    as: 'imageOfPlaces'
  })
  ImageOfPlace.belongsTo(Place, { foreignKey: 'placeId', as: 'place' })

  Place.hasMany(Comment, { foreignKey: 'placeId', as: 'comments' })
  Comment.belongsTo(Place, { foreignKey: 'placeId', as: 'place' })

  User.hasMany(Comment, { foreignKey: 'userId', as: 'comments' })
  Comment.belongsTo(User, { foreignKey: 'userId', as: 'user' })

  User.hasMany(Place, { foreignKey: 'placeId', as: 'places' })
  Place.belongsTo(User, { foreignKey: 'placeId', as: 'user' })

  User.hasOne(Report, { foreignKey: 'userId', as: 'report' })
  Report.belongsTo(User, { foreignKey: 'userId', as: 'user' })

  Report.hasOne(Event, { foreignKey: 'reportId', as: 'event' })
  Event.belongsTo(Report, { foreignKey: 'reportId', as: 'report' })
}

export default setupModels
