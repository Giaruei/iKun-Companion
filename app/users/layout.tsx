import getUsers from "../actions/getUsers";
import SideBar from "../components/sidebar/Sidebar";
import UserList from "./components/UserList";

/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-06-30 16:30:33
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-07-01 16:50:29
 * @FilePath: \messenger-clone\app\users\layout.tsx
 * @Description:
 */
export default async function UsersLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const users = await getUsers();
	return (
		<SideBar>
			<div className="h-full">
				<UserList items={users} />
				{children}
			</div>
		</SideBar>
	);
}
