


import mongoose, { Document, Schema, Model } from 'mongoose';
import * as fs from 'fs'
import collectionSchema from './schema';



export async function connectToDatabase(connectionString: string) {
    try {
        await mongoose.connect(connectionString);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}




export async function insertJSONData(collectionName: string = 'test') {

    try {
        const collection = mongoose.model(collectionName, collectionSchema)
        // Read JSON file
        const jsonStr = await fs.readFileSync('./data/jsonArray.json', 'utf-8');
        const jsonData: any[] = JSON.parse(jsonStr);


        //  // Replace MongoDB-specific data types
        const processedData = correctData(jsonData)

        // Insert JSON data into database
        const promises = processedData.map(async (element: any) => {
            let { _id, ...rest } = element;
            if (_id == null || _id == undefined) {
                _id = new mongoose.Types.ObjectId()
            }
            const result = await collection.updateOne({ _id }, { $set: rest }, { upsert: true });
            console.log(result);

        });

        await Promise.all(promises);


        console.log('Inserted JSON data into database');
    } catch (error) {
        console.error('Error inserting JSON data into database:', error);
    }
}


export async function disconnectDatabase() {

    mongoose.disconnect();
    console.log('Disconnected to MongoDB');
}


function correctData(jsonData: any) {
    // Recursively process each item in the JSON data
    const processItem: any = (item: any) => {
        // Convert $numberInt to Number
        if (item.hasOwnProperty('$numberInt')) {
            return parseInt(item['$numberInt']);
        }
        // Convert $date to Date
        if (item.hasOwnProperty('$date')) {
            return new Date(parseInt(item['$date']["$numberLong"]));

        }
        // Convert $oid to ObjectId
        if (item.hasOwnProperty('$oid')) {
            if (!item['$oid']) {
                return new mongoose.Types.ObjectId()
            }
            else {
                return new mongoose.Types.ObjectId(item['$oid']);
            }

        }
        // If item is a list, recursively process each element in the list
        if (Array.isArray(item)) {
            return item.map(processItem);
        }
        // If item is an object, recursively process each value in the object
        if (typeof item === 'object' && item !== null) {
            let processedObject: any = {};
            for (const key in item) {
                processedObject[key] = processItem(item[key]);
            }
            return processedObject;
        }
        // Otherwise, return the item unchanged
        return item;
    };

    // Process each item in the JSON data
    return jsonData.map(processItem);
}