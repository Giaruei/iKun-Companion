/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-07-03 16:14:54
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-07-03 16:23:50
 * @FilePath: \messenger-clone\app\hooks\useOhterUser.ts
 * @Description:
 */

import { User } from "@prisma/client";
import { FullConversationType } from "../types";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

const useOtherUser = (
	conversation: FullConversationType | { users: User[] }
) => {
	const session = useSession();
	const otherUser = useMemo(() => {
		const currentUserEmail = session?.data?.user?.email;
		const otherUser = conversation.users.filter(
			(user) => user.email !== currentUserEmail
		);
		return otherUser[0];
	}, [conversation.users, session?.data?.user?.email]);
	return otherUser;
};

export default useOtherUser;
