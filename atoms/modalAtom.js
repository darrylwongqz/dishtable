import { atom } from "recoil";

export const guestModalState = atom({
  key: "guestModalState",
  default: true,
});

export const dateModalState = atom({
  key: "dateModalState",
  default: false,
});

export const timeModalState = atom({
  key: "timeModalState",
  default: false,
});

export const dynamicModalState = atom({
  key: "dynamicModalState",
  default: false,
});
