"use client";
import Image from "next/image";
import Link from "next/link";
import { Bell } from "lucide-react";
export default function Header() {
  return (
    <header className="p-4 flex justify-between items-center">
      <Link href="/profile" className="flex items-center">
        <Image
          className="rounded-full mr-5"
          src="/-go5dvk.jpg"
          alt="user-profile-pic"
          width={40}
          height={40}
        />
        <p className="font-bold">
          Hi, (Subscriber) <br />
          <span>Balance: N 1,000,000</span>
        </p>
      </Link>
      <Link href="/">
        <Bell className="text-purple-800" />
      </Link>
    </header>
  );
}
