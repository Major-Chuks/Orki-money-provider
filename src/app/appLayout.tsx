"use client";

import classes from "./appLayout.module.css";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { usePathname } from "next/navigation";
import AuthLayout from "./(auth)/AuthLayout/AuthLayout";

export const queryClient = new QueryClient();

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const authRoutes = ["/sign-up", "/login"];

  if (authRoutes.includes(pathname)) {
    return (
      <QueryClientProvider client={queryClient}>
        <AuthLayout>{children}</AuthLayout>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <div className={classes.main}>{children}</div>
      <Footer />
    </QueryClientProvider>
  );
};

export default AppLayout;
