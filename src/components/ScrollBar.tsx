import classNames from "classnames";
import Link from "next/link";
import { useRef, type FC } from "react";
import { VscChevronLeft, VscChevronRight } from "react-icons/vsc";

type ScrollBarProps = {
  offices: { id: string; name: string }[];
  activeId: string;
};

export const ScrollBar: FC<ScrollBarProps> = (props) => {
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
          className="flex-shrink-0 cursor-pointer border-r border-gray-700 opacity-30 hover:opacity-70 "
          onClick={() => slide(-500)}
          size={30}
        />
        <div
          ref={sliderRef}
          className="flex items-center gap-14 overflow-x-scroll scroll-smooth whitespace-nowrap font-serif font-bold scrollbar-hide"
        >
          {props.offices.map((office) => (
            <Link
              className={classNames(
                office.id === props.activeId && "text-ar-principal"
              )}
              href={`/office/${office.id}`}
              key={office.id}
            >
              {office.name}
            </Link>
          ))}
        </div>
        <VscChevronRight
          className="flex-shrink-0 cursor-pointer border-l border-gray-700 opacity-30 hover:opacity-70"
          onClick={() => slide(500)}
          size={30}
        />
      </div>
    </>
  );
};
