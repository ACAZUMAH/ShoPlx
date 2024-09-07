export const registerationSchema = {
    full_name: {
        notEmpty:{
            errorMessage: 'First name required'
        },
        isString:{
            errorMessage: 'First name must be a string'
        }
    },
    email: {
        isEmail:true,
        notEmpty: {
            errorMessage: 'Email required'
        }
    },
    telephone: {
        isString: true,
        notEmpty: {
            errorMessage: 'Phone number required'
        }
    },
    whatsapp_no: {
        isString: true,
        notEmpty: {
            errorMessage: 'Whatsapp number required'
        }
    },
    password: {
        isString: true,
        notEmpty: {
            errorMessage: 'Password required'
        }
    }
}

