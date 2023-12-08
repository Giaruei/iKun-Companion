/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-06-26 20:08:03
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-06-30 15:06:02
 * @FilePath: \messenger-clone\app\(site)\page.tsx
 * @Description:
 */
import Image from "next/image";
import AuthForm from "./components/AuthForm";
export default function Home() {
	return (
		<div
			className="flex min-h-full flex-col justify-center py-12
  sm:px-6 lg:px-8 bg-gray-100"
		>
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<Image
					alt="Logo"
					height="48"
					width="48"
					className="mx-auto w-auto"
					src="/images/logo.png"
				/>
				<h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
					Sign in to your account
				</h2>
				<AuthForm />
			</div>
		</div>
	);
}
