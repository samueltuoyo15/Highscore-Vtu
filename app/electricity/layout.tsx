import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Pay Electricity Bill | High Score VTU",
    description: "Buy prepaid meter tokens and pay postpaid bills for all DISCOs.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
