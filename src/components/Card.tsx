import Link from "next/link";
import { type FC } from "react";
import { type CardProps } from "../types/props";

export const Card: FC<CardProps> = ({ name, url, id }) => {
  return (
    <div className="border-b-[1.5px] border-gray-300 py-2 px-4">
      <Link className="py-1" href={`/website/${id}`}>
        {name}
      </Link>
      <ul className="text-sm text-ar-text-card">
        <li className="flex">
          <label className="flex-shrink-0">網站連結｜</label>
          <div className="min-w-0">
            <a
              href={url}
              rel="noreferrer"
              target="_blank"
              className="block truncate"
            >
              {url}
            </a>
          </div>
        </li>
      </ul>
    </div>
  );
};
