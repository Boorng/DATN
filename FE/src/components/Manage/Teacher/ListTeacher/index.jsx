import * as classNames from "classnames/bind";
import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { utils, writeFile } from "xlsx";

import styles from "./ListTeacher.module.scss";
import FindTeacher from "../FindTeacher";
import DetailTeacher from "../DetailTeacher";
import AddEditTeacher from "../AddEditTeacher";
import {
    checkDataTeacherAPI,
    deleteTeacherAPI,
} from "../../../../services/teacherService";
import { deleteListAssignAPI } from "../../../../services/assignService";
import { deleteAccountAPI } from "../../../../services/accountService";
import ReactPaginate from "react-paginate";

const cx = classNames.bind(styles);

function ListTeacher({ listTeacher, getTeacher }) {
    const [listTeacherExport, setListTeacherExport] = useState([]);
    const [isShow, setIsShow] = useState(false);
    const [isDetail, setIsDetail] = useState(false);
    const [isTeaDelete, setIsTeaDelete] = useState(false);
    const [idTeaDelete, setIdTeaDelete] = useState("");
    const [idAccDelete, setIdAccDelete] = useState("");
    const [isAssignDelete, setIsAssignDelete] = useState(false);
    const [listIdHeaderDelete, setListIdHeaderDelete] = useState([]);
    const [isSure, setIsSure] = useState(false);
    const [isHeader, setIsHeader] = useState(false);
    const [teacherShow, setTeacherShow] = useState({});

    //#region Paging
    const [itemOffset, setItemOffset] = useState(0);
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const itemPerPage = 8;
    //#endregion

    useEffect(() => {
        const lstExport = listTeacher.map((item) => {
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
                status: item.status === 1 ? "Đang làm" : "Nghỉ việc",
                level:
                    item.level === 1
                        ? "Cử nhân"
                        : item.level === 2
                        ? "Thạc sĩ"
                        : item.level === 3
                        ? "Tiến sĩ"
                        : item.level === 4
                        ? "Phó giáo sư"
                        : "Giáo sư",
            };
        });

        const endOffset = itemOffset + itemPerPage;

        if (listTeacher.length > 8) {
            setCurrentItems(listTeacher.slice(itemOffset, endOffset));
            setPageCount(Math.ceil(listTeacher.length / itemPerPage));
        } else {
            setItemOffset(0);
            setPageCount(1);
            setCurrentItems(listTeacher.slice(0, endOffset));
        }

        setListTeacherExport(lstExport);
    }, [listTeacher]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemPerPage) % listTeacher.length;
        const endOffset = newOffset + itemPerPage;
        setItemOffset(newOffset);
        setCurrentItems(endOffset.slice(newOffset, endOffset));
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
                "Số điên thoại",
                "Tình trạng làm việc",
                "Bằng cấp",
            ],
        ];
        const wb = utils.book_new();
        const ws = utils.json_to_sheet([]);
        utils.sheet_add_aoa(ws, headings);
        utils.sheet_add_json(ws, listTeacherExport, {
            origin: "A2",
            skipHeader: true,
        });
        utils.book_append_sheet(wb, ws, "Report");
        writeFile(wb, "Danh sách giáo viên.xlsx");
    };

    const handleConfirmDelete = (id) => {
        setIdTeaDelete(id);
        setIsTeaDelete(true);
    };

    const handleCheckData = async () => {
        const res = await checkDataTeacherAPI(idTeaDelete);
        console.log(res);
        if (res.haveAccount) {
            setIdAccDelete(res.accountId);
        }

        if (res.haveAssign) {
            setIsAssignDelete(true);
        }

        if (res.classIds.length > 0) {
            setListIdHeaderDelete(res.classIds);
        }

        setIsTeaDelete(false);
        setIsSure(true);
    };

    const handleDeleteAll = async () => {
        if (listIdHeaderDelete.length > 0) {
            setIsHeader(true);
        } else {
            let check = true;
            if (isAssignDelete) {
                const response = await deleteListAssignAPI(idTeaDelete);
                if (response.message !== "Success") check = false;
                setIsAssignDelete(false);
            }

            if (idAccDelete) {
                const responseTea = await deleteTeacherAPI(idTeaDelete);
                if (responseTea.message === "Success") {
                    const responseAcc = await deleteAccountAPI(idAccDelete);
                    if (responseAcc.message !== "Success") check = false;
                }

                setIdTeaDelete("");
                setIdAccDelete("");
            }
            if (check) {
                toast.success("Xóa giáo viên thành công");
                await getTeacher();
            } else {
                toast.error("Xóa giáo viên thất bại");
            }
        }
        setIsSure(false);
    };

    const handleClickEditInfo = (tc) => {
        if (!isShow) setTeacherShow(tc);
        else setTeacherShow({});
        setIsShow(!isShow);
    };

    const handleClickDetailInfo = (tc) => {
        if (!isDetail) setTeacherShow(tc);
        else setTeacherShow({});
        setIsDetail(!isDetail);
    };

    const handleSearch = async (input) => {
        await getTeacher(input);
    };

    return (
        <div className={cx("list-teacher")}>
            <FindTeacher handleSearch={handleSearch} />
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
                        <th className={cx("table-head")}>Tên giáo viên</th>
                        <th className={cx("table-head")}>Email</th>
                        <th className={cx("table-head")}>Số điện thoại</th>
                        <th className={cx("table-head")}>Chức danh</th>
                        <th className={cx("table-head")}>
                            Tình trạng làm việc
                        </th>
                        <th className={cx("table-head")}></th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((tea) => {
                        return (
                            <tr key={tea.id}>
                                <td className={cx("table-document")}>
                                    {tea.id}
                                </td>
                                <td className={cx("table-document")}>
                                    {tea.fullName}
                                </td>

                                <td className={cx("table-document")}>
                                    {tea.email}
                                </td>
                                <td className={cx("table-document")}>
                                    {tea.phone}
                                </td>

                                <td className={cx("table-document")}>
                                    {tea.level === 1
                                        ? "Cử nhân"
                                        : tea.level === 2
                                        ? "Thạc sĩ"
                                        : tea.level === 3
                                        ? "Tiến sĩ"
                                        : tea.level === 4
                                        ? "Phó giáo sư"
                                        : "Giáo sư"}
                                </td>
                                <td className={cx("table-document")}>
                                    {tea.status === 1
                                        ? "Đang làm"
                                        : "Nghỉ việc"}
                                </td>
                                <td className={cx("list-button")}>
                                    <Button
                                        variant="info"
                                        onClick={() =>
                                            handleClickDetailInfo(tea)
                                        }
                                        className={cx("button")}
                                    >
                                        Xem chi tiết
                                    </Button>

                                    <Button
                                        variant="success"
                                        onClick={() => handleClickEditInfo(tea)}
                                        className={cx("button")}
                                    >
                                        Sửa
                                    </Button>

                                    <Button
                                        onClick={() =>
                                            handleConfirmDelete(tea.id)
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

            {listTeacher.length > 8 && (
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
                <AddEditTeacher
                    teacherShow={teacherShow}
                    show={isShow}
                    showAdd={handleClickEditInfo}
                    getTeacher={getTeacher}
                />
            )}

            {isDetail && (
                <DetailTeacher
                    teacherShow={teacherShow}
                    show={isDetail}
                    showDetail={handleClickDetailInfo}
                />
            )}

            {isTeaDelete && (
                <Modal
                    show={isTeaDelete}
                    onHide={() => setIsTeaDelete(false)}
                    dialogClassName={cx("modal")}
                    centered
                >
                    <Modal.Header>
                        <Modal.Title className={cx("modal-title")}>
                            Cảnh báo
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className={cx("modal-content")}>
                        Bạn có chắc chắn muốn xóa giáo viên không?
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
                            onClick={() => setIsTeaDelete(false)}
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
                        lớp dạy, lớp chủ nhiệm của giáo viên. Bạn chắc chắn
                        không?
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

            {isHeader && (
                <Modal
                    show={isHeader}
                    onHide={() => setIsHeader(false)}
                    dialogClassName={cx("modal")}
                    centered
                >
                    <Modal.Header>
                        <Modal.Title className={cx("modal-title")}>
                            Cảnh báo
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className={cx("modal-content")}>
                        Bạn cần thay thay đổi giáo viên chủ nhiệm của những lớp
                        giáo viên này dạy trước ({listIdHeaderDelete.toString()}
                        )
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            className={cx("button-back")}
                            onClick={() => setIsHeader(false)}
                        >
                            Quay lại
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
}

export default ListTeacher;
