import { places } from "@/data/mock";
import { useState, type FC } from "react";

export const CollapseList: FC = () => {
  const [chosenIndex, setChosenIndex] = useState(0);
  return (
    <div className="relative mt-2">
      <menu className="absolute mt-2 flex flex-col bg-ar-collapse/75 py-4 text-white">
        {places.map(({ name }, ind) => (
          <button
            onClick={() => setChosenIndex(ind)}
            key={name}
            className={`${
              ind === chosenIndex ? "bg-ar-collapse/90" : ""
            } flex h-10 w-36 items-center justify-center p-4 text-center hover:bg-ar-collapse`}
          >
            {name}
          </button>
        ))}
      </menu>
    </div>
  );
};
