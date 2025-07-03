import classes from "./NotificationPreview.module.css";
import { useRouter } from "next/navigation";
import { routes } from "@/services/routes";
import {
  groupNotificationsByDate,
  Notifications,
} from "@/scripts/notifications/get_notifications";
import DropdownLayout from "../../Dropdown/DropdownLayout/DropdownLayout";
import DropdownWrapper from "../../Dropdown/DropdownWrapper/DropdownWrapper";
import ButtonWrapper from "@/components/CustomInput/ButtonWrapper/ButtonWrapper";
// import CloseIcon from "@/assets/app/CloseIcon";
import BellIcon from "@/assets/app/BellIcon";
import Image from "next/image";
import ListEmptyState from "../../ListEmptyState/ListEmptyState";
import bellIcon from "@/assets/app/bellIcon-emptyState.svg";

export const mockNotifications: Notifications = [
  {
    id: 1,
    partnerId: 1001,
    title: "Deposit Successful",
    category: "deposit",
    message: "Your deposit of $150 has been processed successfully.",
    read: 0,
    details: {
      amount: 150,
      currency: "USD",
      depositId: 3001,
      reference: "DEP-20250625-AB12",
    },
    createdAt: "2025-06-25T14:30:00Z",
  },
  {
    id: 2,
    partnerId: 1002,
    title: "Verification Complete",
    category: "account",
    message: "Your identity verification is complete.",
    read: 1,
    createdAt: "2025-06-24T09:15:00Z",
  },
  {
    id: 3,
    partnerId: 1003,
    title: "Low Balance Warning",
    category: "alert",
    message: "Your balance has fallen below the minimum threshold.",
    read: 0,
    createdAt: "2025-06-23T18:45:00Z",
  },
  {
    id: 4,
    partnerId: 1004,
    title: "Deposit Received",
    category: "deposit",
    message: "We’ve received a deposit of €300 to your account.",
    read: 1,
    details: {
      amount: 300,
      currency: "EUR",
      depositId: 3002,
      reference: "DEP-20250622-XZ90",
    },
    createdAt: "2025-06-22T12:00:00Z",
  },
  {
    id: 5,
    partnerId: 1005,
    title: "New Login Detected",
    category: "security",
    message: "A login from a new device was detected.",
    read: 0,
    createdAt: "2025-06-26T06:50:00Z",
  },
];

const NotificationPreview = () => {
  const router = useRouter();

  return (
    <DropdownLayout>
      {({ open, close, toggle }) => (
        <>
          <div onClick={toggle} className={classes.iconContainer}>
            <BellIcon />
          </div>

          <DropdownWrapper
            open={open}
            containerStyle={{ bottom: "-12px", padding: "1px" }}
          >
            <div className={classes.dropdown}>
              <div className={classes.header}>
                <div className={classes.sectionTitle}>Notifications</div>
                {/* <ButtonWrapper className={classes.closeButton} onClick={close}>
                  <CloseIcon />
                </ButtonWrapper> */}
              </div>

              {true ? (
                <ListEmptyState
                  style={{ height: "280px" }}
                  title={"No Notifications - yet"}
                  classes={classes}
                  icon={<Image src={bellIcon} alt="" />}
                />
              ) : mockNotifications ? (
                <div className={classes.notificationContainer}>
                  {groupNotificationsByDate(mockNotifications).map(
                    ({ dateGroup, notifications }) => (
                      <div key={dateGroup} className={classes.dateGroup}>
                        <div className={classes.dateLabel}>{dateGroup}</div>
                        <div className={classes.notificationList}>
                          {notifications.map((item) => (
                            <div
                              key={item.id}
                              className={`${classes.notificationItem} ${
                                item.read ? classes.read : classes.unread
                              } ${classes[item.category || "default"]}`}
                            >
                              <div className={classes.notificationContent}>
                                <div className={classes.itemTitle}>
                                  {item.title}
                                </div>
                                <div className={classes.itemMessage}>
                                  {item.message}
                                </div>
                              </div>
                              <div className={classes.time}>
                                {item.createdAt}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  )}
                </div>
              ) : null}

              {mockNotifications?.length ? (
                <div className={classes.footer}>
                  <ButtonWrapper
                    onClick={() => {
                      router.push(routes.notifications);
                      close();
                    }}
                    className={classes.viewAllBtn}
                  >
                    See all notifications
                  </ButtonWrapper>
                </div>
              ) : null}
            </div>
          </DropdownWrapper>
        </>
      )}
    </DropdownLayout>
  );
};

export default NotificationPreview;
