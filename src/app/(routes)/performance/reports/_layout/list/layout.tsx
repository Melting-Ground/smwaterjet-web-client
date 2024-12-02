import React, { useState } from "react";
import Button from "../../../../../_components/Button/Button";
import styles from "./layout.module.scss";
import { useRouter } from "next/navigation";
import { ReportType } from "../../../../../_types/report";
import { formatDate } from "../../../../../_utils/formatDate";
import { useAuth } from "../../../../../_hooks/useAuth";

interface ListProps<T> {
  list: T[];
  colWidthList: number[];
  tableHeadList: string[];
  handleDelete: (id: string) => void;
}

export default function BoardListLayout({
  list,
  colWidthList,
  tableHeadList,
  handleDelete,
}: ListProps<ReportType>) {
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  const goToEditPage = () => {
    router.push("/performance/reports/edit");
  };

  return (
    <div className={styles.container}>
      <div className={styles["table-container"]}>
        {isLoggedIn ? (
          <Button
            onClick={goToEditPage}
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
            {list.map((item) => (
              <tr key={item.id}>
                <td>
                  {!isLoggedIn ? (
                    item.id
                  ) : (
                    <Button
                      color="red"
                      className={styles["delete-button"]}
                      onClick={() => handleDelete(item.id.toString())}
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
                      color="primary-border"
                      className={styles["edit-button"]}
                      onClick={goToEditPage}
                    >
                      수정
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
