/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-07-03 17:45:02
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-07-11 10:18:04
 * @FilePath: \messenger-clone\app\conversations\[conversationId]\components\Body.tsx
 * @Description:
 */
"use client";

import useConversation from "@/app/hooks/useConversation";
import { FullMessageType } from "@/app/types";
import { useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";
import axios from "axios";
import { pusherClient } from "@/app/libs/pusher";
import { find, set } from "lodash";

interface BodyProps {
	initialMessages: FullMessageType[];
}
const Body: React.FC<BodyProps> = ({ initialMessages }) => {
	const [messages, setMessages] = useState(initialMessages);
	const buttonRef = useRef<HTMLDivElement>(null);
	const { conversationId } = useConversation();

	useEffect(() => {
		axios.post(`/api/conversations/${conversationId}/seen`);
	}, [conversationId]);

	useEffect(() => {
		pusherClient.subscribe(conversationId);
		buttonRef?.current?.scrollIntoView();
		const messageHandler = (message: FullMessageType) => {
			setMessages((current) => {
				if (find(current, { id: message.id })) {
					return current;
				}
				return [...current, message];
			});
			buttonRef?.current?.scrollIntoView();
		};
		const updateMessageHandler = (newMessage: FullMessageType) => {
			setMessages((current) => current.map((currentMessage) => {
				if (currentMessage.id === newMessage.id) {
					return newMessage
				}
				return currentMessage
			}))
		};

		pusherClient.bind("messages:new", messageHandler);
		pusherClient.bind("messages:update", updateMessageHandler);

		return () => {
			pusherClient.unsubscribe(conversationId);
			pusherClient.unbind("messages:new", messageHandler);
			pusherClient.unbind("messages:update", updateMessageHandler);
		};
	}, [conversationId]);

	return (
		<div className="h-full">
			{messages.map((message, i) => (
				<MessageBox
					isLast={i === messages.length - 1}
					key={message.id}
					data={message}
				/>
			))}
			<div ref={buttonRef} className="pt-24" />
		</div>
	);
};
export default Body;
