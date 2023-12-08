import { useEffect, useState } from "react";
import useActiveList from "./useActiveList";
import { Channel, Members } from "pusher-js";
import { pusherClient } from "../libs/pusher";

/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-07-11 11:44:13
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-07-11 11:56:07
 * @FilePath: \messenger-clone\app\hooks\useActiveChannel.ts
 * @Description:
 */
const useActiveChannel = () => {
	const { set, add, remove } = useActiveList();
	const [activeChannel, setActiveChannel] = useState<Channel | null>(null);

	useEffect(() => {
		let channel = activeChannel;
		if (!channel) {
			channel = pusherClient.subscribe("presence-messenger");
			setActiveChannel(channel);
		}

		channel.bind("pusher:subscription_succeeded", (members: Members) => {
			const initialMember: string[] = [];
			members.each((member: Record<string, any>) => {
				initialMember.push(member.id);
			});
			set(initialMember);
		});

		channel.bind("pusher:member_added", (member: Record<string, any>) => {
			add(member.id);
		});

		channel.bind("pusher:member_removed", (member: Record<string, any>) => {
      remove(member.id)
    });

    return () => {
      if (activeChannel) {
        pusherClient.unsubscribe("presence-messenger");
        setActiveChannel(null)
      }
    }
	}, [activeChannel, set, add, remove]);
};

export default useActiveChannel;
