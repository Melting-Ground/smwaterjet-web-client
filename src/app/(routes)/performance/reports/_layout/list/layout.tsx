import React from "react";
import Button from "../../../../../_components/Button/Button";
import styles from "./layout.module.scss";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ReportType } from "../../../../../_types/report";
import { formatDate } from "../../../../../_utils/formatDate";

interface ListProps<T> {
  list: T[];
  colWidthList: number[];
  tableHeadList: string[];
}

export default function BoardListLayout({
  list,
  colWidthList,
  tableHeadList,
}: ListProps<ReportType>) {
  const router = useRouter();

  const goToEditPage = () => {
    router.push("/performance/reports/edit");
  };
  return (
    <div className={styles.container}>
      <div className={styles["table-container"]}>
        <Button
          onClick={goToEditPage}
          color="primary"
          className={styles["write-button"]}
        >
          글쓰기
        </Button>

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
                <td>{item.id}</td>
                <td>{item.year}</td>
                <td>{item.title}</td>
                <td>{formatDate(item.start_date)}</td>
                <td>{formatDate(item.end_date)}</td>
                <td>{item.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
