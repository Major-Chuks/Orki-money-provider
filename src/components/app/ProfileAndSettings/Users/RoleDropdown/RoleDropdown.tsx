/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import classes from "./RoleDropdown.module.css";
import ChevronDown from "@/assets/app/ChevronDown";
import { get_listRoles } from "@/types/apis/teamManagement/get_listRoles";
import { Role } from "../Team";
import DropdownLayout from "@/components/app/Dropdown/DropdownLayout/DropdownLayout";
import DropdownWrapper from "@/components/app/Dropdown/DropdownWrapper/DropdownWrapper";

const RoleDropdown = ({
  onSelect,
  role,
  roles,
}: {
  onSelect: (role: Role) => void;
  role?: string;
  roles?: get_listRoles["data"] | null;
}) => {
  const [selected, setSelected] = useState<Role>({
    id: -1,
    name: "",
  });

  useEffect(() => {
    if (selected.id && selected.name) {
      onSelect(selected);
    }
  }, [selected]);

  return (
    <div className={classes.container}>
      <DropdownLayout>
        {({ open, close, toggle }) => (
          <>
            <div
              onClick={toggle}
              className={`${classes.selected} ${role && classes.styled} ${
                !(role || selected.name) && classes.faint
              }`}
            >
              <div>{role || selected.name || "-- Select Role --"}</div>
              <ChevronDown style={{ height: "16px", width: "16px" }} />
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
                {roles?.map((role, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setSelected(role);
                      close();
                    }}
                    className={classes.item}
                  >
                    <div>{role.name}</div>
                  </div>
                ))}
              </div>
            </DropdownWrapper>
          </>
        )}
      </DropdownLayout>
    </div>
  );
};

export default RoleDropdown;
