import { type FC } from "react";
import { type CardProps } from "../types/props";

export const Card: FC<CardProps> = ({ name, url, updatedAt, viewCount }) => {
  return (
    <div className="border-b-[1.5px] border-gray-300 py-2 px-4">
      <div className="py-1">{name}</div>
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
        <li>最後更新｜{updatedAt.slice(0, 10)}</li>
        <li>點擊次數｜{viewCount}</li>
      </ul>
    </div>
  );
};
