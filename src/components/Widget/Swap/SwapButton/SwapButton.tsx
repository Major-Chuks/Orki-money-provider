import CustomButton from "@/components/CustomInput/CustomButton/CustomButton";

type SwapButtonProps = React.ComponentProps<typeof CustomButton>;

const SwapButton = ({ style, children, ...rest }: SwapButtonProps) => {
  return (
    <CustomButton
      style={{
        background: "#6148C2",
        padding: "20px 8px",
        borderRadius: "16px",
        ...style, // merge additional styles passed in
      }}
      {...rest} // forward all other props
    >
      {children}
    </CustomButton>
  );
};

export default SwapButton;
