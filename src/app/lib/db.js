"use server"
import mongoose from "mongoose";

const MONGO_URL = 'mongodb+srv://khushib2013:4oMTYIILQEPA1ZOt@pictochat.gw69d9a.mongodb.net/?retryWrites=true&w=majority&appName=Pictochat'


global.mongoose = {
    conn: null,
    promise: null
};

export async function dbConnect() {
    if (global.mongoose && global.mongoose.conn) {
        console.log("Already connected");
        return global.mongoose.conn;
    } else {
        const promise = mongoose.connect(MONGO_URL, {
            autoIndex: true,
        });

        global.mongoose = {
            conn: await promise,
            promise
        };

        console.log("Connected Mongo DB instance");

        return await promise;
    }
}

