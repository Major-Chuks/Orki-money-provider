"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const queryClient = new QueryClient();

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <React.Fragment>{children}</React.Fragment>
    </QueryClientProvider>
  );
};

export default AppLayout;
