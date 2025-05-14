const LoadingIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
    >
      <path
        fill="none"
        stroke="currentColor"
        stroke-dasharray="16"
        stroke-dashoffset="16"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 3c4.97 0 9 4.03 9 9"
      >
        <animate
          fill="freeze"
          attributeName="stroke-dashoffset"
          dur="0.04s"
          values="16;0"
        />
        <animateTransform
          attributeName="transform"
          dur="0.3s"
          repeatCount="indefinite"
          type="rotate"
          values="0 12 12;360 12 12"
        />
      </path>
    </svg>
  );
};

export default LoadingIcon;
