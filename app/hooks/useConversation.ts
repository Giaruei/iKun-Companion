/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-06-30 16:42:10
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-06-30 16:53:03
 * @FilePath: \messenger-clone\app\hooks\useConversation.ts
 * @Description:
 */
import { useParams } from "next/navigation";
import { useMemo } from "react";

const useConversation = () => {
	const parms = useParams();

	const conversationId = useMemo(() => {
		if (!parms?.conversationId) {
			return "";
		}

		return parms?.conversationId as string;
	}, [parms?.conversationId]);

	const isOpen = useMemo(() => !!conversationId, [conversationId]);

	return useMemo(() => ({
    isOpen,
    conversationId
  }), [conversationId, isOpen]);
};

export default useConversation