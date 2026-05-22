import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function Layout({ children, hideFooter = false }: { children: React.ReactNode; hideFooter?: boolean }) {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main>{children}</main>
      {!hideFooter && <Footer />}
    </div>
  );
}