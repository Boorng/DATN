import * as classNames from "classnames/bind";
import { Fragment } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addListStudent } from "../../../../slices/studentSlice";

import styles from "./AddListStudent.module.scss";

const cx = classNames.bind(styles);

function AddListStudent({ show, setShow, listStudent, fileName }) {
    const dispatch = useDispatch();

    const hanelAddList = () => {
        dispatch(addListStudent(listStudent));
        toast.success("Thêm học sinh thành công");
        setShow(false);
    };
    return (
        <>
            <Modal
                show={show}
                onHide={() => setShow(false)}
                dialogClassName={cx("modal")}
            >
                <Modal.Header closeButton>
                    <Modal.Title className={cx("modal-title")}>
                        Thêm danh sách thông tin sinh viên
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h2 className={cx("file-name")}>{fileName}</h2>
                    <Table striped hover>
                        <thead>
                            <tr>
                                <th className={cx("table-head")}>ID</th>
                                <th className={cx("table-head")}>
                                    Tên học sinh
                                </th>
                                <th className={cx("table-head")}>Tuổi</th>
                                <th className={cx("table-head")}>Giới tính</th>
                                <th className={cx("table-head")}>Dân tộc</th>
                                <th className={cx("table-head")}>
                                    Ngày tháng năm sinh
                                </th>
                                <th className={cx("table-head")}>Email</th>
                                <th className={cx("table-head")}>Địa chỉ</th>
                                <th className={cx("table-head")}>
                                    Số điện thoại
                                </th>
                                <th className={cx("table-head")}>Tên bố</th>
                                <th className={cx("table-head")}>
                                    Số điện thoại
                                </th>
                                <th className={cx("table-head")}>
                                    Nghề nghiệp
                                </th>
                                <th className={cx("table-head")}>Tên mẹ</th>
                                <th className={cx("table-head")}>
                                    Số điện thoại
                                </th>
                                <th className={cx("table-head")}>
                                    Nghề nghiệp
                                </th>
                                <th className={cx("table-head")}>
                                    Tình trạng học tập
                                </th>
                                <th className={cx("table-head")}>
                                    Ngày tốt nghiệp
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {listStudent.map((stu) => {
                                return (
                                    <tr key={stu.Id}>
                                        <td className={cx("table-document")}>
                                            {stu.Id}
                                        </td>
                                        <td className={cx("table-document")}>
                                            {stu.Name}
                                        </td>
                                        <td className={cx("table-document")}>
                                            {stu.Age}
                                        </td>
                                        <td className={cx("table-document")}>
                                            {stu.Gender}
                                        </td>
                                        <td className={cx("table-document")}>
                                            {stu.Ethnic}
                                        </td>
                                        <td className={cx("table-document")}>
                                            {stu.Dob}
                                        </td>
                                        <td className={cx("table-document")}>
                                            {stu.Email}
                                        </td>
                                        <td className={cx("table-document")}>
                                            {stu.Address}
                                        </td>
                                        <td className={cx("table-document")}>
                                            {stu.PhoneNum}
                                        </td>
                                        <td className={cx("table-document")}>
                                            {stu.FatherName}
                                        </td>
                                        <td className={cx("table-document")}>
                                            {stu.FatherPhone}
                                        </td>
                                        <td className={cx("table-document")}>
                                            {stu.FatherCareer}
                                        </td>
                                        <td className={cx("table-document")}>
                                            {stu.MotherName}
                                        </td>
                                        <td className={cx("table-document")}>
                                            {stu.MotherPhone}
                                        </td>
                                        <td className={cx("table-document")}>
                                            {stu.MotherCareer}
                                        </td>

                                        <td className={cx("table-document")}>
                                            {stu.Status === "1"
                                                ? "Đang học"
                                                : stu.Status === "2"
                                                ? "Nghỉ học"
                                                : "Đã tốt nghiệp"}
                                        </td>
                                        <td className={cx("table-document")}>
                                            {stu.GraduationDate}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="primary"
                        className={cx("button-add")}
                        onClick={hanelAddList}
                    >
                        Thêm
                    </Button>
                    <Button
                        variant="secondary"
                        className={cx("button-back")}
                        onClick={() => setShow(false)}
                    >
                        Quay lại
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddListStudent;
