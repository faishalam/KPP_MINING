"use client";
import { InquiryIcon } from "@/assets/svg/inquiry-icon";
import { HomeIcon } from "@/assets/svg/home-icon";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import Image from "next/image";
import useRootLayoutContext from "@/app/(root)/hooks";
import CLink from "@/components/componentsV2/atoms/link";
import { useMemo } from "react";

export default function MobileSidebar() {
  const { sidebarOpen, setSidebarOpen, role } = useRootLayoutContext();

  const pathname = usePathname();

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
              selectedMenu("/asset-management/department") ||
              selectedMenu("/asset-management/completed-asset")
            }
          />
          <SubMenuItems
            title="Completed Asset"
            selected={selectedMenu("/asset-management/completed-asset")}
            href="/asset-management/completed-asset"
            hide={!selectedMenu("/asset-management")}
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
            title="Progress Asset"
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
          <MenuItems
            title="Guide App"
            link="/https://drive.google.com/file/d/1huymRHH4R1qN4vVhEFd4I3VleMz57BFm/view?usp=sharing"
            Icon={InquiryIcon}
            selected={selectedMenu("/user-management")}
          />
        </div>
      </>
    );
  }, [role, selectedMenu]);

  return (
    <>
      <Dialog
        open={sidebarOpen}
        onClose={setSidebarOpen}
        className="relative z-50 lg:hidden"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black opacity-50 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 flex">
          <DialogPanel
            transition
            className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
          >
            <TransitionChild>
              <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  className="-m-2.5 p-2.5"
                >
                  <span className="sr-only">Close sidebar</span>
                  <XMarkIcon
                    aria-hidden="true"
                    className="h-6 w-6 text-white"
                  />
                </button>
              </div>
            </TransitionChild>

            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-[#0e342d] ring-1 ring-white/10">
              <div className="flex shrink-0 bg-[#0e342d] border-b border-gray-500 shadow-xl items-center p-1">
                <Image
                  src="/assets/logoWhite.png"
                  alt="Logo KPP Mining"
                  width={80}
                  height={80}
                  className="p-3"
                />
                <p className="text-white font-medium">KPP MONITORING</p>
              </div>
              <div className="bg-[#0e342d] h-screen border-gray-500 shadow-xl items-center p-1 border-b">
                {handleShowSidebar}
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}

type TMenuItemProps = {
  selected: boolean;
  title: string;
  Icon: React.FC<{ fill?: boolean }>;
  href?: string;
  link?: string;
};

const MenuItems: React.FC<TMenuItemProps> = ({
  selected,
  title,
  Icon,
  href,
  link,
}) => {
  function normalizeLink(link: string) {
    try {
      if (link.startsWith("http://") || link.startsWith("https://")) {
        return link;
      }
      const found = link.match(/https?:\/.*$/);
      if (found) {
        return found[0]
          .replace(/^https:\//, "https://")
          .replace(/^http:\//, "http://");
      }

      return "#";
    } catch (e) {
      console.log(e)
      return "#";
    }
  }
  let raw;

  if (link) {
    raw = normalizeLink(link);
  }
  return (
    <>
      {link ? (
        <a href={raw} target="_blank" rel="noopener noreferrer">
          <div
            className={`flex hover:bg-[#207262] rounded-sm p-3 gap-2 items-center cursor-pointer ${
              selected ? "bg-[#207262]" : ""
            }`}
          >
            <Icon fill={selected} />
            <small className="font-bold text-white">{title}</small>
          </div>
        </a>
      ) : (
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
      )}
    </>
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
