/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-07-03 17:08:10
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-07-03 17:11:48
 * @FilePath: \messenger-clone\app\actions\getMessages.ts
 * @Description:
 */
import prisma from "@/app/libs/prismadb";

const getMessages = async (conversationId: string) => {
	try {
		const messages = await prisma.message.findMany({
			where: {
				conversationId: conversationId,
			},
			include: {
				sender: true,
				seen: true,
			},
			orderBy: {
				createdAt: "asc",
			},
		});
    return messages
	} catch (error: any) {
		return [];
	}
};

export default getMessages
