import { TodoLogo } from "@/assets";
import TabPage from "@/components/Tab";
import Image from "next/image";

export default function Home() {
  return (
    <section>
      <header className="bg-[#F1ECE6] py-4 flex items-center justify-center">
        <Image width={120} height={230} src={TodoLogo} alt="logo" />
      </header>
      <TabPage /> {/* tab listing */}
    </section>
  );
}
