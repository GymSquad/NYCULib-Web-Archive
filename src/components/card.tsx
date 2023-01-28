import { type ApiRecord } from "@/types/record";

type CardProps = Omit<ApiRecord, "id">;

export const Card = ({ office, url, updatedAt, clickTimes }: CardProps) => {
  return (
    <div className="border-b">
      <div>{office}</div>
      <ul>
        <li>
          網站連結｜<a href={url}>{url}</a>
        </li>
        <li>最後更新｜{updatedAt.slice(0, 10)}</li>
        <li>點擊次數｜{clickTimes}</li>
      </ul>
    </div>
  );
};
