import { formatTxDate } from "@/services/utils";
import RoleDropdown from "../RoleDropdown/RoleDropdown";
import TableStatus from "@/components/app/TableStatus/TableStatus";
import { get_listManagementTeam } from "@/types/apis/teamManagement/get_listManagementTeam";
import { get_listRoles } from "@/types/apis/teamManagement/get_listRoles";
import { Role } from "../Team";
import DropdownLayout from "@/components/app/Dropdown/DropdownLayout/DropdownLayout";
import DropdownWrapper from "@/components/app/Dropdown/DropdownWrapper/DropdownWrapper";
import classes from "./TableData.module.css";
import DotsIcon from "@/assets/app/DotsIcon";
import { useState } from "react";
import backend from "@/services/apis";
import ButtonWrapper from "@/components/CustomInput/ButtonWrapper/ButtonWrapper";

const TableData = ({
  data,
  onDelete,
  onRoleChange,
  refetch,
  roles,
}: {
  data: get_listManagementTeam["data"][number];
  onDelete: (team: get_listManagementTeam["data"][number]) => void;
  onRoleChange: (role: Role, id: string) => void;
  refetch: () => void;
  roles: get_listRoles["data"] | null;
}) => {
  const [loading, setLoading] = useState(false);

  const toggleStatus = async (close: () => void) => {
    setLoading(true);
    const response = data.is_active
      ? await backend().patch_deactivateTeamMember({ id: data.id })
      : await backend().patch_activateTeamMember({ id: data.id });

    if (response) {
      close();
      refetch();
    }
    setLoading(false);
  };

  const getName = () => {
    if (data.firstname && data.lastname) {
      return `${data.firstname} ${data.lastname}`;
    } else if (data.firstname) {
      return data.firstname;
    } else if (data.lastname) {
      return data.lastname;
    } else {
      return "Not set";
    }
  };
  return (
    <tr>
      <td>{getName()}</td>

      <td>{data.email}</td>
      <td>
        <RoleDropdown
          onSelect={(role) => onRoleChange(role, data.id)}
          role={data.role}
          roles={roles}
        />
      </td>
      <td>{formatTxDate(data.created_at)}</td>
      <td>
        <TableStatus status={data.status}>{data.status}</TableStatus>
      </td>
      <td>
        <DropdownLayout>
          {({ open, close, toggle }) => (
            <>
              <div onClick={toggle}>
                <DotsIcon style={{ cursor: "pointer" }} />
              </div>
              <DropdownWrapper
                open={open}
                containerStyle={{
                  width: "max-content",
                  borderRadius: "12px",
                  overflow: "visible",
                }}
                variant="fade"
              >
                <div className={classes.dropdown}>
                  {true && (
                    <div
                      onClick={() => toggleStatus(close)}
                      className={classes.item}
                    >
                      <ButtonWrapper
                        style={{ color: "#353945" }}
                        loading={loading}
                      >
                        {data.is_active ? "Deactivate" : "Activate"}
                      </ButtonWrapper>
                    </div>
                  )}

                  <div
                    onClick={() => {
                      onDelete(data);
                      close();
                    }}
                    className={classes.item}
                  >
                    <ButtonWrapper style={{ color: "#353945" }}>
                      Delete
                    </ButtonWrapper>
                  </div>
                </div>
              </DropdownWrapper>
            </>
          )}
        </DropdownLayout>
      </td>
    </tr>
  );
};

export default TableData;
