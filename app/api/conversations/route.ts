/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-07-01 17:07:47
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-07-11 10:25:49
 * @FilePath: \messenger-clone\app\api\conversations\route.ts
 * @Description:
 */
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { pusherServer } from "@/app/libs/pusher";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	try {
		const currentUser = await getCurrentUser();
		const body = await request.json();
		const { userId, isGroup, members, name } = body;
		if (!currentUser?.id || !currentUser?.email) {
			return new NextResponse("Unauthorized", { status: 401 });
		}
		if (isGroup && (!members || members.length < 2 || !name)) {
			return new NextResponse("Invalid data", { status: 400 });
		}
		// 群聊 不用检查重复 几个人也可以建很多重复的群
		if (isGroup) {
			const newConversation = await prisma.conversation.create({
				data: {
					name,
					isGroup,
					users: {
						connect: [
							...members.map((member: { value: string }) => ({
								id: member.value,
							})),
							{
								id: currentUser.id,
							},
						],
					},
				},
				include: {
					users: true,
				},
			});
			newConversation.users.forEach((user) => {
				if (user.email) {
					pusherServer.trigger(user.email, "conversation", newConversation);
				}
			});
			return NextResponse.json(newConversation);
		}
		// 如果是两个人私聊就必须检查了
		const existingConversations = await prisma.conversation.findMany({
			where: {
				OR: [
					{
						userIds: {
							equals: [currentUser.id, userId],
						},
					},
					{
						userIds: {
							equals: [userId, currentUser.id],
						},
					},
				],
			},
		});
		// 如果查询结果中有对话记录
		const singleConversation = existingConversations[0];
		if (singleConversation) {
			return NextResponse.json(singleConversation);
		}
		// 否则 新建一个对话
		const newConversation = await prisma.conversation.create({
			data: {
				users: {
					connect: [
						{
							id: currentUser.id,
						},
						{
							id: userId,
						},
					],
				},
			},
			include: {
				users: true,
			},
		});

		newConversation.users.map((user) => {
			if (user.email) {
				pusherServer.trigger(user.email, "conversation:new", newConversation);
			}
		});

		return NextResponse.json(newConversation);
	} catch (error: any) {
		return new NextResponse("Internal Error", { status: 500 });
	}
}
