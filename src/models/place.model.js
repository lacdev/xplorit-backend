import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'

const imagesArrayLimit = (val) => val.length <= 6

// const locationArrayLimit = (val) => val.length === 2

const tagsArrayLimit = (val) => val.length <= 4

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

const PlaceSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    name: {
      type: String,
      maxlength: 300,
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
      type: [
        {
          type: String,
          required: true,
        },
      ],
      validate: [
        tagsArrayLimit,
        'Tags array must have a maximum of 4 String items.',
      ],
    },
    scheduleStart: {
      type: Date,
      required: [true, 'A valid start date must be provided.'],
    },
    scheduleFinish: {
      type: Date,
      required: [true, 'A valid finish date must be provided.'],
    },
    location: {
      type: {
        type: String, // Don't do `{ location: { type: String } }`
        enum: ['Point'], // 'location.type' must be 'Point'
        required: true,
      },
      coordinates: {
        type: [
          {
            type: Number,
            required: [true, 'You must provide an array of valid coordinates.'],
          },
        ],
        required: true,
      },
    },
    images: {
      type: [
        {
          type: String,
          required: [
            true,
            'You must provide an array of image URL with a maximum of 6 items.',
          ],
        },
      ],
      validate: [imagesArrayLimit, 'Images max items must be 6.'],
    },
  },
  { timestamps: true }
)

PlaceSchema.plugin(paginate)

const Place = mongoose.model('place', PlaceSchema)

export { Place }
