import { Metadata } from "next";
import { CheckoutFlow } from "@/components/CheckoutFlow";
export const metadata: Metadata = { title: "Оформление" };
export default function Page() { return <CheckoutFlow />; }
