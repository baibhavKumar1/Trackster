import { auth } from "@/app/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const GET = async (req: Request) => {
    console.log("Auth GET request:", req.url);
    const handler = toNextJsHandler(auth);
    return await handler.GET(req);
};

export const POST = async (req: Request) => {
    console.log("Auth POST request:", req.url);
    const handler = toNextJsHandler(auth);
    return await handler.POST(req);
};
