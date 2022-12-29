import * as classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import { Button, Modal, ModalBody } from "react-bootstrap";
import { toast } from "react-toastify";
import { utils, writeFile } from "xlsx";

import {
    resetStudent,
    updateStatusStudent,
} from "../../../../slices/studentSlice";
import AddEditStudent from "../AddEditStudent";
import styles from "./ListStudent.module.scss";
import FindStudent from "../FindStudent";
import DetailStudent from "../DetailStudent";
import {
    getStudentAPI,
    updateStatusStudentAPI,
} from "../../../../services/getRequest";

const cx = classNames.bind(styles);

function ListStudent() {
    const data = useSelector((state) => state.student.listStudent);

    const [listStudent, setListStudent] = useState([]);
    const [listStudentExport, setListStudentExport] = useState([]);
    const [isShow, setIsShow] = useState(false);
    const [isDetail, setIsDetail] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [idDelete, setIdDelete] = useState("");
    const [studentShow, setStudentShow] = useState({});

    const dispatch = useDispatch();

    const getStudent = async (search) => {
        const data = await getStudentAPI(search);
        console.log(data);
        dispatch(resetStudent(data));
    };
    useEffect(() => {
        getStudent();
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
                fatherName: item.fatherName,
                fatherCareer: item.fatherCareer,
                fatherPhone: item.fatherPhone,
                motherName: item.motherName,
                motherCareer: item.motherCareer,
                motherPhone: item.motherPhone,
                status: item.status === 1 ? "Đang học" : "Nghỉ học",
            };
        });
        setListStudent(data);
        setListStudentExport(lstExport);
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
                "Số điện thoại",
                "Tên bố",
                "Số điện thoại bố",
                "Nghề nghiệp bố",
                "Tên mẹ",
                "Số điện thoại mẹ",
                "Nghề nghiệp mẹ",
                "Tình trạng học tập",
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
        writeFile(wb, "Student Report.xlsx");
    };

    const handleUpdateStatus = async () => {
        const status = await updateStatusStudentAPI(idDelete);
        console.log(status);
        if (status.message === "Success") {
            dispatch(updateStatusStudent(idDelete));
            toast.success("Cập nhật tình trạng học tập thành công");
        } else {
            toast.error("Cập nhật tình trạng học tập thất bại");
        }
        setIdDelete("");
        setIsDelete(false);
    };

    const handleConfirmUpdate = (id) => {
        setIdDelete(id);
        setIsDelete(true);
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
                        <th className={cx("table-head")}>Tuổi</th>
                        <th className={cx("table-head")}>Email</th>
                        <th className={cx("table-head")}>Số điện thoại</th>
                        <th className={cx("table-head")}>Tình trạng học tập</th>
                        <th className={cx("table-head")}></th>
                    </tr>
                </thead>
                <tbody>
                    {listStudent.map((stu) => {
                        return (
                            <tr key={stu.id}>
                                <td className={cx("table-document")}>
                                    {stu.id}
                                </td>
                                <td className={cx("table-document")}>
                                    {stu.fullName}
                                </td>
                                <td className={cx("table-document")}>
                                    {stu.age}
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

                                    {stu.status === 1 && (
                                        <>
                                            <Button
                                                variant="success"
                                                onClick={() =>
                                                    handleClickEditInfo(stu)
                                                }
                                                className={cx("button")}
                                            >
                                                Sửa
                                            </Button>
                                            <Button
                                                onClick={() =>
                                                    handleConfirmUpdate(stu.id)
                                                }
                                                variant="danger"
                                                className={cx("button")}
                                            >
                                                Nghỉ học
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
                <AddEditStudent
                    studentShow={studentShow}
                    show={isShow}
                    showAdd={handleClickEditInfo}
                />
            )}
            {isDetail && (
                <DetailStudent
                    studentShow={studentShow}
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
                    Bạn có chắc chắn muốn cho học sinh nghỉ học không?
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

export default ListStudent;
