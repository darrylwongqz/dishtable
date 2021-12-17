import { atom } from "recoil";

export const geoState = atom({
  key: "geoState",
  default: "SG",
});

export const activatedNavState = atom({
  key: "activatedNavState",
  default: false,
});
