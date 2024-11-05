import Ajv from 'ajv';
import addFormat from 'ajv-formats';
import createError from 'http-errors';
import { userType } from '../Types/index';

/**
 * takes user data and validates it against a schema using ajv
 * and throws an error if validation fails
 * @param data - user data
 * @returns true if validation passes
 * @throws error if validation fails
 */
export const validateUserData = async (data: userType) => {

    const ajv = new Ajv();

    addFormat(ajv);

    ajv.addFormat("phone", {
        type: "string",
        validate: (value: string) => {
          const phoneRegex = /^\+?[1-9]\d{1,14}$/;
          return phoneRegex.test(value);
        },
    });

    const schema = {
        type: 'object',
        properties: {
            full_name: { type: 'string' },
            email: { type: 'string', format: 'email' },
            telephone: { type: 'string', format: 'phone' },
            whatsapp_no: { type: 'string', format: 'phone' },
            password: { type: 'string', minLength: 6 },
        },
        required: ['full_name', 'email', 'telephone', 'whatsapp_no', 'password'],
        additionalProperties: false,
    }

    const validate = ajv.compile(schema);

    const isValid = validate(data);

    if (!isValid) {
        throw new createError.BadRequest(
            validate.errors?.map(
                (err) => {
                    if (err.instancePath) {
                        return `${err.instancePath} ${err.message}`;
                    }
                }
            ).join(', ')
        );
    }
    return true;
}

export default validateUserData;