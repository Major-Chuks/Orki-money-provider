import classes from "./Pagination.module.css";

export interface Metadata {
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
  firstPage: number;
  firstPageUrl: string;
  lastPageUrl: string;
  nextPageUrl: string | null;
  previousPageUrl: string | null;
}

interface Pagination {
  handleNext: () => void;
  handlePrev: () => void;
  handleGoto: (pageNumber: number) => void;
  metadata: Metadata;
}

const Pagination = ({
  handleGoto,
  handleNext,
  handlePrev,
  metadata,
}: Pagination) => {
  if (metadata.total < metadata.perPage) return null;

  return (
    <div className={classes.preview}>
      <div className={classes.info}>
        Showing{" "}
        {metadata.perPage * metadata.currentPage >= metadata.total
          ? metadata.total
          : metadata.perPage * metadata.currentPage}{" "}
        items out of {metadata.total} results found
      </div>
      <div className={classes.control}>
        <div onClick={handlePrev}>Previous</div>
        {metadata.firstPage < metadata.currentPage && (
          <div onClick={() => handleGoto(metadata.firstPage)}>
            {metadata.firstPage}
          </div>
        )}
        <div className={classes.active}>{metadata.currentPage}</div>
        {metadata.lastPage > metadata.currentPage && (
          <div onClick={() => handleGoto(metadata.lastPage)}>
            {metadata.lastPage}
          </div>
        )}
        <div onClick={handleNext}>Next</div>
      </div>
    </div>
  );
};

export default Pagination;
