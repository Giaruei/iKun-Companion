import getConvetsationById from "@/app/actions/getConversationById";
import getMessages from "@/app/actions/getMessages";
import EmptyState from "@/app/components/EmptyState";
import Header from "./components/Header";
import Body from "./components/Body";
import Form from "./components/Form";

/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-07-03 16:56:41
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-07-05 15:32:57
 * @FilePath: \messenger-clone\app\conversations\[conversationId]\page.tsx
 * @Description:
 */
interface IParams {
	conversationId: string;
}

const ConversationId = async ({ params }: { params: IParams }) => {
	const conversation = await getConvetsationById(params.conversationId);
	const messages = await getMessages(params.conversationId);

	if (!conversation) {
		return (
			<div className="lg:pl-80 h-full">
				<div className="h-full flex flex-col">
					<EmptyState />
				</div>
			</div>
		);
	}
	return (
		<div className="lg:pl-80 h-full">
			<div className="h-full flex flex-col">
				<Header conversation={conversation} />
				<Body initialMessages={messages} />
				<Form />
			</div>
		</div>
	);
};

export default ConversationId;
