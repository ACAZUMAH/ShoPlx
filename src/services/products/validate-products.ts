import Ajv from 'ajv';
import createError from 'http-errors';

const validateProduct = async (data) =>{
    const ajv = new Ajv();

    const schema = {
        type: 'object',
        properties: {
            user_id: { type: 'string' },
            category_id: { type: 'string' },
            brand_id: { type: 'string' },
            type_id: { type: 'string' },
            location: { type: 'string' },
            pictures: { type: 'array' },
            Model: { type: 'string' },
            color: { type: 'string' },
            condition: { type: 'string' },
            description: { type: 'string' },
            phone: { type: 'string' },
            price: { type: 'number' },
            title: { type: 'string' },
            bandcolor: { type: 'string' },
            formfactor: { type: 'string' },
            connectivity: { type: 'string' },
            processor: { type: 'string' },
            cores: { type: 'string' },
            RAM: { type: 'string' },
            storageCapacity: { type: 'string' },
            storageType: { type: 'string' },
            displaySize: { type: 'string' },
            graphicCard: { type: 'string' },
            graphicCardMemory: { type: 'string' },
            operatingSystem: { type: 'string' },
            secondCondition: { type: 'string' },
            exchange: { type: 'boolean' },
            bendColor: { type: 'string' },
            bandMaterial: { type: 'string' },

        },
        required: [
            'user_id', 
            'category_id', 
            'brand_id', 
            'location', 
            'pictures', 
            'condition', 
            'description', 
            'price'
        ]
    };
};

export default validateProduct;