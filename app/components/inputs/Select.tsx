/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-07-07 14:17:35
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-07-07 14:25:37
 * @FilePath: \messenger-clone\app\components\inputs\Select.tsx
 * @Description:
 */
"use client";
import ReactSelect from "react-select";
interface SelectProps {
	label: string;
	value?: Record<string, any>;
	disabled?: boolean;
	options: Record<string, any>[];
	onChange: (value: Record<string, any>) => void;
}
const Select: React.FC<SelectProps> = ({
	label,
	value,
	options,
	disabled,
	onChange,
}) => {
	return (
		<div className="z-[100]">
			<label className="block text-sm font-medium leading-6 text-gray-900">
				{label}
			</label>
			<div className="mt-2">
				<ReactSelect
					isDisabled={disabled}
					value={value}
					onChange={onChange}
					options={options}
					menuPortalTarget={document.body}
					isMulti
					styles={{
						menuPortal: (base) => ({
							...base,
							zIndex: 9999,
						}),
					}}
					classNames={{
						control: () => "text-sm",
					}}
				/>
			</div>
		</div>
	);
};

export default Select;
