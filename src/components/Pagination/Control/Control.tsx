/* eslint-disable react-hooks/exhaustive-deps */
import classes from "./Control.module.css";
import rightArrow from "@/assets/icon-arrow-right.svg";
import leftArrow from "@/assets/icon-arrow-left.svg";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ControlProps {
  onPageChange: (currentPage: number) => void;
  currentPage: number;
  count: number;
  limit: number;
}

const Control: React.FC<{ controlProps: ControlProps }> = ({
  controlProps,
}) => {
  const [currPage, setCurrPage] = useState(1);
  const { onPageChange, currentPage, count, limit } = controlProps;

  const pageCount = Math.ceil(count / limit);
  const pageList = [...Array(pageCount)].map((_, idx) => idx + 1);

  const handlePrev = (): void => {
    if (currPage <= 1) {
      setCurrPage(1);
    } else {
      setCurrPage(currPage - 1);
    }
  };

  const handleNext = () => {
    if (currPage >= pageCount) {
      setCurrPage(currPage);
    } else {
      setCurrPage(currPage + 1);
    }
  };

  const handleGoto = (page: number) => {
    setCurrPage(page);
  };

  useEffect(() => {
    onPageChange(currPage);
  }, [currPage]);

  const spreadCount = pageCount + 1 - currentPage > 5;

  return (
    <div className={classes.container}>
      <div onClick={handlePrev} className={classes.leftCtrl}>
        <Image src={leftArrow} alt="" />
        <div>Previous</div>
      </div>

      <div className={classes.pageCountContainer}>
        {spreadCount ? (
          <div className={classes.pageCount}>
            {pageList.slice(currentPage - 1, currentPage + 2).map((count) => {
              const id = count;
              return (
                <div
                  key={id}
                  onClick={() => handleGoto(id)}
                  className={`${classes.page} ${
                    currentPage === id && classes.active
                  }`}
                >
                  {id}
                </div>
              );
            })}
          </div>
        ) : (
          pageCount > 5 && (
            <>
              <div
                onClick={() => handleGoto(1)}
                className={`${classes.page} ${
                  currentPage === 1 && classes.active
                }`}
              >
                {1}
              </div>
              {pageCount !== 6 && (
                <div style={{ cursor: "default" }} className={classes.page}>
                  ...
                </div>
              )}
            </>
          )
        )}
        {spreadCount && pageCount !== 6 && (
          <div style={{ cursor: "default" }} className={classes.page}>
            ...
          </div>
        )}
        <div className={classes.pageCount}>
          {pageList.slice(spreadCount ? -3 : -5).map((count) => {
            const id = count;
            return (
              <div
                key={id}
                onClick={() => handleGoto(id)}
                className={`${classes.page} ${
                  currentPage === id && classes.active
                }`}
              >
                {id}
              </div>
            );
          })}
        </div>
      </div>

      <div onClick={handleNext} className={classes.rightCtrl}>
        <div>Next</div>
        <Image src={rightArrow} alt="" />
      </div>
    </div>
  );
};

export default Control;
