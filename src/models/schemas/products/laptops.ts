import { Schema } from 'mongoose';

export const laptopSchema = new Schema(
    {
        processor: { type: String, required: true },
        cores:{ type: String, required: true },
        RAM: { type: String, required: true },
        storageCapacity: { type: String, required: true },
        storageType:{ type: String, required: true},
        displaySize: { type: String, required: true },
        graphicCard:{ type: String, required: true },
        graphicCardMemory:{ type: String, required: true },
        operatingSystem:{ type: String, required: true },
    }
)
