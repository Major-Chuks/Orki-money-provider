import React from "react";

interface LoadingIconProps extends React.SVGProps<SVGSVGElement> {
  accent?: boolean;
}

export default function LoadingIcon({ accent, ...props }: LoadingIconProps) {
  if (accent) {
    return <Accent />;
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z"
        opacity="0.5"
      />
      <path
        fill="currentColor"
        d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z"
      >
        <animateTransform
          attributeName="transform"
          dur="1s"
          from="0 12 12"
          repeatCount="indefinite"
          to="360 12 12"
          type="rotate"
        />
      </path>
    </svg>
  );
}

const Accent = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="53"
      height="52"
      viewBox="0 0 53 52"
      fill="none"
    >
      <path
        opacity="0.1"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M26.5 9.75C22.1902 9.75 18.057 11.462 15.0095 14.5095C11.962 17.557 10.25 21.6902 10.25 26C10.25 30.3098 11.962 34.443 15.0095 37.4905C18.057 40.538 22.1902 42.25 26.5 42.25C30.8098 42.25 34.943 40.538 37.9905 37.4905C41.038 34.443 42.75 30.3098 42.75 26C42.75 21.6902 41.038 17.557 37.9905 14.5095C34.943 11.462 30.8098 9.75 26.5 9.75ZM3.75 26C3.75 13.4355 13.9355 3.25 26.5 3.25C39.0645 3.25 49.25 13.4355 49.25 26C49.25 38.5645 39.0645 48.75 26.5 48.75C13.9355 48.75 3.75 38.5645 3.75 26Z"
        fill="#2E71FF"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M26.4996 9.75002C22.3101 9.74106 18.2808 11.3592 15.2611 14.2632C14.6355 14.8416 13.8078 15.1512 12.9562 15.1254C12.1046 15.0996 11.2972 14.7404 10.7078 14.1252C10.1184 13.5099 9.79421 12.6879 9.80495 11.8359C9.81568 10.984 10.1605 10.1704 10.7652 9.57019C14.9946 5.5069 20.6346 3.24146 26.4996 3.25002C27.3615 3.25002 28.1882 3.59243 28.7977 4.20193C29.4072 4.81142 29.7496 5.63807 29.7496 6.50002C29.7496 7.36198 29.4072 8.18863 28.7977 8.79812C28.1882 9.40762 27.3615 9.75002 26.4996 9.75002Z"
        fill="#2E71FF"
      />
    </svg>
  );
};
