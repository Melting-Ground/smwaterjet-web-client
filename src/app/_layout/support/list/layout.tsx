import React from "react";
import Button from "@/_components/Button/Button";
import styles from "./layout.module.scss";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { formatDate } from "@/_utils/formatDate";
import { NoticeType } from "@/_types/notice";
import { InquiryType } from "@/_types/inquiry";
import { useAuth } from "@/_hooks/useAuth";
import { BoardType } from "@/_types/board";

interface ListProps<T> {
  list: T[];
  colWidthList: number[];
  type: BoardType;
  tableHeadList: string[];
}

export default function BoardListLayout<T extends NoticeType | InquiryType>({
  list,
  colWidthList,
  type,
  tableHeadList,
}: ListProps<T>) {
  const router = useRouter();

  // TODO: type === "notice", "inquiry" 일 경우와 "performance" 일 경우 대분류가 다름
  const goToEditPage = () => {
    router.push(`/support/${type}/edit`);
  };

  const { isLoggedIn } = useAuth();

  // TODO: 페이징 기능 추가하기
  return (
    <div className={styles.container}>
      <div className={styles["table-container"]}>
        {type !== "inquiry" && !isLoggedIn ? null : (
          <Button
            onClick={goToEditPage}
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
                        type === "inquiry"
                          ? `/support/${type}/${item.id}/password`
                          : `/support/${type}/${item.id}`
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
                  {type === "notice" ? <td>{item.count}</td> : null}
                </tr>
              ))
            ) : (
              <>데이터가 존재하지 않습니다.</>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
