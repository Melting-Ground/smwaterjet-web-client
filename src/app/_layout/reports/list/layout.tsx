import React, { ChangeEvent } from "react";
import styles from "./layout.module.scss";
import { ReportType } from "@/_types/report";
import { formatDate } from "@/_utils/formatDate";
import Button from "@/_components/Button/Button";
import Pagination from "@/_components/Pagination/Pagination";
import Select from "@/_components/Select/Select";

interface ListProps<T> {
  list: T[];
  colWidthList: number[];
  tableHeadList: string[];
  handleDelete: (id: number | undefined) => void;
  handleEditClick: (id?: string) => void;
  handleYearSearch: (year: number) => void;
  isLoggedIn: boolean;
  handleArrowClick: (direction: "prev" | "next") => void;
  handlePageClick: (page: number) => void;
  pages: number[];
  currentPage: number;

  // Select
  yearList: number[];
  handleSelectYear: (e: ChangeEvent<HTMLSelectElement>) => void;
  selectedYear: number | undefined;
}

export default function BoardListLayout({
  list,
  colWidthList,
  tableHeadList,
  handleDelete,
  handleEditClick,
  handleYearSearch,
  isLoggedIn,
  handleArrowClick,
  handlePageClick,
  pages,
  currentPage,
  yearList,
  handleSelectYear,
  selectedYear,
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
  // const yearList = generateYears();
  // const [selectedYear, setSelectedYear] = useState<number>();

  // const handleSelectYear = (e: ChangeEvent<HTMLSelectElement>) => {
  //   const { value } = e.target;
  //   setSelectedYear(Number(value));
  // };

  // useEffect(() => {
  //   if (selectedYear) {
  //     console.log(selectedYear);
  //     handleYearSearch(selectedYear);
  //   } else {
  //     // 선택
  //   }
  // }, [selectedYear]);

  return (
    <div className={styles.container}>
      <div className={styles["table-container"]}>
        <div className={styles["button-container"]}>
          <label htmlFor="year" className={styles["sr-only"]}>
            공사년도
          </label>
          <Select
            selectList={yearList}
            id="year"
            value={selectedYear?.toString()}
            onChange={handleSelectYear}
            placeholder="공사년도"
            className={styles.select}
          />

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
        </div>

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
