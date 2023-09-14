import { create } from "zustand";

const useStore = create((set) => ({
  token: "",
  setToken: (newToken) => set((state) => ({ token: newToken })),
  loginState: false,
  setLoginState: (newLoginState) =>
    set((state) => ({ loginState: newLoginState })),
  userLevel: 0,
  setUserLevel: (level) => set((state) => ({ userLevel: level })),
  globalShowSideMenu: false,
  setGlobalShowSideMenu: (newSideMenuState) =>
    set((state) => ({ globalShowSideMenu: newSideMenuState })),
}));

export default useStore;
