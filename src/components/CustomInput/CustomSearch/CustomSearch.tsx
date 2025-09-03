import SearchIcon from "@/assets/app/SearchIcon";
import classes from "./CustomSearch.module.css";

const CustomSearch = ({ placeholder }: { placeholder?: string }) => {
  return (
    <div className={classes.container}>
      <SearchIcon />
      <input type="text" placeholder={placeholder} />
    </div>
  );
};

export default CustomSearch;
