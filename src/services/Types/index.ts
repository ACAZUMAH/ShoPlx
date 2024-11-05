import { Document, Types } from "mongoose";

declare global {
    namespace Express{
        interface Request{
            user?: string | any
        }
    }
};

export interface userType {
    full_name: string;
    email: string;
    telephone: string;
    whatsapp_no: string;
    password: string;
};

export interface updateType {
    _id?: string,
    full_name?: string,
    email?: string,
    telephone?: string,
    whatsup?: string
};

export interface products extends Document {
    user_id: string;
    category_id: string;
    location: string;
    picture_ref: string[];
    brand_id: string;
    Model?: string;
    type_id?: string;
    color?: string;
    condition: string;
    description: string;
    price: number;
    phone?: string
};
 
export interface mobileType {
    user_id: string;
    category_id: string;
    location: string;
    pictures: string[];
    brand_id: string;
    model: string;
    condition: string;
    secondCondition?: string;
    color: string;
    exchange?: boolean;
    description?: string;
    price: number;
    phone?: string;
};

export interface accessoryType {
    user_id: string;
    category_id: string;
    location: string;
    pictures: string[];
    title: string;
    brand_id: string;
    model?: string;
    type_id?: string;
    bandcolor?: string;
    condition: string;
    description?: string;
    price: number;
    phone?: string;
}

export interface headphoneType {
    user_id: string;
    category_id: string;
    location: string;
    pictures: string[];
    title: string;
    brand_id: string;
    model: string;
    type_id: string;
    formfactor: string;
    connectivity: string;
    condition: string;
    color: string;
    description?: string;
    price: number;
    phone?: string;
}

export interface tabletType {
    user_id: string;
    category_id: string;
    location: string;
    pictures: string[];
    brand_id: string;
    model: string;
    condition: string;
    storageCapacity: string;
    screen_size: string;
    RAM: string;
    color: string;
    exchange?: boolean;
    description?: string;
    price: number;
    phone?: string;
}
export interface laptopType {

};

export interface authType {
    user_id: Types.ObjectId | string;
    code: string;
    expiresIn: number;
};

type queryType = {
    featured?: boolean,
    company?: string,
    name?: object
}

export {}