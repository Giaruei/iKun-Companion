/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-07-11 11:17:10
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-07-11 11:41:28
 * @FilePath: \messenger-clone\app\hooks\useActiveList.ts
 * @Description:
 */
import { create } from "zustand";

interface ActiveListStore {
	members: string[];
	add: (id: string) => void;
	remove: (id: string) => void;
	set: (id: string[]) => void;
}

const useActiveList = create<ActiveListStore>((set) => ({
	members: [],
	add: (id) => set((state) => ({ members: [...state.members, id] })),
	remove: (id) =>
		set((state) => ({
			members: state.members.filter((memberId) => memberId !== id),
		})),
	set: (ids) => set({ members: ids }),
}));

export default useActiveList;
