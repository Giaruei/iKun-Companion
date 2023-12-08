/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-07-03 15:21:59
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-07-03 15:27:46
 * @FilePath: \messenger-clone\app\actions\getConversations.ts
 * @Description:
 */
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

const getConversations = async () => {
	const currentUser = await getCurrentUser();

	if (!currentUser?.id) {
		return [];
	}

	try {
		const conversations = await prisma.conversation.findMany({
			orderBy: {
				lastMessageAt: "desc",
			},
			where: {
				userIds: {
					has: currentUser.id,
				},
			},
			include: {
				users: true,
				messages: {
					include: {
						sender: true,
						seen: true,
					},
				},
			},
		});
		return conversations;
	} catch (error: any) {
		return [];
	}
};

export default getConversations;
