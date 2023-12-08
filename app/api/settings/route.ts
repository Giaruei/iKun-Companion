import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-07-07 13:07:00
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-07-07 13:16:46
 * @FilePath: \messenger-clone\app\api\settings\route.ts
 * @Description:
 */
export async function POST(request: Request) {
	try {
		const currentUser = await getCurrentUser();
		const body = await request.json();
		const { name, image } = body;
		if (!currentUser?.id) {
			return new NextResponse("Unauthorized", { status: 401 });
		}
		const updatedUser = await prisma.user.update({
			where: {
				id: currentUser.id,
			},
			data: {
				image: image,
				name: name,
			},
		});
		return NextResponse.json(updatedUser);
	} catch (error: any) {
		console.log(error, "ERROR_SETTINGS");
		return new NextResponse("Internal Error", { status: 500 });
	}
}
