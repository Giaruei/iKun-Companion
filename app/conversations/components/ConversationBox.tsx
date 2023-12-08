/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-07-03 15:58:30
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-07-07 14:47:35
 * @FilePath: \messenger-clone\app\conversations\components\ConversationBox.tsx
 * @Description:
 */
"use client";
import { Conversation, Message, User } from "@prisma/client";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import clsx from "clsx";
import { FullConversationType } from "@/app/types";
import useOtherUser from "@/app/hooks/useOtherUser";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import Avatar from "@/app/components/Avatar";
import AvatarGroup from "@/app/components/AvatarGroup";

interface ConversationBoxProps {
  data: FullConversationType;
  selected?: boolean;
}
const ConversationBox: React.FC<ConversationBoxProps> = ({
  data,
  selected,
}) => {
  const otherUser = useOtherUser(data);
  const session = useSession();
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(`/conversations/${data.id}`);
  }, [data.id, router]);

  const lastMeesage = useMemo(() => {
    const message = data.messages || [];
    return message[message.length - 1];
  }, [data.messages]);

  const userEmail = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  const hasSeen = useMemo(() => {
    if (!lastMeesage) return false;
    const seenAray = lastMeesage.seen || [];
    if (!userEmail) return false;
    return seenAray.filter((user) => user.email === userEmail).length !== 0;
  }, [lastMeesage, userEmail]);

  const lastMeesageText = useMemo(() => {
    if (lastMeesage?.image) {
      return "Sent an image";
    }
    if (lastMeesage?.body) {
      return lastMeesage.body;
    }
    return "";
  }, [lastMeesage]);

  return (
    <div
      onClick={handleClick}
      className={clsx(
        `w-full 
        relative 
        flex 
        items-center 
        space-x-3 
        p-3 
        hover:bg-neutral-100
        rounded-lg
        transition
        cursor-pointer`,
        selected ? "bg-neutral-100" : "bg-white"
      )}
    >
      {data.isGroup ? (
        <AvatarGroup users={data.users} />
      ) : (
        <Avatar user={otherUser} />
      )}
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div className="flex justify-between items-center mb-1">
            <p className="text-md font-medium text-gray-900">
              {data.name || otherUser.name}
            </p>
            {lastMeesage?.createdAt && (
              <p className="text-xs text-gray-400 font-light">
                {format(new Date(lastMeesage.createdAt), "p")}
              </p>
            )}
          </div>
          <p
            className={clsx(
              `truncate text-sm`,
              hasSeen ? "text-gray-500" : "text-black font-medium"
            )}
          >
            {lastMeesageText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConversationBox;
