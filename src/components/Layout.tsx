import { ReactNode } from "react";
import Navigation from "./Navigation";
import TrustBar from "./TrustBar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <TrustBar />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};

export default Layout;
