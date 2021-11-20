import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = (key, value, option) =>
  cookies.set(key, value, { ...option });

export const getCookie = (key) => cookies.get(key);

export const removeCookie = (key) => cookies.remove(key);
