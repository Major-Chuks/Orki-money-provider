"use client";

import classes from "./PageLayout.module.css";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { usePathname } from "next/navigation";
import { routes } from "@/services/routes";

export const queryClient = new QueryClient();

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  // auth routes
  if (pathname.includes("/user")) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  }

  // app routes
  if (pathname.includes("/app")) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  }

  // Koywe sdk router
  if (pathname.includes("/koywe")) {
    return <>{children}</>;
  }

  if (routes.miniWidget === pathname) {
    return (
      <QueryClientProvider client={queryClient}>
        {/* <MiniNavbar /> */}
        <div className={classes.main}>{children}</div>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <div className={classes.main}>
        <div className={classes.shade}></div>
        {children}
      </div>
      <Footer />
    </QueryClientProvider>
  );
};

export default PageLayout;
