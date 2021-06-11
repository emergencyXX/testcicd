import s from "./Pagionation.module.css";
import { useContext, useState } from "react";
import { GlobalContext } from "../../../context/globalContext";

interface iPaginationProps {
  portionSize: number;
  onPageChanged: (currentPage: number) => void;
}

const Pagintaion = (props: iPaginationProps) => {
  const { store, constants } = useContext(GlobalContext);

  let pagesCount = Math.ceil(store.state.totalUserCount / store.state.pageSize);
  let pages = [];
  for (let i = 1; i <= pagesCount; i++) pages.push(i);

  let portionCount = Math.ceil(pagesCount / props.portionSize);
  let [portionNumber, setPortionNumber] = useState(1);
  let leftPortionPageNumber = (portionNumber - 1) * props.portionSize + 1;
  let rightPortionNumber = portionNumber * props.portionSize;
  return (
    <div className={s.pagination}>
      {portionNumber > 1 && (
        <button
          className={s.button_prev}
          onClick={() => {
            setPortionNumber(portionNumber - 1);
          }}
        ></button>
      )}

      {pages
        .filter((p) => p >= leftPortionPageNumber && p <= rightPortionNumber)
        .map((p, index) => (
          <span
            key={index}
            onClick={(e) => {
              props.onPageChanged(p);
            }}
            className={
              store.state.currentPage === p ? s.selected_page : s.page_item
            }
          >
            {p}
          </span>
        ))}

      {portionCount > portionNumber && (
        <button
          className={s.button}
          onClick={() => {
            setPortionNumber(portionNumber + 1);
          }}
        />
      )}
    </div>
  );
};

export default Pagintaion;
