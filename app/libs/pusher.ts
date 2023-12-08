/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-07-08 00:10:12
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-07-11 11:15:39
 * @FilePath: \messenger-clone\app\libs\pusher.ts
 * @Description:
 */
import PusherServer from "pusher";
import PusherClient from "pusher-js";

export const pusherServer = new PusherServer({
	appId: process.env.PUSHER_APP_ID!,
	key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
	secret: process.env.PUSHER_SECRET!,
	cluster: "ap1",
	useTLS: true,
});

export const pusherClient = new PusherClient(
	process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
	{
		channelAuthorization: {
			endpoint: "/api/pusher/auth",
			transport: "ajax",
		},
		cluster: "ap1",
	}
);
