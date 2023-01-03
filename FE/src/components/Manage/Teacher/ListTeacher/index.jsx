import * as classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { utils, writeFile } from "xlsx";

import styles from "./ListTeacher.module.scss";
import {
    resetTeacher,
    updateStatusTeacher,
} from "../../../../slices/teacherSlice";
import FindTeacher from "../FindTeacher";
import DetailTeacher from "../DetailTeacher";
import AddEditTeacher from "../AddEditTeacher";
import {
    getTeacherAPI,
    updateStatusTeacherAPI,
} from "../../../../services/teacherService";
const cx = classNames.bind(styles);

function ListTeacher() {
    const data = useSelector((state) => state.teacher.listTeacher);

    const [listTeacher, setListTeacher] = useState([]);
    const [listTeacherExport, setListTeacherExport] = useState([]);
    const [isShow, setIsShow] = useState(false);
    const [isDetail, setIsDetail] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [idDelete, setIdDelete] = useState("");
    const [teacherShow, setTeacherShow] = useState({});

    const dispatch = useDispatch();

    const getTeacher = async (search) => {
        const dataAPI = await getTeacherAPI(search);
        console.log(dataAPI);
        dispatch(resetTeacher(dataAPI));
    };

    useEffect(() => {
        getTeacher();
    }, []);

    useEffect(() => {
        const lstExport = data.map((item) => {
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
        setListTeacher(data);
        setListTeacherExport(lstExport);
    }, [data]);

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
        writeFile(wb, "TeacherReport.xlsx");
    };

    const handleUpdateStatus = async () => {
        const status = await updateStatusTeacherAPI(idDelete);
        console.log(status);
        if (status.message === "Success") {
            dispatch(updateStatusTeacher(idDelete));
            toast.success("Cập nhật tình trạng làm việc thành công");
        } else {
            toast.error("Cập nhật tình trạng làm việc thất bại");
        }
        setIdDelete("");
        setIsDelete(false);
    };

    const handleConfirmUpdate = (id) => {
        setIdDelete(id);
        setIsDelete(true);
    };

    const handleClickEditInfo = (stu) => {
        if (!isShow) setTeacherShow(stu);
        else setTeacherShow({});
        setIsShow(!isShow);
    };

    const handleClickDetailInfo = (stu) => {
        if (!isDetail) setTeacherShow(stu);
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
                        <th className={cx("table-head")}>Tuổi</th>
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
                    {listTeacher.map((tea) => {
                        return (
                            <tr key={tea.id}>
                                <td className={cx("table-document")}>
                                    {tea.id}
                                </td>
                                <td className={cx("table-document")}>
                                    {tea.fullName}
                                </td>
                                <td className={cx("table-document")}>
                                    {tea.age}
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

                                    {tea.status === 1 && (
                                        <>
                                            {" "}
                                            <Button
                                                onClick={() =>
                                                    handleConfirmUpdate(tea.id)
                                                }
                                                variant="danger"
                                                className={cx("button")}
                                            >
                                                Nghỉ việc
                                            </Button>
                                            <Button
                                                variant="success"
                                                onClick={() =>
                                                    handleClickEditInfo(tea)
                                                }
                                                className={cx("button")}
                                            >
                                                Sửa
                                            </Button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            {isShow && (
                <AddEditTeacher
                    teacherShow={teacherShow}
                    show={isShow}
                    showAdd={handleClickEditInfo}
                />
            )}
            {isDetail && (
                <DetailTeacher
                    teacherShow={teacherShow}
                    show={isDetail}
                    showDetail={handleClickDetailInfo}
                />
            )}
            <Modal
                show={isDelete}
                onHide={() => setIsDelete(false)}
                dialogClassName={cx("modal")}
                centered
            >
                <Modal.Header>
                    <Modal.Title className={cx("modal-title")}>
                        Cảnh báo
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className={cx("modal-content")}>
                    Bạn có chắc chắn muốn cho giáo viên nghỉ việc không?
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="primary"
                        className={cx("button-confirm")}
                        onClick={handleUpdateStatus}
                    >
                        Xác nhận
                    </Button>
                    <Button
                        variant="secondary"
                        className={cx("button-back")}
                        onClick={() => setIsDelete(false)}
                    >
                        Quay lại
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ListTeacher;
