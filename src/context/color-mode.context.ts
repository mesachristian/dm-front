import { createContext } from "react";

export const ColorModeContext = createContext({ toggleColorMode: () => {}, setColorMode: (m: ColorModeType) => {} });