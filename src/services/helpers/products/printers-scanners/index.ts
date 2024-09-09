import printerScanner from "../../../../models/schemas/products/printers";
import createError from 'http-errors';

/**
 * find printer and scanner products by id
 * @param _id - printer scanner id
 * @returns printer scanner
 * @throws error when printer scanner not found
 */
export const findPrinterScannerProductById = async (_id: string) => {
    if(!await printerScanner.exists({ _id }))
        throw new createError.BadRequest('printer scanner not found')

    return printerScanner.findById(_id)
}