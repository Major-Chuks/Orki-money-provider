"use client";

import Image from "next/image";
import classes from "./Navbar.module.css";
import chevronIcon from "@/assets/chevron.svg";
import ProductDropdown from "./ProductDropdown/ProductDropdown";
import ResourcesDropdown from "./ResourcesDropdown/ResourcesDropdown";
import { useRouter } from "next/navigation";
import { routes } from "@/services/routes";
import logo from "@/assets/logo.svg";
import Responsive from "../Responsive/Responsive";
import { useEffect, useState } from "react";
import { outSideClickHandler } from "@/services/utils";
import hamburgerIcon from "@/assets/icon-hamburger.svg";
import CustomButton from "../CustomInput/CustomButton/CustomButton";
import Dropdown from "./Dropdown/Dropdown";
import useMediaQuery from "@/hooks/useMediaQuery";

// import { useState } from "react";

const Navbar = () => {
  const [isActive, setIsActive] = useState(0);
  const [dropdown, setDropdown] = useState(false);
  const { width } = useMediaQuery();

  const router = useRouter();

  useEffect(() => {
    outSideClickHandler({
      className: "id_nav",
      setState: () => setIsActive(0),
      document: window.document,
    });
  }, []);

  useEffect(() => {
    if (width >= 1024) {
      setDropdown(false);
    }
  }, [width]);

  const nav = (
    <div id="id_nav" className={classes.nav}>
      <div className={classes.withDropdown}>
        <div
          onClick={() => setIsActive((id) => (id === 1 ? 0 : 1))}
          className={`${classes.withIcon} ${isActive === 1 && classes.active}`}
        >
          <div>Products</div>
          <Image src={chevronIcon} alt="" />
        </div>
        {isActive === 1 && (
          <div className={classes.dropdownContainer}>
            <ProductDropdown onRoute={() => setIsActive(0)} />
          </div>
        )}
      </div>
      <div className={classes.withDropdown}>
        <div
          onClick={() => setIsActive((id) => (id === 2 ? 0 : 2))}
          className={`${classes.withIcon} ${isActive === 2 && classes.active}`}
        >
          <div>Resources</div>
          <Image src={chevronIcon} alt="" />
        </div>
        {isActive === 2 && (
          <div className={classes.dropdownContainer}>
            <ResourcesDropdown onRoute={() => setIsActive(0)} />
          </div>
        )}
      </div>
      <div
        className={classes.navItem}
        onClick={() => {
          router.push(routes.aboutUs);
          setIsActive(0);
        }}
      >
        About Us
      </div>
    </div>
  );

  const btn = (
    <div className={classes.btnContainer}>
      <CustomButton onClick={() => router.push(routes.widget)} outline>
        Try Widget
      </CustomButton>
      <CustomButton onClick={() => router.push(routes.contactUs)}>
        Contact Us
      </CustomButton>
    </div>
  );

  return (
    <div className={classes.wrapper}>
      <Responsive>
        <div className={classes.desktopView}>
          <div className={classes.logo_nav}>
            <div
              onClick={() => router.push(routes.home)}
              className={classes.logo}
            >
              <Image src={logo} alt="" />
            </div>
            {nav}
          </div>
          {btn}
        </div>
        <div className={classes.mobileView}>
          <div
            onClick={() => router.push(routes.home)}
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

      {dropdown && (
        <div className={classes.navDropdownWrapper}>
          <Dropdown onClose={() => setDropdown(false)} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
