/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-06-28 17:27:50
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-06-30 15:23:07
 * @FilePath: \messenger-clone\app\api\register\route.ts
 * @Description:
 */
import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const { email, name, password } = body;

		if (!email || !name || !password) {
			return new NextResponse("Missing info", { status: 400 });
		}

		const hashedPassword = await bcrypt.hash(password, 12);
		const user = await prisma.user.create({
			data: {
				email,
				name,
				hashedPassword,
			},
		});

		return NextResponse.json(user);
	} catch (error: any) {
		console.log(error, "REGISTRATION_ERROR");
		return new NextResponse("Internal Error", { status: 500 });
	}
}
