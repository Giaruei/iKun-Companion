/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-07-07 14:38:21
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-07-07 14:47:14
 * @FilePath: \messenger-clone\app\components\AvatarGroup.tsx
 * @Description:
 */
"use client";

import { User } from "@prisma/client";
import Image from "next/image";
interface AvatarGroupProps {
	users?: User[];
}
const AvatarGroup: React.FC<AvatarGroupProps> = ({ users }) => {
	const sliceUsers = users?.slice(0, 3);
	const positionMap = {
		0: "top-0 left-[12px]",
		1: "bottom-0",
		2: "bottom-0 right-0",
	};

	return (
		<div className="relative h-11 w-11">
			{sliceUsers?.map((user, index) => (
				<div
					key={user.id}
					className={`
          absolute
          inline-block
          rounded-full
          overflow-hidden
          h-[21px]
          w-[21px]
          ${positionMap[index as keyof typeof positionMap]}
        `}
				>
					<Image
						alt="Avatar"
						fill
						src={user?.image || "/images/placeholder.jpg"}
					/>
				</div>
			))}
		</div>
	);
};

export default AvatarGroup;
