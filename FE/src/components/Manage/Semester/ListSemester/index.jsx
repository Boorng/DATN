import * as classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import { deleteListAssignAPI } from "../../../../services/assignService";
import { deleteListConductAPI } from "../../../../services/conductService";
import {
    checkDataSemesterAPI,
    deleteSemesterAPI,
} from "../../../../services/semesterService";
import { deleteListTestAPI } from "../../../../services/testService";
import AddEditSemester from "../AddEditSemester";

import styles from "./ListSemester.module.scss";

const cx = classNames.bind(styles);

function ListSemester({ listSemester, getSemester }) {
    const [isShow, setIsShow] = useState(false);
    const [isSeDelete, setIsSeDelete] = useState(false);
    const [idSeDelete, setIdSeDelete] = useState("");
    const [isAssignDelete, setIsAssignDelete] = useState("");
    const [isConductDelete, setIsConductDelete] = useState(false);
    const [isTestDelete, setIsTestDelete] = useState(false);
    const [isSure, setIsSure] = useState(false);
    const [semesterShow, setSemesterShow] = useState({});

    //#region Paging
    const [itemOffset, setItemOffset] = useState(0);
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const itemPerPage = 8;
    //#endregion

    const handleConfirmDelete = (id) => {
        setIdSeDelete(id);
        setIsSeDelete(true);
    };

    const handleCheckData = async () => {
        const res = await checkDataSemesterAPI(idSeDelete);
        if (res.haveAssign) {
            setIsAssignDelete(true);
        }

        if (res.haveConduct) {
            setIsConductDelete(true);
        }

        if (res.haveTest) {
            setIsTestDelete(true);
        }

        setIsSure(true);
        setIsSeDelete(false);
    };

    const handleDeleteAll = async () => {
        let check = true;
        if (isAssignDelete) {
            const res = await deleteListAssignAPI("", "", "", idSeDelete);
            if (res.message == "Fail") check = false;
        }

        if (isConductDelete) {
            const res = await deleteListConductAPI("", idSeDelete);
            if (res.message == "Fail") check = false;
        }

        if (isTestDelete) {
            const res = await deleteListTestAPI("", idSeDelete);
            if (res.message == "Fail") check = false;
        }

        const response = await deleteSemesterAPI(idSeDelete);
        if (response.message === "Fail") {
            check = false;
        }
        setIdSeDelete("");

        if (check) {
            toast.success("Xóa lớp thành công");
        } else {
            toast.error("Xóa lớp thất bại");
        }

        setIsSure(false);
        await getSemester();
    };

    const handleClickEditInfo = (se) => {
        if (!isShow) setSemesterShow(se);
        else setSemesterShow({});
        setIsShow(!isShow);
    };

    useEffect(() => {
        const endOffset = itemOffset + itemPerPage;

        if (listSemester.length > 8) {
            setCurrentItems(listSemester.slice(itemOffset, endOffset));
            setPageCount(Math.ceil(listSemester.length / itemPerPage));
        } else {
            setItemOffset(0);
            setPageCount(1);
            setCurrentItems(listSemester.slice(0, endOffset));
        }
    }, [listSemester]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemPerPage) % listSemester.length;
        const endOffset = newOffset + itemPerPage;
        setItemOffset(newOffset);
        setCurrentItems(listSemester.slice(newOffset, endOffset));
    };

    return (
        <div className={cx("list-semester")}>
            <Table striped hover>
                <thead>
                    <tr>
                        <th className={cx("table-head")}>STT</th>
                        <th className={cx("table-head")}>Học kỳ</th>
                        <th className={cx("table-head")}>Năm học</th>
                        <th className={cx("table-head")}>Thời gian bắt đầu</th>
                        <th className={cx("table-head")}>Thời gian kết thúc</th>
                        <th className={cx("table-head")}></th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((se, index) => {
                        return (
                            <tr key={se.id}>
                                <td className={cx("table-document")}>
                                    {index + 1}
                                </td>
                                <td className={cx("table-document")}>
                                    {se.name}
                                </td>
                                <td className={cx("table-document")}>
                                    {se.schoolYear}
                                </td>
                                <td className={cx("table-document")}>
                                    {se.timeStart}
                                </td>
                                <td className={cx("table-document")}>
                                    {se.timeEnd}
                                </td>

                                <td className={cx("list-button")}>
                                    <Button
                                        onClick={() =>
                                            handleConfirmDelete(se.id)
                                        }
                                        variant="danger"
                                        className={cx("button")}
                                    >
                                        Xóa
                                    </Button>

                                    <Button
                                        variant="success"
                                        onClick={() => handleClickEditInfo(se)}
                                        className={cx("button")}
                                    >
                                        Sửa
                                    </Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>

            {listSemester.length > 8 && (
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

            {isShow && (
                <AddEditSemester
                    semesterShow={semesterShow}
                    show={isShow}
                    showAdd={handleClickEditInfo}
                    getSemester={getSemester}
                />
            )}

            {isSeDelete && (
                <Modal
                    show={isSeDelete}
                    onHide={() => setIsSeDelete(false)}
                    dialogClassName={cx("modal")}
                    centered
                >
                    <Modal.Header>
                        <Modal.Title className={cx("modal-title")}>
                            Cảnh báo
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className={cx("modal-content")}>
                        Bạn có chắc chắn muốn xóa lớp không?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="primary"
                            className={cx("button-confirm")}
                            onClick={handleCheckData}
                        >
                            Xác nhận
                        </Button>
                        <Button
                            variant="secondary"
                            className={cx("button-back")}
                            onClick={() => setIsSeDelete(false)}
                        >
                            Quay lại
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}

            {isSure && (
                <Modal
                    show={isSure}
                    onHide={() => setIsSure(false)}
                    dialogClassName={cx("modal")}
                    centered
                >
                    <Modal.Header>
                        <Modal.Title className={cx("modal-title")}>
                            Cảnh báo
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className={cx("modal-content")}>
                        Bạn sẽ xóa tất cả những dữ liệu liên quan đến lớp dạy,
                        giáo viên, bài kiểm tra, đánh giá của học sinh trong học
                        kỳ. Bạn chắc chắn không?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="primary"
                            className={cx("button-confirm")}
                            onClick={handleDeleteAll}
                        >
                            Xác nhận
                        </Button>
                        <Button
                            variant="secondary"
                            className={cx("button-back")}
                            onClick={() => setIsSure(false)}
                        >
                            Quay lại
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
}

export default ListSemester;
