import Avater from "@/app/components/Avatar";
import LoadingModal from "@/app/components/LoadingModal";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-07-01 16:50:05
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-07-07 23:46:05
 * @FilePath: \messenger-clone\app\users\components\UserBox.tsx
 * @Description:
 */
interface UserBoxProps {
	data: User;
}
const UserBox: React.FC<UserBoxProps> = ({ data }) => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const handleClick = useCallback(() => {
		setIsLoading(true);
		axios
			.post("/api/conversations", {
				userId: data.id,
			})
			.then((data) => {
				router.push(`/conversations/${data.data.id}`);
			})
			.finally(() => setIsLoading(false));
	}, [data, router]);
	return (
		<>
			{isLoading && <LoadingModal />}
			<div
				onClick={handleClick}
				className="w-full relative flex items-center space-x-3 bg-white p-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer"
			>
				<Avater user={data} />
				<div className="min-w-0 flex-1">
					<div className="focus:outline-none">
						<div className="flex justify-between items-center mb-1">
							<p className="text-sm font-medium text-gray-900">{data.name}</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default UserBox;
