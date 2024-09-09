import catalog from "../../../../models/schemas/catalog";
import createError from "http-errors";

/**
 * get all catalogs from the database
 * @returns all catalogs
 */
export const getAllCatalogs = async () => {
  return await catalog.find({
    $or: [
      { name: "Electronics" },
      { name: "Phones & Tablets" },
      { name: "Home,Appliances & furniture" },
    ],
  });
};

/**
 * gets catalog from the databse with a matching id
 * @param id - catalogId
 * @returns matching catalog
 * @throws Error when id does not exist
 */
export const getCatelogById = async (id: string) => {
  const cat = await catalog.findById(id);
  if (!cat) throw new createError.BadRequest("No catalog with this Id");
  return cat;
};

/**
 * get a catalog by it's name
 * @param name - name of the catalog
 * @returns matching catalog
 * @throws Error when no catalog with such name exist
 */
export const getCatelogByName = async (name: string) => {
  if (!(await catalog.findOne({ name }))) {
    throw new createError.BadRequest("category not found");
  }
  return catalog.findOne({ name });
};
