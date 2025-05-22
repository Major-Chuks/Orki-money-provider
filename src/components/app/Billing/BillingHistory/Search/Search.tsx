import SearchIcon from "@/assets/app/SearchIcon";
import classes from "./Search.module.css";

const Search = ({ placeholder }: { placeholder?: string }) => {
  return (
    <div className={classes.container}>
      <SearchIcon />
      <input type="text" placeholder={placeholder} />
    </div>
  );
};

export default Search;
