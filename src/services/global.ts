export const REVALIDATE_IN_SECONDS = 120;

export const NotFound = {
  notFound: true,
  revalidate: REVALIDATE_IN_SECONDS,
} as const;
