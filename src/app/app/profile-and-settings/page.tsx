"use client";

import { Suspense, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import TabNavigation from "@/components/app/TabNavigation/TabNavigation";
import Profile from "@/components/app/ProfileAndSettings/Profile/Profile";
import Business from "@/components/app/ProfileAndSettings/Business/Business";
import Appearance from "@/components/app/ProfileAndSettings/Appearance/Appearance";
import Notifications from "@/components/app/ProfileAndSettings/Notifications/Notifications";
import Security from "@/components/app/ProfileAndSettings/Security/Security";

import classes from "./page.module.css";
import Payment from "@/components/app/ProfileAndSettings/Payment/Payment";
import Team from "@/components/app/ProfileAndSettings/Users/Team";
import FeesAndMarkup from "@/components/app/ProfileAndSettings/FeesAndMarkup/FeesAndMarkup";

const tabList = [
  "Profile",
  "Business",
  "Payment",
  "Security",
  "Team",
  "Notifications",
  "Appearance",
  "Fees & Markup",
] as const;

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
  }, [tab]);

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
            {tab === "Business" && businessIcon}
            {tab === "Payment" && paymentIcon}
            {tab === "Security" && securityIcon}
            {tab === "Team" && teamIcon}
            {tab === "Notifications" && notifications}
            {tab === "Appearance" && themeIcon}
            {tab === "Fees & Markup" && feesIcon}
            {tab}
          </div>
        )}
      />

      <div style={{ marginBottom: "32px" }} />

      {tab === "Profile" && <Profile />}
      {tab === "Business" && <Business />}
      {tab === "Payment" && <Payment />}
      {tab === "Security" && <Security />}
      {tab === "Team" && <Team />}
      {tab === "Notifications" && <Notifications />}
      {tab === "Appearance" && <Appearance />}
      {tab === "Fees & Markup" && <FeesAndMarkup />}
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

const businessIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="21"
    height="20"
    viewBox="0 0 21 20"
    fill="none"
  >
    <path
      d="M10.9333 18.3327H4.2666C2.59993 18.3327 1.7666 17.4994 1.7666 15.8327V9.16602C1.7666 7.49935 2.59993 6.66602 4.2666 6.66602H8.43327V15.8327C8.43327 17.4994 9.2666 18.3327 10.9333 18.3327Z"
      stroke="#6B7280"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.52492 3.33398C8.45826 3.58398 8.43327 3.85898 8.43327 4.16732V6.66732H4.2666V5.00065C4.2666 4.08398 5.0166 3.33398 5.93327 3.33398H8.52492Z"
      stroke="#6B7280"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.7666 6.66602V10.8327"
      stroke="#6B7280"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.1001 6.66602V10.8327"
      stroke="#6B7280"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.2666 14.166H12.5999C12.1416 14.166 11.7666 14.541 11.7666 14.9993V18.3327H15.0999V14.9993C15.0999 14.541 14.7249 14.166 14.2666 14.166Z"
      stroke="#6B7280"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.1001 10.834V14.1673"
      stroke="#6B7280"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.43359 15.8327V4.16602C8.43359 2.49935 9.26693 1.66602 10.9336 1.66602H15.9336C17.6003 1.66602 18.4336 2.49935 18.4336 4.16602V15.8327C18.4336 17.4993 17.6003 18.3327 15.9336 18.3327H10.9336C9.26693 18.3327 8.43359 17.4993 8.43359 15.8327Z"
      stroke="#6B7280"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const paymentIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="21"
    height="20"
    viewBox="0 0 21 20"
    fill="none"
  >
    <path
      d="M2.30957 7.08789H18.9762"
      stroke="#6B7280"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.64282 13.7539H7.30949"
      stroke="#6B7280"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.39282 13.7539H12.7262"
      stroke="#6B7280"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.00957 2.91992H15.2679C18.2346 2.91992 18.9762 3.65326 18.9762 6.57826V13.4199C18.9762 16.3449 18.2346 17.0783 15.2762 17.0783H6.00957C3.05124 17.0866 2.30957 16.3533 2.30957 13.4283V6.57826C2.30957 3.65326 3.05124 2.91992 6.00957 2.91992Z"
      stroke="#6B7280"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
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

const notifications = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="21"
    height="20"
    viewBox="0 0 21 20"
    fill="none"
  >
    <path
      d="M10.4169 2.42578C7.65855 2.42578 5.41689 4.66745 5.41689 7.42578V9.83411C5.41689 10.3424 5.20022 11.1174 4.94189 11.5508L3.98355 13.1424C3.39189 14.1258 3.80022 15.2174 4.88355 15.5841C8.47522 16.7841 12.3502 16.7841 15.9419 15.5841C16.9502 15.2508 17.3919 14.0591 16.8419 13.1424L15.8836 11.5508C15.6336 11.1174 15.4169 10.3424 15.4169 9.83411V7.42578C15.4169 4.67578 13.1669 2.42578 10.4169 2.42578Z"
      stroke="#6B7280"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
    />
    <path
      d="M11.9588 2.66719C11.7005 2.59219 11.4338 2.53385 11.1588 2.50052C10.3588 2.40052 9.59215 2.45885 8.87549 2.66719C9.11715 2.05052 9.71716 1.61719 10.4172 1.61719C11.1172 1.61719 11.7172 2.05052 11.9588 2.66719Z"
      stroke="#6B7280"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      opacity="0.4"
      d="M12.917 15.8828C12.917 17.2578 11.792 18.3828 10.417 18.3828C9.73366 18.3828 9.10032 18.0995 8.65032 17.6495C8.20032 17.1995 7.91699 16.5661 7.91699 15.8828"
      stroke="#6B7280"
      strokeWidth="1.5"
      strokeMiterlimit="10"
    />
  </svg>
);

const themeIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="21"
    height="20"
    viewBox="0 0 21 20"
    fill="none"
  >
    <path
      d="M1.9668 10.021C1.9668 14.3093 5.1893 17.8435 9.3393 18.321C9.9518 18.3918 10.5451 18.131 10.981 17.6935C11.2425 17.4311 11.3894 17.0757 11.3894 16.7052C11.3894 16.3347 11.2425 15.9793 10.981 15.7168C10.5451 15.2793 10.1893 14.6277 10.5185 14.1052C11.8318 12.0152 18.6335 16.8143 18.6335 10.0218C18.6335 5.40602 14.9026 1.66602 10.3001 1.66602C5.69763 1.66602 1.9668 5.40685 1.9668 10.021Z"
      stroke="#6B7280"
      strokeWidth="1.5"
    />
    <path
      d="M14.8838 10.207C15.229 10.207 15.5088 9.92721 15.5088 9.58203C15.5088 9.23685 15.229 8.95703 14.8838 8.95703C14.5386 8.95703 14.2588 9.23685 14.2588 9.58203C14.2588 9.92721 14.5386 10.207 14.8838 10.207Z"
      stroke="#6B7280"
      strokeWidth="1.5"
    />
    <path
      d="M5.7168 10.207C6.06197 10.207 6.3418 9.92721 6.3418 9.58203C6.3418 9.23685 6.06197 8.95703 5.7168 8.95703C5.37162 8.95703 5.0918 9.23685 5.0918 9.58203C5.0918 9.92721 5.37162 10.207 5.7168 10.207Z"
      stroke="#6B7280"
      strokeWidth="1.5"
    />
    <path
      d="M8.9126 5.83203C8.9126 5.99779 8.84675 6.15676 8.72954 6.27397C8.61233 6.39118 8.45336 6.45703 8.2876 6.45703C8.12184 6.45703 7.96287 6.39118 7.84566 6.27397C7.72845 6.15676 7.6626 5.99779 7.6626 5.83203C7.6626 5.66627 7.72845 5.5073 7.84566 5.39009C7.96287 5.27288 8.12184 5.20703 8.2876 5.20703C8.45336 5.20703 8.61233 5.27288 8.72954 5.39009C8.84675 5.5073 8.9126 5.66627 8.9126 5.83203ZM13.0084 5.83203C13.0084 5.99779 12.9426 6.15676 12.8254 6.27397C12.7082 6.39118 12.5492 6.45703 12.3834 6.45703C12.2177 6.45703 12.0587 6.39118 11.9415 6.27397C11.8243 6.15676 11.7584 5.99779 11.7584 5.83203C11.7584 5.66627 11.8243 5.5073 11.9415 5.39009C12.0587 5.27288 12.2177 5.20703 12.3834 5.20703C12.5492 5.20703 12.7082 5.27288 12.8254 5.39009C12.9426 5.5073 13.0084 5.66627 13.0084 5.83203Z"
      stroke="#6B7280"
      strokeWidth="1.5"
    />
  </svg>
);

const feesIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="21"
    height="20"
    viewBox="0 0 21 20"
    fill="none"
  >
    <path
      d="M8 12.5H11.125C11.8125 12.5 12.375 11.9375 12.375 11.25C12.375 10.5625 11.8125 10 11.125 10H9.875C9.1875 10 8.625 9.4375 8.625 8.75C8.625 8.0625 9.1875 7.5 9.875 7.5H13M10.5 5.625V7.08375M10.5 11.875V14.375M18.625 10C18.625 12.1549 17.769 14.2215 16.2452 15.7452C14.7215 17.269 12.6549 18.125 10.5 18.125C8.34512 18.125 6.27849 17.269 4.75476 15.7452C3.23102 14.2215 2.375 12.1549 2.375 10C2.375 7.84512 3.23102 5.77849 4.75476 4.25476C6.27849 2.73102 8.34512 1.875 10.5 1.875C12.6549 1.875 14.7215 2.73102 16.2452 4.25476C17.769 5.77849 18.625 7.84512 18.625 10Z"
      stroke="#6B7280"
      strokeMiterlimit="10"
      strokeLinejoin="round"
    />
  </svg>
);
