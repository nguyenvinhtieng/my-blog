import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import SideBar from "./_components/SideBar";
import Image from "next/image";
import CustomEditorEditor from "@/components/CustomEditorEditor";

export default function Login() {
  return (
    <SidebarProvider>
      <SideBar />
      <main>
        <SidebarTrigger />
        <div className="px-4 mx-auto max-w-[1400px]">
          <h1>Dashboard</h1>

          {/* Banner Image */}
          <Image
            src="/images/banner.jpg"
            alt="Banner"
            width={1400}
            height={100}
          />

          <h2 className="text-2xl font-semibold mt-4 ">Untitle</h2>
          <CustomEditorEditor />
        </div>
      </main>
    </SidebarProvider>
  );
}
