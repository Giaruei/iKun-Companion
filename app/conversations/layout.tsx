import getConversations from "../actions/getConversations";
import getUsers from "../actions/getUsers";
import SideBar from "../components/sidebar/Sidebar";
import ConversationList from "./components/ConversationList";

/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-07-02 20:21:58
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-07-03 15:29:28
 * @FilePath: \messenger-clone\app\conversations\layout.tsx
 * @Description:
 */
export default async function ConversationLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const conversations = await getConversations();
	const users = await getUsers();
	return (
		<SideBar>
			<div className="h-full">
				<ConversationList users={users} initialItems={conversations} />
				{children}
			</div>
		</SideBar>
	);
}
