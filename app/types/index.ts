/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-07-03 15:32:56
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-07-03 15:37:11
 * @FilePath: \messenger-clone\app\types\index.ts
 * @Description:
 */
import { Conversation, Message, User } from "@prisma/client";

export type FullMessageType = Message & {
	sender: User;
	seen: User[];
};

export type FullConversationType = Conversation & {
	users: User[];
	messages: FullMessageType[];
};
