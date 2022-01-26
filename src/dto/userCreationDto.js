import * as yup from 'yup'
import { string } from 'yup'

const userDto = yup.object().shape({
  username: string()
    .trim()
    .required('Username is required.')
    .min(4, 'Username needs to be at least 4 characters.')
    .max(16, 'Username needs to have a maximum of 16 characters.')
    .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for this field '),
})

export { userDto }
