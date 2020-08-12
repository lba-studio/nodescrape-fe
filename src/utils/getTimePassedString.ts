import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export default function (pastTime: Date): string {
  return dayjs(pastTime).fromNow();
}
