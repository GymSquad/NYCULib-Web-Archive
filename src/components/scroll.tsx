import { type Office } from "@prisma/client";
import Link from "next/link";
import { useRef, type FC } from "react";
import { VscChevronLeft, VscChevronRight } from "react-icons/vsc";

type scrollBarProps = {
  offices: Office[];
  activeId: string;
};

export const ScrollBar: FC<scrollBarProps> = (props) => {
  const sliderRef = useRef<HTMLInputElement>(null);
  const slide = (offset: number) => {
    // for the buttons
    if (!sliderRef.current) return;
    sliderRef.current.scrollLeft += offset;
  };

  return (
    <>
      <div className="relative flex flex-1 items-center p-2">
        <VscChevronLeft
          className="cursor-pointer opacity-30 hover:opacity-70"
          onClick={() => slide(-500)}
          size={30}
        />
        <div
          ref={sliderRef}
          className="flex items-center gap-14 overflow-x-scroll scroll-smooth whitespace-nowrap font-serif font-bold scrollbar-hide"
        >
          {props.offices.map((office) => (
            <Link
              className={
                office.id === props.activeId ? "text-ar-principal" : ""
              }
              href={`/office/${office.id}`}
              key={office.id}
            >
              {office.name}
            </Link>
          ))}
        </div>
        <VscChevronRight
          className="cursor-pointer opacity-30 hover:opacity-70"
          onClick={() => slide(500)}
          size={30}
        />
      </div>
    </>
  );
};
