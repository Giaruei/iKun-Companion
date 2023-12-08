/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-06-30 16:19:49
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-07-05 21:39:17
 * @FilePath: \messenger-clone\middleware.ts
 * @Description: 保护需要进行身份验证的页面和API路由，并且只允许已经通过身份验证的用户访问这些路由。
 */
import { withAuth } from "next-auth/middleware";

export default withAuth({
	pages: {
		signIn: "/",
	},
});

export const config = {
	matcher: ["/user/:path*", "/conversations/:path*"],
};
