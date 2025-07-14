type CaretIconType = React.SVGProps<SVGSVGElement>;

const CaretIcon = (props: CaretIconType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      {...props}
    >
      <path
        d="M4.66675 7.16663L8.00008 10.5L11.3334 7.16663H4.66675Z"
        fill={props.fill || "#0C0C0C"}
      />
    </svg>
  );
};

export default CaretIcon;
