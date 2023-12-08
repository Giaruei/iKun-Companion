/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-06-30 16:00:07
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-06-30 16:01:18
 * @FilePath: \messenger-clone\app\context\AuthContext.tsx
 * @Description:
 */
"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";

interface AuthContextProps {
	children: React.ReactNode;
}

export default function AuthContext({ children }: AuthContextProps) {
	return <SessionProvider>{children}</SessionProvider>;
}
