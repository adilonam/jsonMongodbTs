import mongoose from "mongoose";
import { connectToDatabase, disconnectDatabase, insertJSONData } from "./mongodb/mongodb";
import * as readline from 'readline';


// Main function
async function main() {



    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('MongoDb connection string :', async (answer) => {
        await connectToDatabase(answer);
        rl.question('Collection Name :', async (answer) => {
            await insertJSONData(answer);
            await disconnectDatabase();
            rl.close();
        });
    });


}

// Execute main function
main();


