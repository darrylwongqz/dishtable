import { format } from "date-fns";

export const cityMatcher = (city) => {
  switch (city) {
    case "SG":
      return "Singapore";
    case "KR":
      return "Seoul";
    case "FR":
      return "France";
    case "UK":
      return "London";

    default:
      return "Singapore";
  }
};

export const dateConverter = (selectedDate) => {
  const selectedDay = selectedDate.getDate();
  const selectedMonth = selectedDate.getMonth();
  const selectedYear = selectedDate.getFullYear();
  const formattedSelectedDate = format(
    new Date(selectedYear, selectedMonth, selectedDay),
    "dd-MM-yyyy"
  );
  return formattedSelectedDate;
};
