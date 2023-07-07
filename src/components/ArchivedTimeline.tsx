import type { SimplifiedFC } from "@/types/simplify";
import classNames from "classnames";
import Link from "next/link";

export type ArchiveRecord = {
  date: string;
  href: string;
};

export type ArchivedTimelineProps = {
  times: ArchiveRecord[];
  activeDate: string;
};

export const ArchivedTimeline = (({ times, activeDate }) => {
  return (
    <ol className="relative flex items-center overflow-x-scroll scroll-smooth whitespace-nowrap font-serif scrollbar-hide ">
      <span className="relative h-2 w-2 flex-shrink-0 rounded-full bg-ar-collapse"></span>
      <span className="h-0.5 w-16 flex-shrink-0 bg-ar-collapse" />
      {times.map(({ date, href }, index) => (
        <div
          key={date}
          className="relative flex h-16 items-center justify-center"
        >
          {index !== 0 && (
            <span className="h-0.5 w-24 flex-shrink-0 bg-ar-collapse" />
          )}
          <Link href={href} className="relative flex flex-col items-center">
            <span
              className={classNames(
                "relative h-4 w-4 rounded-full border-2 border-ar-collapse",
                { "bg-ar-collapse": activeDate === date }
              )}
            />
            <span className="absolute translate-y-4 whitespace-nowrap font-serif text-ar-collapse">
              {date}
            </span>
          </Link>
        </div>
      ))}
      <span className="h-0.5 w-16 flex-shrink-0 bg-ar-collapse" />
      <span className="relative h-2 w-2 flex-shrink-0 rounded-full bg-ar-collapse"></span>
    </ol>
  );
}) satisfies SimplifiedFC<ArchivedTimelineProps>;

// export const ArchivedTimeline = (({ times, activeDate }) => {
//   return (
//     <ol className="flex items-center gap-8 overflow-x-scroll scroll-smooth whitespace-nowrap border-l px-2 font-serif scrollbar-hide md:gap-16">
//       {times.map(({ date, href }, index) => (
//         <li key={date}>
//           <Link
//             replace
//             href={href}
//             className="flex flex-col items-center gap-2"
//           >
//             <span
//               className={classNames(
//                 "h-4 w-4 rounded-full border-2 border-ar-collapse",
//                 {
//                   "bg-ar-collapse": activeDate === date,
//                   "bg-ar-bg": activeDate !== date,
//                   "relative before:absolute before:inset-y-0 before:left-4 before:my-auto before:h-0.5 before:w-32 before:bg-ar-collapse":
//                     index < times.length - 1,
//                 }
//               )}
//             />
//             <span className="whitespace-nowrap font-serif text-ar-collapse">
//               {date}
//             </span>
//           </Link>
//         </li>
//       ))}
//     </ol>
//   );
// }) satisfies SimplifiedFC<ArchivedTimelineProps>;
