/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-07-01 16:43:38
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-07-01 16:58:06
 * @FilePath: \messenger-clone\app\users\components\UserList.tsx
 * @Description:
 */
"use client";
import { User } from "@prisma/client";
import UserBox from "./UserBox";

interface UserListProps {
	items: User[];
}
const UserList: React.FC<UserListProps> = ({ items }) => {
	return (
		<aside
			className="
				fixed 
        inset-y-0 
        pb-20
        lg:pb-0
        lg:left-20 
        lg:w-80 
        lg:block
        overflow-y-auto 
        border-r 
        border-gray-200
        block w-full left-0"
		>
			<div className="px-5">
				<div className="flex-col">
					<div className="text-2xl font-bold text-neutral-800 py-4">People</div>
				</div>
				{items.map((item) => (
					<UserBox key={item.id} data={item} />
				))}
			</div>
		</aside>
	);
};

export default UserList;
