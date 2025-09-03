"use client";

import { Suspense, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import TabNavigation from "@/components/app/TabNavigation/TabNavigation";

import classes from "./page.module.css";
import Profile from "./Profile/Profile";
import Security from "./Security/Security";
import Team from "./Team/Team";

const tabList = ["Profile", "Security", "Team"] as const;

type TabType = (typeof tabList)[number];

const ProfileAndSettingsPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Convert query param to tab name
  const typeParam = searchParams.get("type");
  const isValidTab = (t: string): t is TabType =>
    tabList.map((v) => v.toLowerCase()).includes(t.toLowerCase());

  const initialTab: TabType =
    typeParam && isValidTab(typeParam)
      ? (tabList.find(
          (t) => t.toLowerCase() === typeParam.toLowerCase()
        ) as TabType)
      : "Profile";

  const [tab, setTab] = useState<TabType>(initialTab);

  // Sync tab -> URL
  useEffect(() => {
    const currentParam = searchParams.get("type");
    if (tab.toLowerCase() !== currentParam?.toLowerCase()) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("type", tab.toLowerCase());
      router.replace(`${pathname}?${params.toString()}`);
    }
  }, [pathname, router, searchParams, tab]);

  // Sync URL -> tab (in case user changes query param manually)
  useEffect(() => {
    if (typeParam && isValidTab(typeParam)) {
      const normalized = tabList.find(
        (t) => t.toLowerCase() === typeParam.toLowerCase()
      )!;
      setTab(normalized);
    }
  }, [typeParam]);

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div className={classes.title}>Account Settings</div>
        <div className={classes.description}>
          Manage your profile, preferences and account settings
        </div>
      </div>

      <TabNavigation
        tab={tab}
        tabList={tabList}
        tabWidth="container-width"
        onTabChange={(selectedTab) => setTab(selectedTab)}
        renderItem={(tab) => (
          <div className={classes.tab}>
            {tab === "Profile" && profileIcon}
            {tab === "Security" && securityIcon}
            {tab === "Team" && teamIcon}
            {tab}
          </div>
        )}
      />

      <div style={{ marginBottom: "32px" }} />

      {tab === "Profile" && <Profile />}
      {tab === "Security" && <Security />}
      {tab === "Team" && <Team />}
    </div>
  );
};

const ProfileAndSettingsPageWithSuspense = () => {
  return (
    <Suspense>
      <ProfileAndSettingsPage />
    </Suspense>
  );
};

export default ProfileAndSettingsPageWithSuspense;

const profileIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="21"
    height="20"
    viewBox="0 0 21 20"
    fill="none"
  >
    <path
      d="M10.2004 10.6243C7.55869 10.6243 5.40869 8.47435 5.40869 5.83268C5.40869 3.19102 7.55869 1.04102 10.2004 1.04102C12.842 1.04102 14.992 3.19102 14.992 5.83268C14.992 8.47435 12.842 10.6243 10.2004 10.6243ZM10.2004 2.29102C8.25036 2.29102 6.65869 3.88268 6.65869 5.83268C6.65869 7.78268 8.25036 9.37435 10.2004 9.37435C12.1504 9.37435 13.742 7.78268 13.742 5.83268C13.742 3.88268 12.1504 2.29102 10.2004 2.29102Z"
      fill="#4B5563"
    />
    <path
      d="M17.3587 18.9583C17.017 18.9583 16.7337 18.675 16.7337 18.3333C16.7337 15.4583 13.8003 13.125 10.2003 13.125C6.60032 13.125 3.66699 15.4583 3.66699 18.3333C3.66699 18.675 3.38366 18.9583 3.04199 18.9583C2.70033 18.9583 2.41699 18.675 2.41699 18.3333C2.41699 14.775 5.90866 11.875 10.2003 11.875C14.492 11.875 17.9837 14.775 17.9837 18.3333C17.9837 18.675 17.7003 18.9583 17.3587 18.9583Z"
      fill="#4B5563"
    />
  </svg>
);

const securityIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      d="M17.4252 9.26756C17.4252 13.3426 14.4669 17.1592 10.4252 18.2759C10.1502 18.3509 9.85019 18.3509 9.57519 18.2759C5.53352 17.1592 2.5752 13.3426 2.5752 9.26756V5.60922C2.5752 4.92588 3.09187 4.15088 3.73354 3.89255L8.37519 1.99258C9.41685 1.56758 10.5919 1.56758 11.6335 1.99258L16.2752 3.89255C16.9085 4.15088 17.4335 4.92588 17.4335 5.60922L17.4252 9.26756Z"
      stroke="#6B7280"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const teamIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="21"
    height="20"
    viewBox="0 0 21 20"
    fill="none"
  >
    <path
      d="M8.49056 9.05768C8.40723 9.04935 8.30723 9.04935 8.21556 9.05768C6.23223 8.99102 4.65723 7.36602 4.65723 5.36602C4.65723 3.32435 6.30723 1.66602 8.35723 1.66602C10.3989 1.66602 12.0572 3.32435 12.0572 5.36602C12.0489 7.36602 10.4739 8.99102 8.49056 9.05768Z"
      stroke="#6B7280"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.5326 3.33398C16.1493 3.33398 17.4493 4.64232 17.4493 6.25065C17.4493 7.82565 16.1993 9.10899 14.641 9.16732C14.5743 9.15899 14.4993 9.15899 14.4243 9.16732"
      stroke="#6B7280"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4.32402 12.134C2.30736 13.484 2.30736 15.684 4.32402 17.0257C6.61569 18.559 10.374 18.559 12.6657 17.0257C14.6824 15.6757 14.6824 13.4757 12.6657 12.134C10.3824 10.609 6.62402 10.609 4.32402 12.134Z"
      stroke="#6B7280"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16.1406 16.666C16.7406 16.541 17.3073 16.2993 17.774 15.941C19.074 14.966 19.074 13.3577 17.774 12.3827C17.3156 12.0327 16.7573 11.7993 16.1656 11.666"
      stroke="#6B7280"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
