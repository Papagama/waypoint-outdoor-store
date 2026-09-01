import { Metadata } from "next";
import { JournalPage } from "@/components/JournalPage";
export const metadata: Metadata = { title: "Журнал", description: "Концептуальный редакционный раздел WAYPOINT." };
export default function Page() { return <JournalPage />; }
