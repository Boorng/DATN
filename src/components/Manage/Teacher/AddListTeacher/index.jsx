import * as classNames from "classnames/bind";
import { Fragment } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addListTeacher } from "../../../../slices/teacherSlice";

import styles from "./AddListTeacher.module.scss";

const cx = classNames.bind(styles);

function AddListTeacher({ show, setShow, listTeacher, fileName }) {
    const dispatch = useDispatch();

    const hanelAddList = () => {
        dispatch(addListTeacher(listTeacher));
        toast.success("Thêm giáo viên thành công");
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
                        Thêm danh sách thông tin giáo viên
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h2 className={cx("file-name")}>{fileName}</h2>
                    <Table striped hover>
                        <thead>
                            <tr>
                                <th className={cx("table-head")}>ID</th>
                                <th className={cx("table-head")}>
                                    Tên giáo viên
                                </th>
                                <th className={cx("table-head")}>Tuổi</th>
                                <th className={cx("table-head")}>Giới tính</th>
                                <th className={cx("table-head")}>
                                    Ngày tháng năm sinh
                                </th>
                                <th className={cx("table-head")}>Email</th>
                                <th className={cx("table-head")}>Địa chỉ</th>
                                <th className={cx("table-head")}>
                                    Số điện thoại
                                </th>
                                <th className={cx("table-head")}>Chức danh</th>
                                <th className={cx("table-head")}>
                                    Tinh trạng làm việc
                                </th>
                                <th className={cx("table-head")}>
                                    Tổ chuyên môn
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {listTeacher.map((tc) => {
                                return (
                                    <Fragment key={tc.Id}>
                                        <tr>
                                            <td
                                                className={cx("table-document")}
                                            >
                                                {tc.Id}
                                            </td>
                                            <td
                                                className={cx("table-document")}
                                            >
                                                {tc.Name}
                                            </td>
                                            <td
                                                className={cx("table-document")}
                                            >
                                                {tc.Age}
                                            </td>
                                            <td
                                                className={cx("table-document")}
                                            >
                                                {tc.Gender}
                                            </td>
                                            <td
                                                className={cx("table-document")}
                                            >
                                                {tc.Dob}
                                            </td>
                                            <td
                                                className={cx("table-document")}
                                            >
                                                {tc.Email}
                                            </td>
                                            <td
                                                className={cx("table-document")}
                                            >
                                                {tc.Address}
                                            </td>
                                            <td
                                                className={cx("table-document")}
                                            >
                                                {tc.PhoneNum}
                                            </td>

                                            <td
                                                className={cx("table-document")}
                                            >
                                                {tc.Level}
                                            </td>
                                            <td
                                                className={cx("table-document")}
                                            >
                                                {tc.Status === "1"
                                                    ? "Đang làm"
                                                    : "Nghỉ làm"}
                                            </td>
                                            <td
                                                className={cx("table-document")}
                                            >
                                                {tc.TeamId}
                                            </td>
                                        </tr>
                                    </Fragment>
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

export default AddListTeacher;
