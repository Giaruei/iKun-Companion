/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-06-30 22:04:23
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-06-30 22:05:48
 * @FilePath: \messenger-clone\app\actions\getSession.ts
 * @Description:
 */

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function getSession() {
	return await getServerSession(authOptions);
}
