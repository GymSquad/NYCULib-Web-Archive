import { useState, type FC } from "react";
import { BsChevronCompactDown } from "react-icons/bs";

const CreateList: FC = () => {
  const searchResult = ["總務處", "教務處", "系辦"];
  return (
    <menu className="relative">
      <div className="absolute mt-2 flex flex-col bg-ar-collapse/75 py-4 text-white">
        {searchResult.map((r) => (
          <div
            key={r}
            className="flex h-10 w-36 items-center justify-center p-4 text-center hover:bg-ar-collapse"
          >
            {r}
          </div>
        ))}
      </div>
    </menu>
  );
};

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

      <div className={show ? "mt-2" : "hidden"}>
        <menu>
          <div>
            <CreateList />
          </div>
        </menu>
      </div>
    </div>
  );
};
