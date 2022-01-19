import { Schema, model } from 'mongoose'

const statesArray = [
  'Aguascalientes',
  'Baja California',
  'Baja California Sur',
  'Campeche',
  'Chiapas',
  'Chihuaha',
  'Coahuila',
  'Colima',
  'CDMX',
  'Ciudad de Mexico',
  'Durango',
  'Estado de Mexico',
  'Guanajuato',
  'Guerrero',
  'Hidalgo',
  'Jalisco',
  'Michoacan',
  'Morelos',
  'Nayarit',
  'Nuevo Leon',
  'Oaxaca',
  'Puebla',
  'Queretaro',
  'Quintana Roo',
  'San Luis Potosi',
  'Sinaloa',
  'Sonora',
  'Tabasco',
  'Tamaulipas',
  'Tlaxcala',
  'Veracruz',
  'Yucatan',
  'Zacatecas',
]

const PlaceSchema = new Schema(
  {
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      unique: true,
      required: true,
    },
    name: {
      type: String,
      unique: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
      minlength: 50,
    },
    address: {
      street: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
        enum: statesArray,
      },
      zipcode: {
        type: Number,
        required: true,
      },
    },
    tags: {
      type: Array,
      required: true,
      validate: {
        validator: function (array) {
          return array.every(
            (tag) => typeof tag === 'string' && array.length <= 4
          )
        },
      },
    },
    scheduleStart: {
      type: Date,
      required: true,
    },
    scheduleFinish: {
      type: Date,
      required: true,
    },
    ubication: {
      lat: { type: Number, max: 1, required: true },
      long: { type: Number, max: 1, required: true },
    },
    images: {
      type: Array,
      required: true,
      validate: {
        validator: function (array) {
          return array.every(
            (image) => typeof image === 'string' && array.length <= 6
          )
        },
      },
    },
  },
  { timestamps: true }
)

const Place = model('place', PlaceSchema)

export default Place
