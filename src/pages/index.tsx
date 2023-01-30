import { type NextPage } from "next";
import { VscChevronLeft, VscChevronRight } from "react-icons/vsc";
import Link from "next/link";

const Home: NextPage = () => {
  const slideLeft = () => {
    // for the buttons
    const slider = document.getElementById("scroll") as HTMLInputElement;
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    // for the buttons
    const slider = document.getElementById("scroll") as HTMLInputElement;
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  const changeColor = () => {
    // change font color on click
    const color = document.getElementById("colors") as HTMLInputElement;
    color.style.color = "#820000";
  };

  interface place {
    // type of the places to be selected
    name: string;
    chosen: boolean;
  }

  const places: place[] = [
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

  return (
    <>
      <div className="relative flex items-center bg-stone-100">
        <VscChevronLeft
          className="cursor-pointer opacity-30 hover:opacity-70"
          onClick={slideLeft}
          size={30}
        />
        <div
          id="scroll"
          className="flex h-full w-full items-center gap-14 overflow-x-scroll scroll-smooth whitespace-nowrap font-serif font-bold scrollbar-hide"
        >
          <Link id="colors" href="/" onClick={changeColor}>
            {places[0]?.name}
          </Link>
          <Link id="colors" href="/" onClick={changeColor}>
            {places[1]?.name}
          </Link>
          <Link id="colors" href="/" onClick={changeColor}>
            {places[2]?.name}
          </Link>
          <Link id="colors" href="/" onClick={changeColor}>
            {places[3]?.name}
          </Link>
          <Link id="colors" href="/" onClick={changeColor}>
            {places[4]?.name}
          </Link>
          <Link id="colors" href="/" onClick={changeColor}>
            {places[5]?.name}
          </Link>
          <Link id="colors" href="/" onClick={changeColor}>
            {places[6]?.name}
          </Link>
          <Link id="colors" href="/" onClick={changeColor}>
            {places[7]?.name}
          </Link>
          <Link id="colors" href="/" onClick={changeColor}>
            {places[8]?.name}
          </Link>
          <Link id="colors" href="/" onClick={changeColor}>
            {places[9]?.name}
          </Link>
          <Link id="colors" href="/" onClick={changeColor}>
            {places[10]?.name}
          </Link>
        </div>
        <VscChevronRight
          className="cursor-pointer opacity-30 hover:opacity-70"
          onClick={slideRight}
          size={30}
        />
      </div>
    </>
  );
};

export default Home;
