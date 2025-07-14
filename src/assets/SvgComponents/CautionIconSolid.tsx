import React from "react";

export default function CautionIconSolid() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
    >
      <mask
        id="mask0_1352_3813"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="3"
        width="40"
        height="34"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20.0003 4.16675L1.66699 35.8334H38.3337L20.0003 4.16675Z"
          fill="white"
          stroke="white"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M20 29.1668V30.0002M20 15.8335L20.0067 24.1668"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </mask>
      <g mask="url(#mask0_1352_3813)">
        <path d="M0 0H40V40H0V0Z" fill="#EDA12F" />
      </g>
    </svg>
  );
}
