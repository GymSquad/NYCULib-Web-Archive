import { type FC } from "react";
import { type CardProps } from "../types/props";
import { Card } from "./card";

export const WebsiteList: FC<{ websites: CardProps[] }> = ({ websites }) => {
  return (
    <section className="mt-6 grid grid-cols-1 gap-x-12 px-16 lg:grid-cols-2">
      {websites.map((web) => (
        <Card key={web.name} {...web} />
      ))}
    </section>
  );
};
