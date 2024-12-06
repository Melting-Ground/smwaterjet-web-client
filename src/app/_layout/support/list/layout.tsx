import React from "react";
import Button from "@/_components/Button/Button";
import styles from "./layout.module.scss";
import Link from "next/link";
import { formatDate } from "@/_utils/formatDate";
import { NoticeType } from "@/_types/notice";
import { InquiryType } from "@/_types/inquiry";
import { BoardType } from "@/_types/board";
import Pagination from "@/_components/Pagination/Pagination";

interface ListProps<T> {
  list: T[];
  colWidthList: number[];
  boardType: BoardType;
  tableHeadList: string[];
  handleEditClick: () => void;
  isLoggedIn: boolean;
  handleArrowClick: (direction: "prev" | "next") => void;
  handlePageClick: (page: number) => void;
  pages: number[];
  currentPage: number;
}

export default function BoardListLayout<T extends NoticeType | InquiryType>({
  list,
  colWidthList,
  boardType,
  tableHeadList,
  handleEditClick,
  isLoggedIn,
  handleArrowClick,
  handlePageClick,
  pages,
  currentPage,
}: ListProps<T>) {
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
  // TODO: 페이징 기능 추가하기
  return (
    <div className={styles.container}>
      <div className={styles["table-container"]}>
        {boardType !== "inquiry" && !isLoggedIn ? null : (
          <Button
            onClick={() => handleEditClick()}
            color="primary"
            className={styles["write-button"]}
          >
            글쓰기
          </Button>
        )}
        <table className={styles.table}>
          <colgroup>
            {/* TODO: 수치 수정하기 */}
            {/* <col width={100} />
            <col />
            <col width={100} />
            <col width={150} />
            {type === "notice" ? <col width={100} /> : null} */}
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
                  <td>{item.id}</td>
                  <td className={styles.title}>
                    <Link
                      href={
                        boardType === "inquiry"
                          ? `/support/${boardType}/${item.id}/password`
                          : `/support/${boardType}/${item.id}`
                      }
                    >
                      {item.title}
                    </Link>
                  </td>
                  <td>{item.author}</td>
                  <td>
                    <time dateTime={item.created_at}>
                      {formatDate(item.created_at)}
                    </time>
                  </td>
                  {boardType === "notice" && "count" in item ? (
                    <td>{item.count}</td>
                  ) : null}
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
