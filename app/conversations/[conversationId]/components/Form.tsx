/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-07-03 18:44:30
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-07-05 15:13:28
 * @FilePath: \messenger-clone\app\conversations\[conversationId]\components\Form.tsx
 * @Description:
 */
"use client";

import useConversation from "@/app/hooks/useConversation";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import MessageInput from "./MessageInput";
import { CldUploadButton } from "next-cloudinary";

const Form = () => {
	const { conversationId } = useConversation();
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			message: "",
		},
	});

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setValue("message", "", { shouldValidate: true });
		axios.post("/api/messages", {
			...data,
			conversationId,
		});
	};

	const handleUpload = (result: any) => {
		axios.post("/api/messages", {
			image: result?.info?.secure_url,
			conversationId,
		});
	};

	return (
		<div className="py-4 px-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full">
			<CldUploadButton options={{ maxFiles: 1 }}>
				<HiPhoto size={30} className="text-sky-500" />
			</CldUploadButton>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex items-center gap-2 lg:gap-4 w-full"
			>
				<MessageInput
					id="message"
					register={register}
					errors={errors}
					required
				/>
				<button
					type="submit"
					className="rounded-full p-2 bg-sky-500 hover:bg-sky-600 cursor-pointer transition"
				>
					<HiPaperAirplane size={18} className="text-white" />
				</button>
			</form>
		</div>
	);
};

export default Form;
