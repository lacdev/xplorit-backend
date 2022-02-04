import mongoose from 'mongoose'

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
        
        enum: statesArray,
      },
      zipcode: {
        type: Number,
        
      },
    },
    tags: {
      type: Array,
      required: true,
    },
    scheduleStart: {
      type: Date,
      
    },
    scheduleFinish: {
      type: Date,
      
    },
    ubication: {
      lat: { type: Number, required: true },
      long: { type: Number, required: true },
    },
    images: {
      type: Array,
      
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

const Place = mongoose.model('place', PlaceSchema)

export { Place }
