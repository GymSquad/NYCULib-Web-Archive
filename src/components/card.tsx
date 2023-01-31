import { type Record } from "@prisma/client";

type CardProps = Omit<Record, "id">;

export const Card = ({ office, url, updatedAt, clickTimes }: CardProps) => {
  return (
    <div className="border-b-[1.5px] border-gray-300 py-2 px-4">
      <div className="py-1">{office}</div>
      <ul className="text-sm text-ar-text-card">
        <li>
          網站連結｜
          <a href={url} rel="noreferrer" target="_blank">
            {url}
          </a>
        </li>
        <li>最後更新｜{updatedAt.toISOString().slice(0, 10)}</li>
        <li>點擊次數｜{clickTimes}</li>
      </ul>
    </div>
  );
};
