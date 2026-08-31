import { Metadata } from "next";
import { AccountView } from "@/components/AccountView";
export const metadata: Metadata = { title: "Профиль" };
export default function Page() { return <AccountView />; }
