import classes from "./SettingsHeader.module.css"

const SettingsHeader = ({ title, description }: { title: string; description: string; }) => {
  return (
    <div className={classes.container}>
      <div className={classes.title}>{title}</div>
      <div className={classes.description}>{description}</div>
    </div>
  )
}

export default SettingsHeader;