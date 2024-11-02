/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Control from "./Control";

interface Props<T> {
  items: T[];
  pageCount?: number;
  renderItem: (items: T[]) => any;
  scrollId?: string;
  control?: boolean;
}

interface State<T> {
  currentPage: number;
  paginate: Record<number, T[]>;
}

function Paginate<T>({
  items,
  pageCount = 6,
  renderItem,
  scrollId,
  control
}: Props<T>): JSX.Element {
  const [state, setState] = useState<State<T>>({
    currentPage: 1,
    paginate: {},
  });

  const { paginate, currentPage } = state;

  const scrollToTop = () => {
    if (scrollId) {
      let container = document.getElementById(scrollId);
      if (container) {
        container.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const handleSetState = (payload: Partial<State<T>>): void => {
    setState((states) => ({ ...states, ...payload }));
  };

  const handlePrev = (): void => {
    if (currentPage <= 1) {
      // handleSetState({ currentPage: Object.keys(paginate).length }); // if you want to loop
      handleSetState({ currentPage: 1 });
    } else {
      handleSetState({ currentPage: currentPage - 1 });
    }
    scrollToTop();
  };

  const handleNext = (): void => {
    if (currentPage >= Object.keys(paginate).length) {
      // handleSetState({ currentPage: 1 }); // if you want to loop
      handleSetState({ currentPage });
    } else {
      handleSetState({ currentPage: currentPage + 1 });
    }
    scrollToTop();
  };

  const handleGoto = (page: number): void => {
    handleSetState({ currentPage: Number(page) });
    scrollToTop();
  };

  useEffect(() => {
    handleSetState({ currentPage: 1 });

    const numberOfPages = Math.ceil(items.length / pageCount);
    let startIndex = 0;
    let endIndex = startIndex + pageCount;
    const paginate: Record<number, T[]> = {};
    for (let i = 1; i <= numberOfPages; i += 1) {
      paginate[i] = items.slice(startIndex, endIndex);
      startIndex = endIndex;
      endIndex = startIndex + pageCount;
    }
    handleSetState({ paginate });
  }, [items, pageCount]);

  return (
    <>
      {Object.keys(paginate).length ? renderItem(paginate[currentPage]) : null}
      {Object.keys(paginate).length > 1 && control ? (
        <Control
          controlProps={{
            handleGoto,
            handleNext,
            handlePrev,
            currentPage,
            paginate,
          }}
        />
      ) : null}
    </>
  );
}

export default Paginate;
