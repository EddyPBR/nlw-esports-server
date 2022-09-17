// 18:00 -> ["18", "00"] -> [18, 00]

export const convertStringToMinute = (hourString: string) => {
  const [hours, minutes] = hourString.split(":").map(Number);

  const minutesAmount = hours * 60 + minutes;
};
