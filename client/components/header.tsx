"use client";
import Image from "next/image";
import { useEffect } from "react";
import Link from "next/link";
import { Bell } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/signin");
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <header className="p-4 flex justify-between items-center">
      <Link href="/profile" className="flex items-center">
        <Image
          className="rounded-full mr-5"
          src={user.avatar || "/-go5dvk.jpg"}
          alt="user-profile-pic"
          width={40}
          height={40}
        />
        <p className="font-bold">
          Hi, {user.username} (Subscriber) <br />
          <span>Balance: N 1,000,000</span>
        </p>
      </Link>
      <Link href="/">
        <Bell className="text-purple-800" />
      </Link>
    </header>
  );
}
