import React from "react";
import styles from "./layout.module.scss";
import { ReportType } from "@/_types/report";
import { formatDate } from "@/_utils/formatDate";
import Button from "@/_components/Button/Button";
import Pagination from "@/_components/Pagination/Pagination";

interface ListProps<T> {
  list: T[];
  colWidthList: number[];
  tableHeadList: string[];
  handleDelete: (id: number | undefined) => void;
  handleEditClick: (id?: string) => void;
  isLoggedIn: boolean;
  handleArrowClick: (direction: "prev" | "next") => void;
  handlePageClick: (page: number) => void;
  pages: number[];
  currentPage: number;
}

export default function BoardListLayout({
  list,
  colWidthList,
  tableHeadList,
  handleDelete,
  handleEditClick,
  isLoggedIn,
  handleArrowClick,
  handlePageClick,
  pages,
  currentPage,
}: ListProps<ReportType>) {
  const handlePrevArrowClick = () => {
    handleArrowClick("prev");
  };
  const handleNextArrowClick = () => {
    handleArrowClick("next");
  };
  const handlePageButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const value = (e.target as HTMLButtonElement).value;
    handlePageClick(Number(value));
  };
  return (
    <div className={styles.container}>
      <div className={styles["table-container"]}>
        {isLoggedIn ? (
          <Button
            ariaLabel="글쓰기"
            onClick={() => handleEditClick()}
            color="primary"
            className={styles["write-button"]}
          >
            글쓰기
          </Button>
        ) : null}

        <table className={styles.table}>
          <colgroup>
            {colWidthList.map((colWidth, index) => (
              <col key={`${index}-${colWidth}`} width={colWidth} />
            ))}
          </colgroup>
          <thead>
            <tr>
              {tableHeadList.map((col) => (
                <th scope="col" key={col}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {list ? (
              list.map((item) => (
                <tr key={item.id}>
                  <td>
                    {!isLoggedIn ? (
                      item.id
                    ) : (
                      <Button
                        ariaLabel="삭제하기"
                        color="red"
                        className={styles["delete-button"]}
                        onClick={() => handleDelete(item.id)}
                      >
                        삭제
                      </Button>
                    )}
                  </td>
                  <td>{item.year}</td>
                  <td>{item.title}</td>
                  <td>{formatDate(item.start_date)}</td>
                  <td>{formatDate(item.end_date)}</td>
                  <td>
                    {!isLoggedIn ? (
                      item.note ?? "-"
                    ) : (
                      <Button
                        ariaLabel="수정하기"
                        color="primary-border"
                        className={styles["edit-button"]}
                        onClick={() => handleEditClick(item.id.toString())}
                      >
                        수정
                      </Button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <>데이터가 존재하지 않습니다.</>
            )}
          </tbody>
        </table>
        <Pagination
          currentPage={currentPage}
          pages={pages}
          handlePageButtonClick={handlePageButtonClick}
          handlePrevArrowClick={handlePrevArrowClick}
          handleNextArrowClick={handleNextArrowClick}
        />
      </div>
    </div>
  );
}
