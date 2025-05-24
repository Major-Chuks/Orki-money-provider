import classes from "./TextViewer.module.css";

const TextViewer = ({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note?: string;
}) => {
  return (
    <div className={classes.container}>
      <div className={classes.label}>{label}</div>

      <input type="text" value={value} readOnly />

      {note ? <div className={classes.note}>{note}</div> : null}
    </div>
  );
};

export default TextViewer;
