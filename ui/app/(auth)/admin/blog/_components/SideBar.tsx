import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { PlusIcon } from "lucide-react";
import { AddTopicDialog } from "./dialog/AddTopicDialog";
import BlogList from "./BlogList";
export default function SideBar() {
  return (
    <Sidebar className="bg-white">
      <SidebarHeader className="bg-white">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex gap-2 transition-all px-3 py-2 rounded-md hover:bg-neutral-50">
            <Image
              src="/images/logo.png"
              alt="VT Logo"
              width={24}
              height={24}
              className="rounded-full"
            />
            <p>Tieng Nguyen </p>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-full">
            {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator /> */}
            <DropdownMenuItem>Cài đặt</DropdownMenuItem>
            <DropdownMenuItem>Đăng xuất</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <div>Tìm kiếm</div>
          <div>Tìm kiếm</div>
        </SidebarGroup>
        <SidebarGroup>
          <div className="flex">
            <h3 className="flex-1">Blog</h3>
            <AddTopicDialog />
          </div>
        </SidebarGroup>
        <SidebarGroup>
          <BlogList />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
