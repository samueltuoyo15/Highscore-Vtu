import { Metadata } from "next";

export const metadata: Metadata = {
    title: "My Wallet | High Score VTU",
    description: "Fund your wallet and manage your funds.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
