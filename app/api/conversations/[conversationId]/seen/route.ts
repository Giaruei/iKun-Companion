import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { pusherServer } from "@/app/libs/pusher";
/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-07-05 21:10:35
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-07-11 10:12:52
 * @FilePath: \messenger-clone\app\api\conversations\[conversationId]\seen\route.ts
 * @Description:
 */
interface IParms {
	conversationId?: string;
}

export async function POST(request: Request, { params }: { params: IParms }) {
	try {
		const currentUser = await getCurrentUser();
		const { conversationId } = params;
		if (!currentUser?.id || !currentUser?.email) {
			return new NextResponse("Unauthorized", { status: 401 });
		}
		// 先找到已有的对话
		const conversation = await prisma.conversation.findUnique({
			where: {
				id: conversationId,
			},
			include: {
				messages: {
					include: {
						seen: true,
					},
				},
				users: true,
			},
		});
		if (!conversation) {
			return new NextResponse("Invalid ID", { status: 400 });
		}
		// 找到最后一条消息
		const lastMessage = conversation.messages[conversation.messages.length - 1];
		if (!lastMessage) {
			return NextResponse.json(conversation);
		}
		// 更新
		const updateMessage = await prisma.message.update({
			where: {
				id: lastMessage.id,
			},
			include: {
				sender: true,
				seen: true,
			},
			data: {
				seen: {
					connect: {
						id: currentUser.id,
					},
				},
			},
		});

		await pusherServer.trigger(currentUser.email, "conversation:update", {
			id: conversationId,
			message: [updateMessage],
		});
		if (lastMessage.seenIds.indexOf(currentUser.id) !== -1) {
			return NextResponse.json(conversation);
		}

		await pusherServer.trigger(
			conversationId!,
			"message:update",
			updateMessage
		);

		return NextResponse.json(updateMessage);
	} catch (error: any) {
		console.log(error, "ERROR_MESSAGES_SEEN");
		return new NextResponse("Internal Error", { status: 500 });
	}
}
