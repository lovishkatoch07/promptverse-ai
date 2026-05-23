import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Toaster } from "@/components/ui/sonner";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "@tanstack/react-router";

export function Layout({ children, hideFooter = false }: { children: React.ReactNode; hideFooter?: boolean }) {
  const location = useLocation();

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          exit={{ opacity: 0, filter: "blur(10px)", y: -10 }}
          transition={{
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1]
          }}
        >
          {children}
        </motion.main>
      </AnimatePresence>
      {!hideFooter && <Footer />}
      <Toaster position="bottom-right" />
    </div>
  );
}