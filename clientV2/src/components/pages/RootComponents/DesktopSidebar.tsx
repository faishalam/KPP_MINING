// "use client";
// import { classNames } from "@/helper/classnames";
// import { useRootLayoutContext } from "@/providers/rootProviders/RootLayoutProviders";
// import {
//   Cog6ToothIcon,
//   FolderIcon,
//   HomeIcon,
//   UsersIcon,
// } from "@heroicons/react/24/outline";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import ModalAddAsset from "../../modal/ModalAddAsset";
// import Cookies from "js-cookie";
// import Image from "next/image";

// export default function DesktopSidebar() {
//   const { setOpenModalAddAsset, role } = useRootLayoutContext();
//   const pathname = usePathname();
//   const router = useRouter();

//   const navigation = [
//     { name: "Dashboard", href: "/", icon: HomeIcon, current: false },
//     {
//       name: "Assets Management",
//       href: "/asset-management",
//       icon: FolderIcon,
//       current: true,
//     },
//     {
//       name: "Assets on Department",
//       href: "/your-assets",
//       icon: UsersIcon,
//       current: false,
//     },
//     {
//       name: "Users Management",
//       href: "/user-management",
//       icon: UsersIcon,
//       current: false,
//     },
//     {
//       name: "Progress Management",
//       href: "/progress-management",
//       icon: UsersIcon,
//       current: false,
//     },
//   ];

//   const actions = [
//     {
//       id: 1,
//       name: "Add Assets",
//       onclick: () => setOpenModalAddAsset(true),
//       initial: "A",
//       current: false,
//     },
//     { id: 2, name: "Guide Apps", href: "#", initial: "G", current: false },
//   ].filter((action) => !(role === "head" && action.name === "Add Assets"));

//   const handleLogout = () => {
//     Cookies.remove("Authorization");
//     localStorage.clear();
//     router.push("/login");
//   };

//   return (
//     <>
//       <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
//         <div className="flex bg-[#0e342d] border-gray-500 shadow-xl items-center p-1 border-b">
//           <Image
//             src="/assets/logoWhite.png"
//             alt="Logo KPP Mining"
//             width={80}
//             height={80}
//             className="p-3"
//           />
//           <p className="text-white font-medium">KPP MONITORING</p>{" "}
//           {/* Tambahkan margin jika perlu */}
//         </div>
//         <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-[#0e342d] px-6 pb-4 py-10">
//           <nav className="flex flex-1 flex-col">
//             <ul role="list" className="flex flex-1 flex-col gap-y-7">
//               <li>
//                 <ul role="list" className="-mx-2 space-y-1">
//                   {navigation.map((item) => (
//                     <li key={item.name}>
//                       <Link
//                         href={item.href}
//                         className={classNames(
//                           item.href === "/"
//                             ? pathname === "/"
//                               ? "bg-[#207262] text-white"
//                               : "text-white hover:bg-[#207262] hover:w-full hover:text-white"
//                             : pathname.includes(item.href)
//                             ? "bg-[#207262] text-white"
//                             : "text-white hover:bg-[#207262] hover:w-full hover:text-white",
//                           "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
//                         )}
//                       >
//                         <item.icon
//                           aria-hidden="true"
//                           className="h-6 w-6 shrink-0"
//                         />
//                         {item.name}
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
//               </li>
//               <li>
//                 <div className="text-xs font-semibold leading-6 text-gray-400">
//                   Actions
//                 </div>
//                 <ul role="list" className="-mx-2 mt-2 space-y-1">
//                   {actions.map((item) => (
//                     <li key={item.name}>
//                       <button
//                         onClick={item.onclick}
//                         className={classNames(
//                           item.current
//                             ? "bg-[#207262] text-white"
//                             : "text-white hover:bg-[#207262] hover:w-full hover:text-white",
//                           "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
//                         )}
//                       >
//                         <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-green-900 bg-green-800 text-[0.625rem] font-medium text-white group-hover:text-white">
//                           {item.initial}
//                         </span>
//                         <span className="truncate">{item.name}</span>
//                       </button>
//                     </li>
//                   ))}
//                 </ul>
//               </li>
//               <li className="mt-auto">
//                 <Link
//                   onClick={() => handleLogout()}
//                   className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-white hover:bg-[#207262] hover:w-full hover:text-white"
//                   href="/login"
//                 >
//                   <Cog6ToothIcon
//                     aria-hidden="true"
//                     className="h-6 w-6 shrink-0"
//                   />
//                   Logout
//                 </Link>
//               </li>
//             </ul>
//           </nav>
//         </div>
//         <ModalAddAsset />
//       </div>
//     </>
//   );
// }

"use client";
import { HomeIcon } from "@/assets/svg/home-icon";
import { InquiryIcon } from "@/assets/svg/inquiry-icon";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { useRootLayoutContext } from "@/providers/rootProviders/RootLayoutProviders";
import CLink from "@/components/componentsV2/atoms/link";
import Image from "next/image";
// import { RevisionIcon } from '@/assets/svg/revision-icon'

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
