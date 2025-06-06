import type { ReactElement } from "react";
import { MenuSide } from "../MenuSideLayoutComponent";
import { Header } from "../HeaderLayoutComponent";

interface LayoutProps {
  children: ReactElement;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex h-screen">
      <MenuSide />
      <div className="flex flex-col flex-1 ">
        <Header />
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
};
