import { Transition } from "@headlessui/react";
import { useState, type FC } from "react";
import { BsChevronCompactDown } from "react-icons/bs";
import { CollapseList } from "./collapse-list";

export const Collapse: FC = () => {
  const [show, setShow] = useState(false);
  function toggle() {
    setShow((prev) => !prev);
  }

  return (
    <div className="hidden md:block">
      <button
        onClick={toggle}
        className="flex w-36 select-none flex-col items-center rounded-sm p-2"
      >
        所有行政單位
        <div className="relative">
          <BsChevronCompactDown className="absolute translate-x-[-50%]" />
          <BsChevronCompactDown className="absolute mt-1 translate-x-[-50%]" />
        </div>
      </button>
      <Transition
        show={show}
        enter="transition-opacity duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <CollapseList />
      </Transition>
    </div>
  );
};
