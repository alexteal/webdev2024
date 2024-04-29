import { dbConnect } from "@/app/lib/db";
import { NextResponse } from "next/server";

export default async function getDbConnection() {
    const conn = await dbConnect();

    return new NextResponse("Connected to MongoDB");
}