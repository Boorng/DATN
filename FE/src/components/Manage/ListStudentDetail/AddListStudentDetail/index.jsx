import * as classNames from "classnames/bind";
import { Button, Modal, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { postListStudentClassAPI } from "../../../../services/studentClassService";

import styles from "./AddListStudentDetail.module.scss";

const cx = classNames.bind(styles);

function AddListStudentDetail({
    show,
    setShow,
    listStudentClassAdd,
    fileName,
    getStudentClass,
}) {
    const hanelAddList = async () => {
        const status = await postListStudentClassAPI(listStudentClassAdd);
        if (status.message === "Success") {
            toast.success("Thêm học sinh vào lớp thành công");
            await getStudentClass();
            setShow(false);
        } else {
            toast.error(
                "Thêm học sinh vào lớp thất bại do đã có ID học sinh trong lớp hoặc không tồn tại ID học sinh cần thêm"
            );
        }
    };

    return (
        <Modal
            show={show}
            onHide={() => setShow(false)}
            dialogClassName={cx("modal")}
        >
            <Modal.Header closeButton>
                <Modal.Title className={cx("modal-title")}>
                    Thêm danh sách thông tin học sinh vào lớp
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h2 className={cx("file-name")}>{fileName}</h2>
                <Table striped hover>
                    <thead>
                        <tr>
                            <th className={cx("table-head")}>ID</th>
                            <th className={cx("table-head")}>Tên học sinh</th>
                            <th className={cx("table-head")}>Tuổi</th>
                            <th className={cx("table-head")}>Giới tính</th>
                            <th className={cx("table-head")}>Dân tộc</th>
                            <th className={cx("table-head")}>
                                Ngày tháng năm sinh
                            </th>
                            <th className={cx("table-head")}>Email</th>
                            <th className={cx("table-head")}>Địa chỉ</th>
                            <th className={cx("table-head")}>Số điện thoại</th>
                            <th className={cx("table-head")}>Tên bố</th>
                            <th className={cx("table-head")}>
                                Số điện thoại bố
                            </th>
                            <th className={cx("table-head")}>Nghề nghiệp bố</th>
                            <th className={cx("table-head")}>Tên mẹ</th>
                            <th className={cx("table-head")}>
                                Số điện thoại mẹ
                            </th>
                            <th className={cx("table-head")}>Nghề nghiệp mẹ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listStudentClassAdd.map((stu) => {
                            return (
                                <tr key={stu.studentId}>
                                    <td className={cx("table-document")}>
                                        {stu.studentId}
                                    </td>
                                    <td className={cx("table-document")}>
                                        {stu.fullName}
                                    </td>
                                    <td className={cx("table-document")}>
                                        {stu.age}
                                    </td>
                                    <td className={cx("table-document")}>
                                        {stu.gender}
                                    </td>
                                    <td className={cx("table-document")}>
                                        {stu.ethnic}
                                    </td>
                                    <td className={cx("table-document")}>
                                        {stu.birthDay}
                                    </td>
                                    <td className={cx("table-document")}>
                                        {stu.email}
                                    </td>
                                    <td className={cx("table-document")}>
                                        {stu.address}
                                    </td>
                                    <td className={cx("table-document")}>
                                        {stu.phone}
                                    </td>
                                    <td className={cx("table-document")}>
                                        {stu.fatherName}
                                    </td>
                                    <td className={cx("table-document")}>
                                        {stu.fatherPhone}
                                    </td>
                                    <td className={cx("table-document")}>
                                        {stu.fatherCareer}
                                    </td>
                                    <td className={cx("table-document")}>
                                        {stu.motherName}
                                    </td>
                                    <td className={cx("table-document")}>
                                        {stu.motherPhone}
                                    </td>
                                    <td className={cx("table-document")}>
                                        {stu.motherCareer}
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
    );
}

export default AddListStudentDetail;
