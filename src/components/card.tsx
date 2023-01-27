interface CardProps {
  office: string;
  url: string;
  updatedAt: Date;
  clickTimes: number;
}

export const Card = ({ office, url, updatedAt, clickTimes }: CardProps) => {
  return (
    <>
      <h1>{office}</h1>
      <ul>
        <li>
          網站連結｜<a href={url}>{url}</a>
        </li>
        <li>最後更新｜{updatedAt.toISOString().slice(0, 10)}</li>
        <li>點擊次數｜{clickTimes}</li>
      </ul>
    </>
  );
};
