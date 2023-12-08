/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-06-30 16:25:05
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-06-30 16:28:18
 * @FilePath: \messenger-clone\app\components\EmptyState.tsx
 * @Description:
 */
const EmptyState = () => {
	return (
		<div className="px-4 py-10 sm:px-6 lg:px-8 h-full flex justify-center items-center bg-gray-100">
			<div className="text-center items-center flex flex-col">
				<h3 className="mt-2 text-2xl font-semibold text-gray-900">
					Select a chat or start a new conversation
				</h3>
			</div>
		</div>
	);
};

export default EmptyState;
