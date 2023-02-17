import Link from "next/link";
import { type FC } from "react";
import { type CollapseProps } from "./Collapse";

export const CollapseList: FC<CollapseProps> = ({ items, activeId }) => {
  return (
    <div className="relative mt-2">
      <menu className="absolute mt-2 flex flex-col bg-ar-collapse/75 py-4 text-white">
        {items.map((item) => (
          <Link
            href={item.urlId ? `/office/${item.urlId}` : "/"}
            key={item.id}
            className={`${
              item.id === activeId ? "bg-ar-collapse/90" : ""
            } flex h-10 w-36 items-center justify-center p-4 text-center hover:bg-ar-collapse`}
          >
            {item.name}
          </Link>
        ))}
      </menu>
    </div>
  );
};
