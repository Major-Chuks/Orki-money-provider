import InfoIcon from "@/assets/app/InfoIcon";
import TourPointer from "../../TourGuide/TourPointer";
import Banner from "../Banner/Banner";
import classes from "./Onboarding.module.css";
import Checklist from "../Checklist/Checklist";
import Button from "@/components/CustomInput/Button/Button";
import LinkIcon from "@/assets/app/LinkIcon";
import TourGuide from "../../TourGuide/TourGuide";
import { useEffect, useRef, useState } from "react";
import { get_fetchUserProfile } from "@/types/apis/userProfile/get_fetchUserProfile";
import { useRouter } from "next/navigation";
import { routes } from "@/services/routes";
import backend from "@/services/apis";
import { patch_updateChecklist } from "@/types/apis/onboarding/patch_updateChecklist";
import { setCurrentUser } from "@/redux/slices/user";
import { useDispatch } from "react-redux";
import snsWebSdk from "@sumsub/websdk";
import CloseIcon from "@/assets/app/CloseIcon";
import ButtonWrapper from "@/components/CustomInput/ButtonWrapper/ButtonWrapper";

// export type ChecklistStatus = "pending" | "completed" | "failed";
export interface IChecklist {
  id: string;
  status: boolean;
  action: React.ReactNode;
  name: string;
  description: string;
  reason?: string;
}

const getChecklistProgress = (
  checklist: get_fetchUserProfile["onboarding"]["checklist"]
): {
  completedCount: number;
  totalCount: number;
} => {
  // Normalize values from the checklist
  const checklistItems = [
    checklist.read_checklist.status,
    checklist.read_docs.status,
    checklist.start_trial.status,
    checklist.complete_business_details.status,
    checklist.complete_kyb.status,
  ];

  const totalCount = checklistItems.length;
  const completedCount = checklistItems.filter(Boolean).length;

  return { completedCount, totalCount };
};

const Onboarding = ({
  onboarding: { checklist, trial_period_left },
}: {
  onboarding: get_fetchUserProfile["onboarding"];
}) => {
  const [openTour, setOpenTour] = useState(false);
  const [loading, setLoading] = useState({
    read_checklist: false,
    read_docs: false,
    initiate_kyb: false,
  });
  const [togglekybModal, setKybModal] = useState(false);
  const instanceRef = useRef<{ terminate: () => void }>();

  const router = useRouter();

  const dispatch = useDispatch();

  const handleUpdateChecklist = async (key: patch_updateChecklist["key"]) => {
    setLoading((prev) => ({ ...prev, [key]: true }));
    const response = await backend().patch_updateChecklist({ key });
    if (response) {
      const userResponse = await backend().get_fetchUserProfile();
      if (userResponse) {
        dispatch(setCurrentUser(userResponse.data.data));
      }
    }
    setLoading((prev) => ({ ...prev, [key]: false }));
  };

  const handleInitiateKyb = async () => {
    setLoading((prev) => ({ ...prev, initiate_kyb: true }));
    setKybModal(true);
    const response = await backend().get_initiateKyb();
    if (response) {
      const { token } = response.data.data;
      instanceRef.current = launchWebSdk(token);
    } else {
      setKybModal(false);
    }
    setLoading((prev) => ({ ...prev, initiate_kyb: false }));
  };

  const handleCloseKybModal = async () => {
    instanceRef.current?.terminate();
    setKybModal(false);
    setLoading((prev) => ({ ...prev, initiate_kyb: true }));
    const authResponse = await backend().get_fetchUserProfile();
    if (authResponse) {
      const authData: get_fetchUserProfile = authResponse.data.data;
      dispatch(setCurrentUser(authData));
    }
    setLoading((prev) => ({ ...prev, initiate_kyb: false }));
  };

  const checklistProgress = getChecklistProgress(checklist);

  const checklists = [
    {
      id: "read_checklist",
      name: "Read our checklist",
      description: "Understand key steps to start accepting payments.",
      action: (
        <Button
          onClick={() => handleUpdateChecklist("read_checklist")}
          loading={loading.read_checklist}
          loadingText="Please wait"
          type="text"
        >
          View Checklist <LinkIcon style={{ color: "#2F2FDD" }} />
        </Button>
      ),
      status: checklist.read_checklist.status,
    },
    {
      id: "read_docs",
      name: "Read API Documentation",
      description: "Explore integration guides, APIs, and sample code.",
      action: (
        <Button
          onClick={() => handleUpdateChecklist("read_docs")}
          loading={loading.read_docs}
          loadingText="Please wait"
          type="text"
        >
          View Documentation <LinkIcon style={{ color: "#2F2FDD" }} />
        </Button>
      ),
      status: checklist.read_docs.status,
    },
    {
      id: "start_trial",
      name: "Start Free Trial",
      description:
        "Subscribe to the Free Trial plan and unlock platform access.",
      action: <Button variant="outlined">Start Free Trial</Button>,
      status: checklist.start_trial.status,
    },
    {
      id: "complete_business_details",
      name: "Complete Business Details",
      description: "Complete other business information to get verified",
      action: (
        <Button
          onClick={() =>
            router.push(`${routes.profileAndSettings}?type=business`)
          }
          variant="outlined"
        >
          Complete Profile
        </Button>
      ),
      status: checklist.complete_business_details.status,
    },
    {
      id: "complete_kyb",
      name: "Submit KYB Documents",
      description: "",
      action: (
        <Button
          loading={loading.initiate_kyb}
          onClick={handleInitiateKyb}
          variant="outlined"
        >
          Submit Documents
        </Button>
      ),
      status: checklist.complete_kyb.status,
      reason: checklist.complete_kyb.message,
    },
  ];

  const handleCloseTour = () => {
    sessionStorage.setItem("tour_closed", "true");
    setOpenTour(false);
  };

  useEffect(() => {
    const hasClosedTour = sessionStorage.getItem("tour_closed") === "true";
    if (!hasClosedTour) {
      setOpenTour(true);
    }
  }, []);

  return (
    <>
      {togglekybModal && (
        <div className={classes.kybModalContainer}>
          <div className={classes.closeBtn}>
            <ButtonWrapper onClick={handleCloseKybModal}>
              <CloseIcon />
            </ButtonWrapper>
          </div>
          <div className={classes.kybModal} id="sumsub-websdk-container"></div>
        </div>
      )}
      <div className={classes.container}>
        <TourPointer id="tour_2" style={{ top: "188px" }} />
        <Banner trial_period_left={trial_period_left} />
        <div className={classes.checklist}>
          <header className={classes.header}>
            <div>
              <div className={classes.title}>Get Started Checklist</div>
              <div className={classes.subTitle}>
                Complete these steps to go live with integrations.
              </div>
            </div>

            <div className={classes.counter}>
              <InfoIcon style={{ color: "#7C2D12" }} />{" "}
              {checklistProgress.completedCount} of{" "}
              {checklistProgress.totalCount} tasks completed
            </div>
          </header>

          <hr />

          <div className={classes.listItems}>
            {checklists.map(
              ({ id, name, description, action, status, reason }) => (
                <Checklist
                  key={id}
                  id={id}
                  status={status}
                  name={name}
                  description={description}
                  action={action}
                  reason={reason}
                />
              )
            )}
          </div>
        </div>
      </div>
      {openTour && <TourGuide onClose={handleCloseTour} />}
    </>
  );
};

export default Onboarding;

type CustomI18nMessages = Record<string, string>;

const launchWebSdk = (
  accessToken: string,
  applicantEmail?: string,
  applicantPhone?: string,
  customI18nMessages?: CustomI18nMessages
) => {
  const getNewAccessToken = async (): Promise<string> => {
    const response = await backend().get_initiateKyb();
    return response?.data.data.token;
  };

  const snsWebSdkInstance = snsWebSdk
    .init(accessToken, getNewAccessToken)
    .withConf({
      lang: "en",
      email: applicantEmail,
      phone: applicantPhone,
      i18n: customI18nMessages,
      uiConf: {
        // customCss: "https://url.com/styles.css",
      },
    })
    .withOptions({ addViewportTag: false, adaptIframeHeight: true })
    .on("idCheck.stepCompleted", (payload) => {
      console.log("stepCompleted", payload);
    })
    .on("idCheck.onError", (error) => {
      console.log("onError", error);
    })
    .on("idCheck.actionCompleted", (event) => {
      console.log("idCheck.actionCompleted", event);
    })
    .build();
  snsWebSdkInstance.launch("#sumsub-websdk-container");

  return {
    terminate: () => {
      snsWebSdkInstance.destroy();
    },
  };
};
