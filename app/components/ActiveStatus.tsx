/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-07-11 11:42:31
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-07-11 11:43:13
 * @FilePath: \messenger-clone\app\components\ActiveStatus.tsx
 * @Description:
 */
"use client";

import useActiveChannel from "../hooks/useActiveChannel";

const ActiveStatus = () => {
	useActiveChannel();
	return null;
};

export default ActiveStatus;
