"use client";

import classes from "./pageLayoutV2.module.css";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { usePathname } from "next/navigation";
import { routes } from "@/services/routes";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "@/redux/store";

export const queryClient = new QueryClient();

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  // auth routes
  if (pathname.includes("/user")) {
    return <PageWrapper>{children}</PageWrapper>;
  }

  // app routes
  if (pathname.includes("/app")) {
    return <PageWrapper>{children}</PageWrapper>;
  }

  // Koywe sdk router
  if (pathname.includes("/sdk")) {
    return <>{children}</>;
  }

  if (routes.miniWidget === pathname) {
    return (
      <PageWrapper>
        {/* <MiniNavbar /> */}
        <div className={classes.main}>{children}</div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <Navbar />
      <div className={classes.main}>
        {/* <div className={classes.shade}></div> */}
        {children}
      </div>
      <Footer />
    </PageWrapper>
  );
};

export default PageLayout;

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </PersistGate>
      </ReduxProvider>
    </>
  );
};
