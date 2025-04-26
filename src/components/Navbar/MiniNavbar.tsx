"use client";

import Image from "next/image";
import classes from "./Navbar.module.css";
import { useRouter } from "next/navigation";
import { routes } from "@/services/routes";
import logo from "@/assets/logo.svg";
import Responsive from "../Responsive/Responsive";
import { useState } from "react";
import hamburgerIcon from "@/assets/icon-hamburger.svg";

const MiniNavbar = () => {
  const [dropdown, setDropdown] = useState(false);
  const router = useRouter();

  return (
    <div className={classes.wrapper}>
      <Responsive>
        <div className={classes.miniView}>
          <div
            onClick={() => router.push(routes.miniWidget)}
            className={classes.logo}
          >
            <Image className={classes.logo} src={logo} alt="" />
          </div>
          <Image
            onClick={() => setDropdown(!dropdown)}
            src={hamburgerIcon}
            alt=""
            className={classes.openIcon}
          />
        </div>
      </Responsive>
    </div>
  );
};

export default MiniNavbar;
