import classes from "./Control.module.css";
import arrowIcon from "../../assets/icon-arrow.svg";
import dots from "../../assets/icon-dots.svg";

import Image from "next/image";

interface ControlProps {
  handleNext: () => void;
  handlePrev: () => void;
  handleGoto: (page: number) => void;
  currentPage: number;
  paginate: Record<number, unknown>;
  _static?: boolean;
}

const Control: React.FC<{ controlProps: ControlProps }> = ({
  controlProps,
}) => {
  const { handleGoto, handleNext, handlePrev, currentPage, paginate, _static } =
    controlProps;

  return (
    <div className={`${classes.container} ${_static && classes.static}`}>
      <div className={classes.control}>
        <div onClick={handlePrev} className={classes.ctrl}>
          <Image src={arrowIcon} alt="" />
          <div className={classes.text}>Previous</div>
        </div>

        <div className={classes.counterWrapper}>
          <div className={classes.counter}>
            {Object.keys(paginate)
              .slice(
                Object.keys(paginate).length - currentPage >= 3
                  ? currentPage - 1
                  : Object.keys(paginate).length - 3
              )
              .filter((_, index) => index < 3)
              .map((id) => {
                const count = Number(id);
                return (
                  <div
                    onClick={() => handleGoto(count)}
                    className={`${classes.countWrapper} ${
                      currentPage === count && classes.active
                    }`}
                    key={count}
                  >
                    <div className={classes.count}>{count}</div>
                  </div>
                );
              })}
          </div>
          {Object.keys(paginate).length - currentPage >= 3 ? (
            <>
              <Image src={dots} alt="" />
              <div className={classes.countWrapper}>
                <div
                  onClick={() => handleGoto(Object.keys(paginate).length)}
                  className={`${classes.count}`}
                >
                  {Object.keys(paginate).length}
                </div>
              </div>
            </>
          ) : null}
        </div>

        <div onClick={handleNext} className={classes.ctrl}>
          <div className={classes.text}>Next</div>
          <Image src={arrowIcon} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Control;
