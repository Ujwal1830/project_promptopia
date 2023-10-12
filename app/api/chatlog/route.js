// pages/api/chatlog.js

import User from "@models/user";
import { connectToDB } from "@utils/database";

export const PATCH = async (req, res) => {
  await connectToDB();
  try {
      const { userId, chatLogData, chatSummary } = await req.json();

      const user = await User.findById({ _id: userId });
      if (!user) { return res.status(404).end('User not found'); }
      user.chatLog.push({
        summaryName: `${chatSummary}`,
        logs: JSON.stringify(chatLogData),
      });
      await user.save();

      return new Response(JSON.stringify("Chat log updated successfully"), { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response(JSON.stringify("Failed to save the chatLogs"),  { status: 500 });
    }
}


