import Image from "next/image";
import classes from "./Search.module.css";
import searchIcon from "@/assets/widget/search.svg";

const Search = ({
  onChange,
  value,
  placeholder = "Search",
}: {
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value?: string;
  placeholder?: string;
}) => {
  return (
    <div className={classes.container}>
      <Image src={searchIcon} alt="" />
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type="text"
      />
    </div>
  );
};

export default Search;
