import { ApiError } from '../../errors/ApiError.js'
import validator from 'express-validator'
import { searchForUserBeforeCreation } from '../../usecases/userUsecases/searchUserBeforeCreation.js'
import { isEmptyArray } from '../../utils/checkForEmptyArray.js'

/*const { body, validationResult} = validator;

const validateUserSignup = async (req, res, next) =>  {
    try {
        const { ownerId, name, description, address, city, state, zipcode, tags, scheduleStart, scheduleFinish, ubication, images } = req.body

        const ownerIdChain = body ('userId')
        .exists()
        .withMessage()
    }
}*/
