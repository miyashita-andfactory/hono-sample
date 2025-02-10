import dayjs from "dayjs";

export const formatScheduleTime = (isoString: string): string => {
  return dayjs(isoString).format("YYYY/MM/DD HH:mm:ss");
};
