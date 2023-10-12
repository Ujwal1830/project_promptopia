import User from "@models/user";
import { connectToDB } from "@utils/database";


export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const user = await User.findById(params.id).select('chatLog');

        if (!user) return new Response("User Not Found", { status: 404 });

        return new Response(JSON.stringify(user.chatLog), { status: 200 })

    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}