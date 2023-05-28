import type { SimplifiedFC } from "@/types/simplify";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import classNames from "classnames";
import Link from "next/link";
import { Fragment, createContext, useContext, type FC } from "react";
import { BsChevronCompactDown } from "react-icons/bs";

type Department = {
  id: string;
  name: string;
  firstOfficeId: string;
};

export type Campus = {
  campus: string;
  departments: Department[];
};

export type DepartmentMenuProps = {
  campuses: Campus[];
};

export type ActiveDepartment = {
  activeDepartmentId: string;
};

const ActiveDepartmentContext = createContext<ActiveDepartment | null>(null);
const useActiveDepartment = () => {
  const activeDepartmentId = useContext(ActiveDepartmentContext);
  if (activeDepartmentId == null) {
    throw new Error("useActiveDepartment must be used within DepartmentMenu");
  }
  return activeDepartmentId;
};

export const DepartmentMenu = (({ campuses, activeDepartmentId }) => {
  return (
    <ActiveDepartmentContext.Provider value={{ activeDepartmentId }}>
      <OfficeDropdownInner campuses={campuses} />
    </ActiveDepartmentContext.Provider>
  );
}) satisfies SimplifiedFC<DepartmentMenuProps & ActiveDepartment>;

const OfficeDropdownInner = (({ campuses }) => {
  return (
    <Menu as="menu" className="relative">
      <Menu.Button className="flex w-36 select-none flex-col items-center rounded-sm p-2">
        <h3>所有校區</h3>
        <div className="relative">
          <BsChevronCompactDown className="absolute translate-x-[-50%]" />
          <BsChevronCompactDown className="absolute mt-1 translate-x-[-50%]" />
        </div>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute left-1/2 mt-6 flex w-36 -translate-x-1/2 flex-col">
          {campuses.map(({ campus, departments }) => (
            <Menu.Item key={campus} as="li" className="w-full" disabled>
              <OfficeDropdownItem campus={campus} departments={departments} />
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}) satisfies FC<DepartmentMenuProps>;

const OfficeDropdownItem = (({ campus, departments }) => {
  const { activeDepartmentId: activeOfficeId } = useActiveDepartment();

  return (
    <Disclosure>
      <Disclosure.Button className="w-full bg-ar-collapse/75 px-4 py-3 font-serif text-white hover:bg-ar-collapse/80">
        {campus}
      </Disclosure.Button>
      <Disclosure.Panel as="ul">
        {departments.map(({ id, name, firstOfficeId: href }) => (
          <li
            key={id}
            className={classNames(
              "flex h-full w-full text-center text-white hover:bg-ar-collapse",
              activeOfficeId === id && "bg-ar-collapse",
              activeOfficeId !== id && "bg-ar-collapse/90"
            )}
          >
            <Link href={`/office/${href}`} className="h-full w-full py-2">
              {name}
            </Link>
          </li>
        ))}
      </Disclosure.Panel>
    </Disclosure>
  );
}) satisfies FC<Campus>;
