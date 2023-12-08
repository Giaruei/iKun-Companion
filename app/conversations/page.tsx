/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-07-02 20:18:16
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-07-02 20:21:29
 * @FilePath: \messenger-clone\app\conversations\page.tsx
 * @Description:
 */
"use client";
import clsx from "clsx";
import useConversation from "../hooks/useConversation";
import EmptyState from "../components/EmptyState";

const Home = () => {
	const { isOpen } = useConversation();

	return (
		<div className={clsx(
      'lg:pl-80 h-full lg:block',
      isOpen ? 'block' : 'hidden'
    )}>
			<EmptyState />
		</div>
	);
};

export default Home;
