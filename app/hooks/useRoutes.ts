/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-06-30 16:48:50
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-06-30 21:19:09
 * @FilePath: \messenger-clone\app\hooks\useRoutes.ts
 * @Description:
 */
import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { HiChat } from "react-icons/hi";
import { HiArrowLeftOnRectangle, HiUsers } from "react-icons/hi2";
import { signOut } from "next-auth/react";
import useConversation from "./useConversation";

const useRoutes = () => {
	const pathname = usePathname();
	const { conversationId } = useConversation();

	const routes = useMemo(
		() => [
			{
				label: "Chat",
				href: "/conversations",
				icon: HiChat,
				active: pathname === "/conversation" || !!conversationId,
			},
			{
				label: "Users",
				href: "/users",
				icon: HiUsers,
				active: pathname === "/users",
			},
			{
				label: "Logout",
				href: "#",
				onClick: () => signOut(),
				icon: HiArrowLeftOnRectangle,
			},
		],
		[pathname, conversationId]
	);

	return routes;
};

export default useRoutes;
