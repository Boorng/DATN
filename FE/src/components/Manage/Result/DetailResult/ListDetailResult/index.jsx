import * as classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { Link, useParams } from "react-router-dom";

import styles from "./ListDetailResult.module.scss";

const cx = classNames.bind(styles);

function ListDetailResult({ listStudentClass, getStudentClass, className }) {
    const { gradeName, academicYear, classId } = useParams();

    //#region Paging
    const [itemOffset, setItemOffset] = useState(0);
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const itemPerPage = 8;
    //#endregion

    const handlePageClick = (event) => {
        const newOffset =
            (event.selected * itemPerPage) % listStudentClass.length;
        const endOffset = newOffset + itemPerPage;
        setItemOffset(newOffset);
        setCurrentItems(listStudentClass.slice(newOffset, endOffset));
    };

    useEffect(() => {
        const endOffset = itemOffset + itemPerPage;

        if (listStudentClass.length > 8) {
            setCurrentItems(listStudentClass.slice(itemOffset, endOffset));
            setPageCount(Math.ceil(listStudentClass.length / itemPerPage));
        } else {
            setItemOffset(0);
            setPageCount(1);
            setCurrentItems(listStudentClass.slice(0, endOffset));
        }
    }, [listStudentClass]);

    return (
        <div className={cx("list-student-class")}>
            <Table striped hover>
                <thead>
                    <tr>
                        <th className={cx("table-head")}>STT</th>
                        <th className={cx("table-head")}>ID</th>
                        <th className={cx("table-head")}>Họ và tên</th>
                        <th className={cx("table-head")}>Số điện thoại</th>
                        <th className={cx("table-head")}>Tình trạng học tập</th>
                        <th className={cx("table-head")}></th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((sc, index) => {
                        return (
                            <tr key={sc.id}>
                                <td className={cx("table-document")}>
                                    {index + 1}
                                </td>
                                <td className={cx("table-document")}>
                                    {sc.studentId}
                                </td>
                                <td className={cx("table-document")}>
                                    {sc.fullName}
                                </td>
                                <td className={cx("table-document")}>
                                    {sc.phone}
                                </td>
                                <td className={cx("table-document")}>
                                    {sc.status === 0 ? "Nghỉ học" : "Đang học"}
                                </td>

                                <td className={cx("list-button")}>
                                    <Link
                                        className={cx(
                                            "button",
                                            "button-detail"
                                        )}
                                        to={`/manage/result/grade/${gradeName}/class/${className}/academicYear/${academicYear}/${classId}/student/${sc.fullName}/${sc.id}`}
                                    >
                                        Xem chi tiết
                                    </Link>

                                    <Link
                                        className={cx(
                                            "button",
                                            "button-update"
                                        )}
                                        to={`/manage/result/grade/${gradeName}/class/${className}/academicYear/${academicYear}/${classId}/edit-student/${sc.fullName}/${sc.id}`}
                                    >
                                        Cập nhật
                                    </Link>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>

            {listStudentClass.length > 8 && (
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName={cx("pagination", "pagination-wrap")}
                    activeClassName="active"
                />
            )}
        </div>
    );
}

export default ListDetailResult;
