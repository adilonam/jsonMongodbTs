import { connectToDatabase, disconnectDatabase, insertJSONData } from "./mongodb/mongodb";
import * as readline from 'readline';


console.log('hello worold');

// Main function
async function main() {
  
    await connectToDatabase("mongodb+srv://adilabbadi1996:xfClbv4jzWQLkmis@cluster0.thnqkdd.mongodb.net/First");
    await insertJSONData("bravos");
    await disconnectDatabase();




 

    // const rl = readline.createInterface({
    //     input: process.stdin,
    //     output: process.stdout
    // });
    
    // rl.question('MongoDb connection string :',async (answer) => {
    //     await connectToDatabase(answer);
    //     rl.question('Collection Name :',async (answer) => {
    //         await insertJSONData(answer);
    //         await disconnectDatabase();
    //         rl.close();
    //     });
    // });
   
      
}

// Execute main function
main();


