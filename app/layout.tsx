/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-06-26 20:00:30
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-06-30 15:25:27
 * @FilePath: \messenger-clone\app\layout.tsx
 * @Description:
 */
import ActiveStatus from "./components/ActiveStatus";
import AuthContext from "./context/AuthContext";
import ToasterContext from "./context/ToasterContext";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<AuthContext>
					<ToasterContext />
					<ActiveStatus />
					{children}
				</AuthContext>
			</body>
		</html>
	);
}
