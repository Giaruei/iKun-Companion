/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-06-30 21:27:33
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-07-03 15:51:36
 * @FilePath: \messenger-clone\app\components\sidebar\DesktopItem.tsx
 * @Description:
 */
import clsx from "clsx";
import Link from "next/link";

interface DesktopItemProps {
	label: string;
	icon: any;
	href: string;
	onClick?: () => void;
	active?: boolean;
}

const DesktopItem: React.FC<DesktopItemProps> = ({
	label,
	icon: Icon,
	href,
	onClick,
	active,
}) => {
	const handleClick = () => {
		if (onClick) return onClick();
	};
	return (
		<li onClick={handleClick}>
			<Link
				href={href}
				className={clsx(
					`
        group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold text-gray-500 hover:text-black hover:bg-gray-100
      `,
					active && "bg-gray-100 text-black"
				)}
			>
				<Icon className="h-6 w-6 shrink-0" aria-hidden="true" />
				<span className="sr-only">{label}</span>
			</Link>
		</li>
	);
};

export default DesktopItem;
