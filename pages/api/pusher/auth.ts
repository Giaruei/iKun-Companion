/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-07-11 11:07:49
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-07-11 11:13:33
 * @FilePath: \messenger-clone\pages\api\pusher\auth.ts
 * @Description:
 */
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { pusherServer } from "@/app/libs/pusher";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

export default async function handler(
	request: NextApiRequest,
	response: NextApiResponse
) {
	const session = await getServerSession(request, response, authOptions);

	if (!session?.user?.email) {
		return response.status(401);
	}

	const socketId = request.body.socket_id;
	const channel = request.body.channel_name;
	const data = {
		user_id: session.user.email,
	};

	const authResponse = pusherServer.authorizeChannel(socketId, channel, data);

	return response.send(authResponse);
}
