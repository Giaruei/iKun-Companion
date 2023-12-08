/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-06-30 22:06:29
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-06-30 22:10:27
 * @FilePath: \messenger-clone\app\actions\getCurrentUser.ts
 * @Description:
 */
import prisma from "@/app/libs/prismadb";
import getSession from "./getSession";

const getCurrentUser = async () => {
	try {
		const session = await getSession();
		if (!session?.user?.email) return null;
		const currentUser = await prisma.user.findUnique({
			where: {
				email: session.user.email as string,
			},
		});
		if (!currentUser) return null;
		return currentUser;
	} catch (error: any) {
		return null;
	}
};

export default getCurrentUser;
