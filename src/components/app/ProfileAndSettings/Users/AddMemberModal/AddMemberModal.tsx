import classes from "./AddMemberModal.module.css";
import RoleDropdown from "../RoleDropdown/RoleDropdown";
import { useState } from "react";
import backend from "@/services/apis";
import { useToast } from "@/context/Toast/ToastContext";
import Button from "@/components/CustomInput/Button/Button";
import Copy from "@/components/app/Copy/Copy";
import { Role } from "../Team";
import ModalLayout from "@/components/Modal/ModalLayout";
import ModalContent from "@/components/Modal/ModalContent";
import { get_listRoles } from "@/types/apis/teamManagement/get_listRoles";
import LockIcon from "@/assets/app/LockIcon";
import CopyIcon from "@/assets/app/CopyIcon";
// import Member from "./Member/Member";
// import { useListManagementTeamQuery } from "@/services/queryApis";
// import { get_listManagementTeam } from "@/types/apis/teamManagement/get_listManagementTeam";
// import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";

const AddMemberModal = ({
  onClose,
  roles,
}: {
  onClose: () => void;
  roles: get_listRoles["data"];
}) => {
  const [selected, setSelected] = useState<Role>({ id: -1, name: "" });
  const [email, setEmail] = useState("");
  const [invitationLink, setInvitationLink] = useState("");
  const [inviteLoading, setInviteLoading] = useState(false);

  // const { data, isPending } = useListManagementTeamQuery();
  // const teamMembers: get_listManagementTeam["data"] = data?.data.data.data;

  const { showToast } = useToast();

  const handleSendInvite = async () => {
    setInviteLoading(true);
    const response = await backend().post_inviteTeamMember({
      role_id: Number(selected.id),
      email,
    });

    if (response) {
      setInvitationLink(response.data.data["invite-link"]);
      showToast(`Invitation token sent to ${email}`, "success");
    }
    setInviteLoading(false);
  };

  return (
    <ModalLayout>
      <ModalContent title="Add Member" onClose={onClose}>
        <div className={classes.container}>
          <div className={classes.emailInputContainer}>
            <div className={classes.inputWrapper}>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="Email address"
                type="email"
              />
              <div className={classes.dropdownContainer}>
                <RoleDropdown onSelect={setSelected} roles={roles} />
              </div>
            </div>
            <Button
              style={{
                width: "129px",
                height: "40px",
              }}
              onClick={handleSendInvite}
              disabled={!(email && selected.id)}
              loading={inviteLoading}
            >
              Send Invite
            </Button>
          </div>

          {/* {isPending ? (
            <LoadingScreen />
          ) : teamMembers && teamMembers.length ? (
            <div className={classes.membersContainer}>
              <div className={classes.title}>Members</div>
              <div className={classes.list}>
                {teamMembers.map((data, idx) => (
                  <Member data={data} key={idx} />
                ))}
              </div>
            </div>
          ) : null} */}

          {invitationLink ? (
            <>
              <hr />
              <div className={classes.urlContainer}>
                <div className={classes.url}>
                  <LockIcon />
                  <span className={classes.domain}>https://</span>
                  <span>{invitationLink.split("https://")[1]}</span>
                </div>
                <Copy style={{ paddingRight: "0" }} value={invitationLink}>
                  <Button style={{ borderRadius: "4px", padding: "8px 16px" }}>
                    <CopyIcon
                      style={{ width: "12px", height: "12px", color: "#fff" }}
                    />{" "}
                    Copy
                  </Button>
                </Copy>
              </div>
            </>
          ) : (
            <div style={{ minHeight: "20vh" }}></div>
          )}
        </div>
      </ModalContent>
    </ModalLayout>
  );
};

export default AddMemberModal;
