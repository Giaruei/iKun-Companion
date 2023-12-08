/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-06-30 21:48:48
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-06-30 21:55:28
 * @FilePath: \messenger-clone\app\components\sidebar\MolbieItem.tsx
 * @Description:
 */
"use client";

import clsx from "clsx";
import Link from "next/link";

interface MobileItemProps {
	href: string;
	icon: any;
	active?: boolean;
	onClick?: () => void;
}

const MolbieItem: React.FC<MobileItemProps> = ({
	href,
	icon: Icon,
	active,
	onClick,
}) => {
	const handleClick = () => {
		if (onClick) return onClick;
	};

	return (
		<Link
			onClick={onClick}
			href={href}
			className={clsx(`
        group 
        flex 
        gap-x-3 
        text-sm 
        leading-6 
        font-semibold 
        w-full 
        justify-center 
        p-4 
        text-gray-500 
        hover:text-black 
        hover:bg-gray-100
    `, active && "bg-gray-100 text-black")}
		>
			<Icon />
		</Link>
	);
};

export default MolbieItem;
