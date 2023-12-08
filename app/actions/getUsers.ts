/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-07-01 16:37:29
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-07-01 16:41:51
 * @FilePath: \messenger-clone\app\actions\getUsers.ts
 * @Description:
 */
import prisma from "@/app/libs/prismadb";
import getSession from "./getSession";

const getUsers = async () => {
	const session = await getSession();

	if (!session?.user?.email) {
		return [];
	}
	try {
		const users = await prisma.user.findMany({
			orderBy: {
				createdAt: "desc",
			},
			where: {
				NOT: {
					email: session.user.email,
				},
			},
		});
		return users;
	} catch (error: any) {
		return [];
	}
};

export default getUsers;
