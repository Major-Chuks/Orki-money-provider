import classes from "./Team.module.css";
import { useState } from "react";
import TableData from "./TableData/TableData";
import DeleteModal from "./DeleteModal/DeleteModal";
import AddMemberModal from "./AddMemberModal/AddMemberModal";
import backend from "@/services/apis";
import { useToast } from "@/context/Toast/ToastContext";
import Button from "@/components/CustomInput/Button/Button";
import {
  useListManagementTeamQuery,
  useListRolesQuery,
} from "@/services/queryApis";
import { get_listManagementTeam } from "@/types/apis/teamManagement/get_listManagementTeam";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import ErrorScreen from "@/components/ErrorScreen/ErrorScreen";
import EmptyState from "./EmptyState/EmptyState";
import { get_listRoles } from "@/types/apis/teamManagement/get_listRoles";
import SettingsHeader from "@/components/app/ProfileAndSettings/SettingsHeader/SettingsHeader";

export type Role = get_listRoles["data"][number];

const Team = () => {
  const [toggleAddMemberModal, setAddMemberModal] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<
    get_listManagementTeam["data"][number] | null
  >(null);

  const { data, isPending, isError, refetch } = useListManagementTeamQuery();
  const teamMembers: get_listManagementTeam["data"] = data?.data.data.data;

  const { data: roleData } = useListRolesQuery();
  const roles: get_listRoles["data"] = roleData?.data.data.data;

  const { showToast } = useToast();

  const handleRoleChange = async (role: Role, id: string) => {
    const response = await backend().patch_changeRole({
      role_id: role.id,
      id,
    });
    if (response) {
      refetch();
      showToast("Role updated successfully", "success");
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <SettingsHeader
          title="Team Members"
          description="View and manage your team members."
        />

        <div className={classes.control}>
          <Button onClick={() => setAddMemberModal(true)}>
            Invite Team Member
          </Button>
        </div>
      </div>

      {isPending ? (
        <LoadingScreen style={{ height: "40vh" }} />
      ) : isError ? (
        <ErrorScreen style={{ height: "40vh" }} />
      ) : teamMembers && teamMembers.length ? (
        <div className={classes.tableWrapper}>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>User Email</th>
                <th>Access Level</th>
                <th>Date Added</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {teamMembers.map((d, idx) => (
                <TableData
                  key={idx}
                  data={d}
                  onDelete={(member) => setMemberToDelete(member)}
                  onRoleChange={handleRoleChange}
                  roles={roles}
                  refetch={refetch}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyState isSearch={false} />
      )}

      {memberToDelete && (
        <DeleteModal
          onClose={(reload) => {
            if (reload) {
              refetch();
            }
            setMemberToDelete(null);
          }}
          member={memberToDelete}
        />
      )}

      {toggleAddMemberModal && (
        <AddMemberModal
          onClose={() => {
            refetch();
            setAddMemberModal(false);
          }}
          roles={roles}
        />
      )}
    </div>
  );
};

export default Team;
