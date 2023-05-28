import type { FC } from "react";

export type Simplify<T> = {
  [K in keyof T]: T[K] extends object ? Simplify<T[K]> : T[K];
} extends infer X
  ? X
  : never;

export type SimplifiedFC<P> = FC<Simplify<P>>;
