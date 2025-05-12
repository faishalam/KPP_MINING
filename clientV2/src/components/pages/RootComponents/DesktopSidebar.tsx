"use client";
import { HomeIcon } from "@/assets/svg/home-icon";
import { InquiryIcon } from "@/assets/svg/inquiry-icon";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import CLink from "@/components/componentsV2/atoms/link";
import Image from "next/image";
import useRootLayoutContext from "@/app/(root)/hooks";

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { role } = useRootLayoutContext();
  const selectedMenu = (path: string) => {
    if (path === "/inquiry") {
      return pathname.includes(path) && !pathname.includes("/inquiry-approval");
    }
    return pathname.includes(path);
  };

  const handleShowSidebar = useMemo(() => {
    return (
      <>
        <div className="w-full">
          <MenuItems
            Icon={HomeIcon}
            title="Dashboard"
            selected={selectedMenu("/dashboard")}
            href="/dashboard"
          />
          <MenuItems
            title="Asset Management"
            href="/asset-management/incoming"
            Icon={InquiryIcon}
            selected={
              selectedMenu("/asset-management/incoming") ||
              selectedMenu("/asset-management/department")
            }
          />
          <SubMenuItems
            title="Incoming Asset"
            selected={selectedMenu("/asset-management/incoming")}
            href="/asset-management/incoming"
            hide={!selectedMenu("/asset-management")}
          />
          <SubMenuItems
            title="Asset on Department"
            selected={selectedMenu("/asset-management/department")}
            href="/asset-management/department"
            hide={!selectedMenu("/asset-management")}
          />
          <MenuItems
            title="Capex Management"
            href="/progress-management/incoming"
            Icon={InquiryIcon}
            selected={selectedMenu("/progress-management")}
          />
          <SubMenuItems
            title="Capex Incoming"
            selected={selectedMenu("/progress-management/incoming")}
            href="/progress-management/incoming"
            hide={!selectedMenu("/progress-management")}
          />
          <MenuItems
            title="User Management"
            href="/user-management"
            Icon={InquiryIcon}
            selected={selectedMenu("/user-management")}
          />
        </div>
      </>
    );
  }, [role, selectedMenu]);
  return (
    <>
      <div className="hidden h-screen lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex bg-[#0e342d] border-gray-500 shadow-xl items-center p-1 border-b">
          <Image
            src="/assets/logoWhite.png"
            alt="Logo KPP Mining"
            width={80}
            height={80}
            className="p-3"
          />
          <p className="text-white font-medium">KPP MONITORING</p>{" "}
          {/* Tambahkan margin jika perlu */}
        </div>
        <div className="bg-[#0e342d] h-screen border-gray-500 shadow-xl items-center p-1 border-b">
          {handleShowSidebar}
        </div>
      </div>
    </>
  );
};
export default Sidebar;

type TMenuItemProps = {
  selected: boolean;
  title: string;
  Icon: React.FC<{ fill?: boolean }>;
  href?: string;
};

const MenuItems: React.FC<TMenuItemProps> = ({
  selected,
  title,
  Icon,
  href,
}) => {
  return (
    <CLink href={href ? href : ""} prefetch>
      <div
        className={`flex hover:bg-[#207262] rounded-sm p-3 gap-2 items-center cursor-pointer ${
          selected ? "bg-[#207262]" : ""
        }`}
      >
        <Icon fill={selected} />
        <small className="font-bold text-white">{title}</small>
      </div>
    </CLink>
  );
};
type TSubMenuProps = {
  selected?: boolean;
  title?: string;
  hide?: boolean;
  href?: string;
  Icon?: React.FC<{ fill?: boolean }>;
};
const SubMenuItems: React.FC<TSubMenuProps> = ({
  selected,
  title,
  hide,
  href,
  Icon,
}) => {
  return (
    <CLink href={href ? href : ""} prefetch>
      <div
        className={`flex text-white rounded-sm hover:bg-[#207262] p-3 gap-2 items-center cursor-pointer ${
          selected ? "bg-[#207262]" : ""
        } ${hide ? "hidden" : ""}`}
      >
        {Icon && <Icon fill={selected} />}
        <small
          className={`font-bold text-white ${Icon ? "" : "pl-[24px] ml-2"}`}
        >
          {title}
        </small>
      </div>
    </CLink>
  );
};
