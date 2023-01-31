import { places } from "@/data/mock";
import Link from "next/link";
import { useRef, useState, type FC } from "react";
import { VscChevronLeft, VscChevronRight } from "react-icons/vsc";

export const ScrollBar: FC = () => {
  const sliderRef = useRef<HTMLInputElement>(null);
  const slide = (offset: number) => {
    // for the buttons
    if (!sliderRef.current) return;
    sliderRef.current.scrollLeft += offset;
  };

  const [chosenIndex, setChosenIndex] = useState(0);

  const changeColor = (ind: number) => {
    // change font color on click
    setChosenIndex(ind);
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
          {places.map((place, ind) => (
            <Link
              className={ind === chosenIndex ? "text-ar-principal" : ""}
              href="/"
              key={place.name}
              onClick={() => changeColor(ind)}
            >
              {place.name}
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
