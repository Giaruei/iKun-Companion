/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-07-06 23:55:03
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-07-11 11:00:47
 * @FilePath: \messenger-clone\app\api\conversations\[conversationId]\route.ts
 * @Description:
 */
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { pusherServer } from "@/app/libs/pusher";
import { NextResponse } from "next/server";

interface IParms {
	conversationId?: string;
}

export async function DELETE(request: Request, { params }: { params: IParms }) {
	try {
		const { conversationId } = params;
		console.log(conversationId);

		const currentUser = await getCurrentUser();
		if (!currentUser) {
			return new NextResponse("Unauthorized", { status: 401 });
		}
		const existingConversation = await prisma.conversation.findUnique({
			where: {
				id: conversationId,
			},
			include: {
				users: true,
			},
		});
		if (!existingConversation) {
			return new NextResponse("Invalid ID", { status: 400 });
		}
		const deletedConversation = await prisma.conversation.deleteMany({
			where: {
				id: conversationId,
				userIds: {
					hasSome: [currentUser.id],
				},
			},
		});
		existingConversation.users.forEach((user) => {
			if (user.email) {
				pusherServer.trigger(
					user.email,
					"conversation:remove",
					existingConversation
				);
			}
		});
		return NextResponse.json(deletedConversation);
	} catch (error: any) {
		console.log(error, "ERROR_CONVERSATION_DELETE");
		return new NextResponse("Internal Error", { status: 500 });
	}
}
