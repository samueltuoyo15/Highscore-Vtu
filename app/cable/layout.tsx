import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Cable TV Subscription | High Score VTU",
    description: "Pay for DSTV, GOTV, and Startimes subscriptions instantly.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
