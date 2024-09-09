import types from "../../../../models/schemas/type";
import { getCategoryById } from "../category";

/**
 * find types that belong to a particular category
 * @param _id - category id
 * @returns types
 */
export const findCategoryType = async (_id: string) => {
    const category: any = await getCategoryById(_id)
    const type: any = []
    for(const brandId of category.types){
        const brandData = await types.findById(brandId)
        if(brandData) type.push(brandData)
    }
    return type
}