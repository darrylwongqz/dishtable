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
