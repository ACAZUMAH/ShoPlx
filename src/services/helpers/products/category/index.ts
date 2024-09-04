import category from "../../../../models/schemas/category";
import { getCatelogByName } from "../catalog";

export const findcategory = async (catalog: string) =>{
    const sub: any = await getCatelogByName(catalog)
    const categories:any = []
    for(const categoryId of sub.sub_categories){
        const categoryData = await category.findById(categoryId)
        if (categoryData) {
            categories.push(categoryData);
        }
    }
    return categories
}

export const returnName = async (categories: Array<any>) =>{
    const catName: any = []
    for( const category of categories){
        catName.push(category.name)
    }
    return catName
}