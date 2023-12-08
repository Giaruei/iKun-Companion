/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-06-28 16:45:04
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-06-28 17:11:50
 * @FilePath: \messenger-clone\app\api\auth\[...nextauth]\route.ts
 * @Description:
 */
import bcrypt from "bcrypt";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/app/libs/prismadb";

export const authOptions: AuthOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID as string,
			clientSecret: process.env.GITHUB_SECRET as string,
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		}),
		CredentialsProvider({
			name: "credentials",
			credentials: {
				email: { label: "email", type: "text" },
				password: { label: "password", type: "password" },
			},
			async authorize(credentials) {
				// 检查是否有邮箱和密码
				if (!credentials?.email || !credentials?.password) {
					throw new Error("Invalid Credentials");
				}
				// 如果有则检查对应的用户
				const user = await prisma.user.findUnique({
					where: {
						email: credentials.email,
					},
				});
				// 用户不存在或没有密码
				if (!user || !user?.hashedPassword) {
					throw new Error("Invalid Credentials");
				}
				// 检查密码是否一致
				const isCorrectPassword = await bcrypt.compare(
					credentials.password,
					user.hashedPassword
				);
				// 用户密码错误
				if (!isCorrectPassword) {
					throw new Error("Invalid Credentials");
				}
				// 如果都有就返回用户信息
				return user;
			},
		}),
	],
	debug: process.env.NODE_ENV === "development",
	session: {
		strategy: "jwt",
	},
	secret: process.env.NEXTAUTH_URL,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
