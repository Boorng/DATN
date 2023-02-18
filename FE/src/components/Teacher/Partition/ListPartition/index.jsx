import * as classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";

import styles from "./ListPartition.module.scss";

const cx = classNames.bind(styles);

function ListPartition({ listAssign }) {
    //#region Paging
    const [itemOffset, setItemOffset] = useState(0);
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const itemPerPage = 8;
    //#endregion

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemPerPage) % listAssign.length;
        const endOffset = newOffset + itemPerPage;
        setItemOffset(newOffset);
        setCurrentItems(endOffset.slice(newOffset, endOffset));
    };

    useEffect(() => {
        const endOffset = itemOffset + itemPerPage;

        if (listAssign.length > 8) {
            setCurrentItems(listAssign.slice(itemOffset, endOffset));
            setPageCount(Math.ceil(listAssign.length / itemPerPage));
        } else {
            setItemOffset(0);
            setPageCount(1);
            setCurrentItems(listAssign.slice(0, endOffset));
        }
    }, [listAssign]);

    return (
        <div>
            <Table striped hover>
                <thead>
                    <tr>
                        <th className={cx("table-head")}>ID Lớp</th>
                        <th className={cx("table-head")}>Lớp dạy</th>
                        <th className={cx("table-head")}>Môn dạy</th>
                        <th className={cx("table-head")}>Học kì</th>
                        <th className={cx("table-head")}></th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((item) => {
                        return (
                            <tr key={item.id}>
                                <td className={cx("table-document")}>
                                    {item.classId}
                                </td>
                                <td className={cx("table-document")}>
                                    {item.className}
                                </td>
                                <td className={cx("table-document")}>
                                    {item.subjectName}
                                </td>
                                <td className={cx("table-document")}>
                                    {item.semesterName}
                                </td>
                                <td className={cx("table-document", "button")}>
                                    <Link
                                        className={cx("button-link")}
                                        to={`/teacher/subject-class/result/class/${item.className}/${item.classId}/subject/${item.subjectName}/${item.subjectId}/semester/${item.semesterName}/${item.semesterId}`}
                                    >
                                        Xem chi tiết
                                    </Link>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>

            {listAssign.length > 8 && (
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

export default ListPartition;
