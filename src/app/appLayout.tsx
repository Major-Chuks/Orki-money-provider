"use client";

import classes from "./appLayout.module.css";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { usePathname } from "next/navigation";
import AuthLayout from "./(auth)/AuthLayout/AuthLayout";
import { routes } from "@/services/routes";
import MiniNavbar from "@/components/Navbar/MiniNavbar";

export const queryClient = new QueryClient();

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const authRoutes = [routes.signUp, routes.login, routes.newPassword];

  if (authRoutes.includes(pathname)) {
    return (
      <QueryClientProvider client={queryClient}>
        <AuthLayout>{children}</AuthLayout>
      </QueryClientProvider>
    );
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

export default AppLayout;
