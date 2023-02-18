import * as classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";

import styles from "./ListMainResult.module.scss";
import FindMainResult from "../FindMainResult";

const cx = classNames.bind(styles);

function ListMainResult({ listHomeRoom, getClassHomeRoom }) {
    //#region Paging
    const [itemOffset, setItemOffset] = useState(0);
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const itemPerPage = 8;
    //#endregion

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemPerPage) % listHomeRoom.length;
        const endOffset = newOffset + itemPerPage;
        setItemOffset(newOffset);
        setCurrentItems(endOffset.slice(newOffset, endOffset));
    };

    useEffect(() => {
        const endOffset = itemOffset + itemPerPage;

        if (listHomeRoom.length > 8) {
            setCurrentItems(listHomeRoom.slice(itemOffset, endOffset));
            setPageCount(Math.ceil(listHomeRoom.length / itemPerPage));
        } else {
            setItemOffset(0);
            setPageCount(1);
            setCurrentItems(listHomeRoom.slice(0, endOffset));
        }
    }, [listHomeRoom]);

    const handleSearch = async (input) => {
        await getClassHomeRoom(input);
    };

    return (
        <div>
            <FindMainResult handleSearch={handleSearch} />
            <Table striped hover>
                <thead>
                    <tr>
                        <th className={cx("table-head")}>ID Lớp</th>
                        <th className={cx("table-head")}>Lớp dạy</th>
                        <th className={cx("table-head")}>Năm học</th>
                        <th className={cx("table-head")}></th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((item) => {
                        return (
                            <tr key={item.id}>
                                <td className={cx("table-document")}>
                                    {item.id}
                                </td>
                                <td className={cx("table-document")}>
                                    {item.name}
                                </td>
                                <td className={cx("table-document")}>
                                    {item.academicYear}
                                </td>

                                <td className={cx("table-document", "button")}>
                                    <Link
                                        className={cx("button-link")}
                                        to={`/teacher/homeroom-class/result/${item.id}/${item.name}/grade/${item.grade}/academicYear/${item.academicYear}`}
                                    >
                                        Xem chi tiết
                                    </Link>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>

            {listHomeRoom.length > 8 && (
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

export default ListMainResult;
