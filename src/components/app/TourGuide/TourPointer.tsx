const TourPointer = ({
  id,
  style,
}: {
  id: string;
  style?: React.CSSProperties;
}) => {
  return <div style={{ ...style, position: "absolute" }} id={id} />;
};

export default TourPointer;
