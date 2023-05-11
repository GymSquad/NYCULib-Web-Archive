import { type FC } from "react";
import { type CardProps } from "../types/props";
import { Card } from "./Card";

export const WebsiteList: FC<{ websites: CardProps[] }> = ({ websites }) => {
  if (websites.length === 0) {
    return <section className=" mt-20 text-center text-2xl">No data</section>;
  }
  return (
    <section className="mt-6 grid grid-cols-1 gap-x-12 px-16 lg:grid-cols-2">
      {websites.map((web) => (
        <Card key={web.id} {...web} />
      ))}
    </section>
  );
};
