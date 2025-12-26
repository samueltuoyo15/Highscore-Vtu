import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Transaction History | High Score VTU",
    description: "View your recent transactions and purchase history.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
