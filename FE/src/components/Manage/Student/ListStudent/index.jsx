import * as classNames from "classnames/bind";
import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { utils, writeFile } from "xlsx";

import AddEditStudent from "../AddEditStudent";
import styles from "./ListStudent.module.scss";
import FindStudent from "../FindStudent";
import DetailStudent from "../DetailStudent";
import {
    checkDataStudentAPI,
    deleteStudentAPI,
} from "../../../../services/studentService";
import { deleteAccountAPI } from "../../../../services/accountService";
import { deleteListTestAPI } from "../../../../services/testService";
import { deleteListConductAPI } from "../../../../services/conductService";
import { deleteListStudentClassAPI } from "../../../../services/studentClassService";
import ReactPaginate from "react-paginate";

const cx = classNames.bind(styles);

function ListStudent({ listStudent, getStudent }) {
    const [listStudentExport, setListStudentExport] = useState([]);
    const [isShow, setIsShow] = useState(false);
    const [isDetail, setIsDetail] = useState(false);
    const [isStuDelete, setIsStuDelete] = useState(false);
    const [idStuDelete, setIdStuDelete] = useState("");
    const [idAccDelete, setIdAccDelete] = useState("");
    const [isTestDelete, setIsTestDelete] = useState(false);
    const [isConductDelete, setIsConductDelete] = useState(false);
    const [isStudentClassDelete, setIsStudentClassDelete] = useState(false);
    const [listIdStuClassDelete, setListIdStuClassDelete] = useState([]);
    const [isSure, setIsSure] = useState(false);
    const [studentShow, setStudentShow] = useState({});

    //#region Paging
    const [itemOffset, setItemOffset] = useState(0);
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const itemPerPage = 8;
    //#endregion

    useEffect(() => {
        const lstExport = listStudent.map((item) => {
            return {
                id: item.id,
                fullName: item.fullName,
                age: item.age,
                gender: item.gender,
                ethnic: item.ethnic,
                dob: item.birthDay,
                email: item.email,
                address: item.address,
                phone: item.phone,
                fatherName: item.fatherName,
                fatherPhone: item.fatherPhone,
                fatherCareer: item.fatherCareer,
                motherName: item.motherName,
                motherPhone: item.motherPhone,
                motherCareer: item.motherCareer,
                status: item.status === 1 ? "Đang học" : "Nghỉ học",
                schoolYear: item.schooYear,
            };
        });

        const endOffset = itemOffset + itemPerPage;

        if (listStudent.length > 8) {
            setCurrentItems(listStudent.slice(itemOffset, endOffset));
            setPageCount(Math.ceil(listStudent.length / itemPerPage));
        } else {
            setItemOffset(0);
            setPageCount(1);
            setCurrentItems(listStudent.slice(0, endOffset));
        }

        setListStudentExport(lstExport);
    }, [listStudent]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemPerPage) % listStudent.length;
        const endOffset = newOffset + itemPerPage;
        setItemOffset(newOffset);
        setCurrentItems(listStudent.slice(newOffset, endOffset));
    };

    const handleExport = () => {
        const headings = [
            [
                "Id",
                "Họ và tên",
                "Tuổi",
                "Giới tính",
                "Dân tộc",
                "Ngày tháng năm sinh",
                "Email",
                "Địa chỉ",
                "Số điện thoại",
                "Tên bố",
                "Số điện thoại bố",
                "Nghề nghiệp bố",
                "Tên mẹ",
                "Số điện thoại mẹ",
                "Nghề nghiệp mẹ",
                "Tình trạng học tập",
                "Khóa",
            ],
        ];
        const wb = utils.book_new();
        const ws = utils.json_to_sheet([]);
        utils.sheet_add_aoa(ws, headings);
        utils.sheet_add_json(ws, listStudentExport, {
            origin: "A2",
            skipHeader: true,
        });
        utils.book_append_sheet(wb, ws, "Report");
        writeFile(wb, "Danh sách học sinh.xlsx");
    };

    const handleConfirmDelete = (id) => {
        setIdStuDelete(id);
        setIsStuDelete(true);
    };

    const handleClickEditInfo = (stu) => {
        if (!isShow) setStudentShow(stu);
        else setStudentShow({});
        setIsShow(!isShow);
    };

    const handleClickDetailInfo = (stu) => {
        if (!isDetail) setStudentShow(stu);
        else setStudentShow({});
        setIsDetail(!isDetail);
    };

    const handleSearch = async (input) => {
        await getStudent(input);
    };

    const handleCheckData = async () => {
        const res = await checkDataStudentAPI(idStuDelete);
        if (res.haveAccount) {
            setIdAccDelete(res.accountId);
        }
        if (res.haveConduct) {
            setIsConductDelete(true);
        }
        if (res.haveStudentClass) {
            if (res.haveTest) {
                setListIdStuClassDelete(res.studentClassIds);
                setIsTestDelete(true);
            }
            setIsStudentClassDelete(true);
        }
        setIsSure(true);
        setIsStuDelete(false);
    };

    const handleDeleteAll = async () => {
        let check = true;
        if (isConductDelete) {
            const response = await deleteListConductAPI(idStuDelete);
            if (response.message === "Fail") check = false;
            setIsConductDelete(false);
        }
        if (isStudentClassDelete) {
            if (isTestDelete) {
                listIdStuClassDelete.forEach(async (item) => {
                    const response = await deleteListTestAPI(item);
                    if (response.message === "Fail") check = false;
                });

                setListIdStuClassDelete([]);
            }
            const response = await deleteListStudentClassAPI(idStuDelete);
            if (response.message === "Fail") check = false;
            setIsStudentClassDelete(false);
        }
        if (idAccDelete) {
            const responseStu = await deleteStudentAPI(idStuDelete);
            if (responseStu.message === "Success") {
                const responseAcc = await deleteAccountAPI(idAccDelete);
                if (responseAcc.message === "Fail") check = false;
            }

            setIdStuDelete("");
            setIdAccDelete("");
        }

        if (check) {
            toast.success("Xóa học sinh thành công");
        } else {
            toast.error("Xóa học sinh thất bại");
        }
        setIsSure(false);
        await getStudent();
    };

    return (
        <div className={cx("list-student")}>
            <FindStudent handleSearch={handleSearch} />
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                    variant="warning"
                    onClick={handleExport}
                    className={cx("button-export")}
                >
                    Xuất file
                </Button>
            </div>
            <Table striped hover>
                <thead>
                    <tr>
                        <th className={cx("table-head")}>ID</th>
                        <th className={cx("table-head")}>Tên học sinh</th>
                        <th className={cx("table-head")}>Email</th>
                        <th className={cx("table-head")}>Số điện thoại</th>
                        <th className={cx("table-head")}>Tình trạng học tập</th>
                        <th className={cx("table-head")}>Khóa</th>
                        <th className={cx("table-head")}></th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((stu) => {
                        return (
                            <tr key={stu.id}>
                                <td className={cx("table-document")}>
                                    {stu.id}
                                </td>
                                <td className={cx("table-document")}>
                                    {stu.fullName}
                                </td>
                                <td className={cx("table-document")}>
                                    {stu.email}
                                </td>
                                <td className={cx("table-document")}>
                                    {stu.phone}
                                </td>
                                <td className={cx("table-document")}>
                                    {stu.status === 1 ? "Đang học" : "Nghỉ học"}
                                </td>
                                <td className={cx("table-document")}>
                                    {stu.schoolYear}
                                </td>

                                <td className={cx("list-button")}>
                                    <Button
                                        variant="info"
                                        onClick={() =>
                                            handleClickDetailInfo(stu)
                                        }
                                        className={cx("button")}
                                    >
                                        Xem chi tiết
                                    </Button>

                                    <Button
                                        variant="success"
                                        onClick={() => handleClickEditInfo(stu)}
                                        className={cx("button")}
                                    >
                                        Sửa
                                    </Button>
                                    <Button
                                        onClick={() =>
                                            handleConfirmDelete(stu.id)
                                        }
                                        variant="danger"
                                        className={cx("button")}
                                    >
                                        Xóa
                                    </Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>

            {listStudent.length > 8 && (
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
                <AddEditStudent
                    studentShow={studentShow}
                    show={isShow}
                    showAdd={handleClickEditInfo}
                    getStudent={getStudent}
                />
            )}

            {isDetail && (
                <DetailStudent
                    studentShow={studentShow}
                    show={isDetail}
                    showDetail={handleClickDetailInfo}
                />
            )}

            {isStuDelete && (
                <Modal
                    show={isStuDelete}
                    onHide={() => setIsStuDelete(false)}
                    dialogClassName={cx("modal")}
                    centered
                >
                    <Modal.Header>
                        <Modal.Title className={cx("modal-title")}>
                            Cảnh báo
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className={cx("modal-content")}>
                        Bạn có chắc chắn muốn xóa học sinh không?
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
                            onClick={() => setIsStuDelete(false)}
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
                        Bạn sẽ xóa tất cả những dữ liệu liên quan đến tài khoản,
                        lớp học, bài kiểm tra, bài đánh giá của học sinh. Bạn
                        chắc chắn không?
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

export default ListStudent;
