import { Provider } from "react-redux";
import { setupStore } from "@/redux/store";
import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function AppProvider({ children }: Props) {
  return <Provider store={setupStore()}>{children}</Provider>;
}
