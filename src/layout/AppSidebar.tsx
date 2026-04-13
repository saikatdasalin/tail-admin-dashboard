import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import {
  BoxCubeIcon,
  ChevronDownIcon,
  GridIcon,
  UserCircleIcon,
} from "../icons";
import { useSidebar } from "../context/SidebarContext";
import { ChevronsRight } from "lucide-react";
import { Dot } from "lucide-react";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: SubItem[];
};

type SubItem = {
  name: string;
  path: string;
  pro?: boolean;
  new?: boolean;
  icon?: React.ReactNode;
  subItems?: SubItem[];
};

// Combine all navigation items into a single array
const navItems: NavItem[] = [
  {
    icon: <GridIcon />,
    name: "Dashboard",
    path: "/",
  },
  {
    icon: <UserCircleIcon />,
    name: "User Profile",
    path: "/profile",
  },
  {
    icon: <BoxCubeIcon />,
    name: "UI Elements",
    subItems: [
      {
        icon: <ChevronsRight />,
        name: "Components",
        path: "/components",
        pro: false,
        new: false,

        subItems: [
          {
            icon: <Dot />,
            name: "Avatar",
            path: "/avatars",
            pro: false,
            new: false,
          },
          {
            icon: <Dot />,
            name: "Badge",
            path: "/badge",
            pro: false,
            new: false,
          },
          {
            icon: <Dot />,
            name: "Buttons",
            path: "/buttons",
            pro: false,
            new: false,
          },
          {
            icon: <Dot />,
            name: "Form Elements",
            path: "/form-elements",
            pro: false,
            new: false,
          },
          {
            icon: <Dot />,
            name: "Calendar",
            path: "/calendar",
            pro: false,
            new: false,
          },
          {
            icon: <Dot />,
            name: "Basic Tables",
            path: "/basic-tables",
            pro: false,
            new: false,
          },
        ],
      },
      {
        name: "Charts",
        icon: <ChevronsRight />,
        path: "/charts",
        pro: false,
        new: false,
        subItems: [
          {
            icon: <Dot />,
            name: "Line Chart",
            path: "/line-chart",
            pro: false,
            new: false,
          },
          {
            icon: <Dot />,
            name: "Bar Chart",
            path: "/bar-chart",
            pro: false,
            new: false,
          },
          {
            icon: <Dot />,
            name: "Pie Chart",
            path: "/pie-chart",
            pro: false,
            new: true,
          },
        ],
      },
      {
        name: "Authentication",
        icon: <ChevronsRight />,
        path: "/authentication",
        pro: false,
        new: false,
        subItems: [
          {
            icon: <Dot />,
            name: "Sign In",
            path: "/signin",
            pro: false,
            new: false,
          },
          {
            icon: <Dot />,
            name: "Sign Up",
            path: "/signup",
            pro: false,
            new: false,
          },
        ],
      },
      {
        icon: <ChevronsRight />,
        name: "Images",
        path: "/images",
        pro: false,
        new: false,
      },
      {
        icon: <ChevronsRight />,
        name: "Videos",
        path: "/videos",
        pro: false,
        new: false,
      },
      {
        icon: <ChevronsRight />,
        name: "Blank Page",
        path: "/blank",
        pro: false,
        new: false,
      },
      {
        icon: <ChevronsRight />,
        name: "404 Error",
        path: "/error-404",
        pro: false,
        new: false,
      },
    ],
  },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const location = useLocation();

  const [openSubmenu, setOpenSubmenu] = useState<number | null>(null);

  const [openNestedSubmenu, setOpenNestedSubmenu] = useState<{
    parentIndex: number;
    index: number;
  } | null>(null);

  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {}
  );

  const [nestedSubMenuHeight, setNestedSubMenuHeight] = useState<
    Record<string, number>
  >({});

  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const nestedSubMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // const isActive = (path: string) => location.pathname === path;
  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname]
  );

  useEffect(() => {
    let submenuMatched = false;
    let nestedSubmenuMatched = false;

    navItems.forEach((nav, index) => {
      if (nav.subItems) {
        nav.subItems.forEach((subItem, subIndex) => {
          if (subItem.subItems) {
            subItem.subItems.forEach((nestedItem) => {
              if (isActive(nestedItem.path)) {
                setOpenSubmenu(index);
                setOpenNestedSubmenu({
                  parentIndex: subIndex,
                  index: index,
                });
                submenuMatched = true;
                nestedSubmenuMatched = true;
              }
            });
          }

          if (isActive(subItem.path)) {
            setOpenSubmenu(index);
            submenuMatched = true;
          }
        });
      }
    });

    if (!submenuMatched) {
      setOpenSubmenu(null);
    }

    if (!nestedSubmenuMatched) {
      setOpenNestedSubmenu(null);
    }
  }, [location, isActive]);

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }

    if (openNestedSubmenu !== null) {
      const key = `${openNestedSubmenu.index}-${openNestedSubmenu.parentIndex}`;
      if (nestedSubMenuRefs.current[key]) {
        setNestedSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: nestedSubMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu, openNestedSubmenu]);

  const handleSubmenuToggle = (index: number) => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (prevOpenSubmenu === index) {
        return null;
      }
      return index;
    });
  };

  const handleNestedSubmenuToggle = (parentIndex: number, index: number) => {
    setOpenNestedSubmenu((prevOpenNestedSubmenu) => {
      if (
        prevOpenNestedSubmenu &&
        prevOpenNestedSubmenu.parentIndex === parentIndex &&
        prevOpenNestedSubmenu.index === index
      ) {
        return null;
      }
      return { parentIndex, index };
    });
  };

  const renderMenuItems = (items: NavItem[]) => (
    <ul className="flex flex-col gap-4">
      {items.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index)}
              className={`menu-item group ${
                openSubmenu === index
                  ? "menu-item-active"
                  : "menu-item-inactive"
              } cursor-pointer ${
                !isExpanded && !isHovered
                  ? "lg:justify-center"
                  : "lg:justify-start"
              }`}
            >
              <span
                className={`menu-item-icon-size  ${
                  openSubmenu === index
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className="menu-item-text">{nav.name}</span>
              )}
              {(isExpanded || isHovered || isMobileOpen) && (
                <ChevronDownIcon
                  className={`ml-auto w-5 h-5 transition-transform duration-200 ${
                    openSubmenu === index ? "rotate-180 text-brand-500" : ""
                  }`}
                />
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                to={nav.path}
                className={`menu-item group ${
                  isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                }`}
              >
                <span
                  className={`menu-item-icon-size ${
                    isActive(nav.path)
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                  }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="menu-item-text">{nav.name}</span>
                )}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu === index
                    ? `${subMenuHeight[`${index}`]}px`
                    : "0px",
              }}
            >
              <ul className="mt-2 space-y-1 ml-3">
                {nav.subItems.map((subItem, subIndex) => (
                  <li key={subItem.name}>
                    {subItem.subItems ? (
                      <div>
                        <button
                          onClick={() =>
                            handleNestedSubmenuToggle(subIndex, index)
                          }
                          className={`menu-dropdown-item flex items-center w-full ${
                            isActive(subItem.path)
                              ? "menu-dropdown-item-active"
                              : "menu-dropdown-item-inactive"
                          }`}
                        >
                          {subItem.icon && (
                            <span className="inline-flex items-center justify-center">
                              {subItem.icon}
                            </span>
                          )}
                          {subItem.name}
                          <span className="flex items-center gap-1 ml-auto">
                            {subItem.new && (
                              <span
                                className={`${
                                  isActive(subItem.path)
                                    ? "menu-dropdown-badge-active"
                                    : "menu-dropdown-badge-inactive"
                                } menu-dropdown-badge`}
                              >
                                new
                              </span>
                            )}
                            {subItem.pro && (
                              <span
                                className={`${
                                  isActive(subItem.path)
                                    ? "menu-dropdown-badge-active"
                                    : "menu-dropdown-badge-inactive"
                                } menu-dropdown-badge`}
                              >
                                pro
                              </span>
                            )}
                            <ChevronDownIcon
                              className={`w-4 h-4 transition-transform duration-200 ${
                                openNestedSubmenu?.parentIndex === subIndex &&
                                openNestedSubmenu?.index === index
                                  ? "rotate-180 text-brand-500"
                                  : ""
                              }`}
                            />
                          </span>
                        </button>
                        <div
                          ref={(el) => {
                            nestedSubMenuRefs.current[`${index}-${subIndex}`] =
                              el;
                          }}
                          className="overflow-hidden transition-all duration-300"
                          style={{
                            height:
                              openNestedSubmenu?.parentIndex === subIndex &&
                              openNestedSubmenu?.index === index
                                ? `${
                                    nestedSubMenuHeight[`${index}-${subIndex}`]
                                  }px`
                                : "0px",
                          }}
                        >
                          <ul className="mt-1 space-y-1 ml-4">
                            {subItem.subItems.map((nestedItem) => (
                              <li key={nestedItem.name}>
                                <Link
                                  to={nestedItem.path}
                                  className={`menu-dropdown-item pl-2 ${
                                    isActive(nestedItem.path)
                                      ? "menu-dropdown-item-active"
                                      : "menu-dropdown-item-inactive"
                                  }`}
                                >
                                  {nestedItem.icon && (
                                    <span className="inline-flex items-center justify-center">
                                      {nestedItem.icon}
                                    </span>
                                  )}
                                  {nestedItem.name}
                                  <span className="flex items-center gap-1 ml-auto">
                                    {nestedItem.new && (
                                      <span
                                        className={`${
                                          isActive(nestedItem.path)
                                            ? "menu-dropdown-badge-active"
                                            : "menu-dropdown-badge-inactive"
                                        } menu-dropdown-badge`}
                                      >
                                        new
                                      </span>
                                    )}
                                    {nestedItem.pro && (
                                      <span
                                        className={`${
                                          isActive(nestedItem.path)
                                            ? "menu-dropdown-badge-active"
                                            : "menu-dropdown-badge-inactive"
                                        } menu-dropdown-badge`}
                                      >
                                        pro
                                      </span>
                                    )}
                                  </span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ) : (
                      <Link
                        to={subItem.path}
                        className={`menu-dropdown-item ${
                          isActive(subItem.path)
                            ? "menu-dropdown-item-active"
                            : "menu-dropdown-item-inactive"
                        }`}
                      >
                        {subItem.icon && (
                          <span className="mr-2 inline-flex items-center justify-center">
                            {subItem.icon}
                          </span>
                        )}
                        {subItem.name}
                        <span className="flex items-center gap-1 ml-auto">
                          {subItem.new && (
                            <span
                              className={`ml-auto ${
                                isActive(subItem.path)
                                  ? "menu-dropdown-badge-active"
                                  : "menu-dropdown-badge-inactive"
                              } menu-dropdown-badge`}
                            >
                              new
                            </span>
                          )}
                          {subItem.pro && (
                            <span
                              className={`ml-auto ${
                                isActive(subItem.path)
                                  ? "menu-dropdown-badge-active"
                                  : "menu-dropdown-badge-inactive"
                              } menu-dropdown-badge`}
                            >
                              pro
                            </span>
                          )}
                        </span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-sidebar-bg dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-2 flex ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-center"
        }`}
      >
        <Link to="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <img
                className="dark:hidden"
                src="/images/logo/CraftCodeLogo.png"
                alt="Logo"
                width={300}
                height={40}
              />
              <img
                className="hidden dark:block"
                src="/images/logo/CraftCodeLogo.png"
                alt="Logo"
                width={300}
                height={40}
              />
            </>
          ) : (
            <img
              src="/images/logo/CraftCodeLogo.png"
              alt="Logo"
              width={50}
              height={50}
            />
          )}
        </Link>
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">{renderMenuItems(navItems)}</div>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;
