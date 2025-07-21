import InfoIcon from "@/assets/app/InfoIcon";
import classes from "./AccountSetupBanner.module.css";
import ButtonWrapper from "@/components/CustomInput/ButtonWrapper/ButtonWrapper";
import ChevronRight from "@/assets/app/ChevronRight";
import { usePathname, useRouter } from "next/navigation";
import { routes } from "@/services/routes";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const AccountSetupBanner = () => {
  const router = useRouter();
  const pathname = usePathname();

  if (
    pathname === routes.dashboard ||
    pathname.includes(routes.profileAndSettings) ||
    pathname.includes(routes.billing)
  )
    return null;

  if (pathname === routes.transactions) {
    return (
      <Banner
        title="Account Setup Required"
        description="Please complete the checklist on your dashboard to enable
            transactions."
        router={router}
      />
    );
  } else if (pathname.includes(routes.apiManagement)) {
    return (
      <Banner
        title="Pending KYB Verification"
        description="Your KYB verification is still pending. Live mode will be enabled once
          your verification is approved."
        router={router}
      />
    );
  }
};

export default AccountSetupBanner;

const Banner = ({
  router,
  title,
  description,
}: {
  router: AppRouterInstance;
  title: string;
  description: string;
}) => (
  <div className={classes.wrapper}>
    <div className={classes.container}>
      <div className={classes.details}>
        <div className={classes.infoIcon}>
          <InfoIcon
            style={{ color: "#9A5C0A", width: "24px", height: "24px" }}
          />
        </div>

        <div className={classes.title_description}>
          <div className={classes.title}>{title}</div>
          <div className={classes.description}>{description}</div>
        </div>
      </div>

      <ButtonWrapper
        onClick={() => router.push(routes.dashboard)}
        className={classes.checklistBtn}
      >
        Go to Checklist <ChevronRight style={{ color: "#9A5C0A" }} />
      </ButtonWrapper>
    </div>
  </div>
);
