import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Bank Transfer | High Score VTU",
    description: "Transfer money to any bank account in Nigeria instantly.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
