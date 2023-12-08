/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-06-30 16:06:25
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-06-30 16:30:16
 * @FilePath: \messenger-clone\app\users\page.tsx
 * @Description:
 */
'use client'
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import EmptyState from "../components/EmptyState";

const Users = () => {
  const session = useSession();
  const router = useRouter()
  useEffect(() => {
    if (session.status === 'unauthenticated') {
      router.push('/')
    }
  }, [session, router])

  return (
    <div className="hidden lg:block lg:pl-80 h-full">
      <EmptyState />
    </div>
  );
};

export default Users;
