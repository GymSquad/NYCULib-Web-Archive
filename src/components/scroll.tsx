import Link from "next/link";
import { useRef, useState, type FC } from "react";
import { VscChevronLeft, VscChevronRight } from "react-icons/vsc";

interface Place {
  // type of the places to be selected
  name: string;
  chosen: boolean;
}

const places: Place[] = [
  // list of places to be selected
  { name: "校長室", chosen: false },
  { name: "教務處", chosen: false },
  { name: "總務處", chosen: false },
  { name: "人事室", chosen: false },
  { name: "會計室", chosen: false },
  { name: "體育室", chosen: false },
  { name: "軍訓室", chosen: false },
  { name: "圖書館", chosen: false },
  { name: "學生事務處", chosen: false },
  { name: "研發處", chosen: false },
  { name: "國際事務處", chosen: false },
];

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
