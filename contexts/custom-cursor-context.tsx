"use client";
import { useContext, createContext, useState } from "react";

const customCursorContext = createContext({
  isVisible: true,
  setIsVisible: (_: boolean) => { },
});

const CustomCursorContextProvider = function({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isVisible, setIsVisible] = useState(true);
  return (
    <customCursorContext.Provider
      value={{
        isVisible,
        setIsVisible,
      }}
    >
      {children}
    </customCursorContext.Provider>
  );
};

export default CustomCursorContextProvider;

export const useCustomCursorContext = function() {
  const context = useContext(customCursorContext);
  if (!customCursorContext) {
    throw new Error("This element don't have access to this context");
  }
  return context;
};
