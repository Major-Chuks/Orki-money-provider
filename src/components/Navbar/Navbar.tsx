"use client";

import Image from "next/image";
import Button from "../Button/Button";
import classes from "./Navbar.module.css";
import chevronIcon from "@/assets/chevron.svg";
import ProductDropdown from "./ProductDropdown/ProductDropdown";
import ResourcesDropdown from "./ResourcesDropdown/ResourcesDropdown";
import { useRouter } from "next/navigation";
import { routes } from "@/services/routes";
import logo from "@/assets/logo-2.svg";
import Responsive from "../Responsive/Responsive";
import { useEffect, useState } from "react";
import { outSideClickHandler } from "@/services/utils";
// import { useState } from "react";

const Navbar = () => {
  const [isActive, setIsActive] = useState(0);

  const router = useRouter();

  useEffect(() => {
    outSideClickHandler({
      className: "id_nav",
      setState: () => setIsActive(0),
      document: window.document,
    });
  }, []);

  return (
    <div className={classes.wrapper}>
      <Responsive>
        <div className={classes.container}>
          <div className={classes.logo_nav}>
            <div
              onClick={() => router.push(routes.home)}
              className={classes.logo}
            >
              <Image src={logo} alt="" />
            </div>
            <div id="id_nav" className={classes.nav}>
              <div className={classes.withDropdown}>
                <div
                  onClick={() => setIsActive((id) => (id === 1 ? 0 : 1))}
                  className={`${classes.withIcon} ${
                    isActive === 1 && classes.active
                  }`}
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
                  className={`${classes.withIcon} ${
                    isActive === 2 && classes.active
                  }`}
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
                onClick={() => router.push(routes.aboutUs)}
              >
                About Us
              </div>
            </div>
          </div>

          <div className={classes.btnContainer}>
            <Button onClick={() => router.push(routes.widget)} outline>
              Try Widget
            </Button>
            <Button onClick={() => router.push(routes.contactUs)}>
              Contact Us
            </Button>
          </div>
        </div>
      </Responsive>
    </div>
  );
};

export default Navbar;
