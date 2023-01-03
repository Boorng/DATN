import * as classNames from "classnames/bind";

import styles from "./DetailTeacher.module.scss";
import { Col, Image, Modal, Row, Table } from "react-bootstrap";
import { FaUserAlt } from "react-icons/fa";

const cx = classNames.bind(styles);

function DetailTeacher({ teacherShow, show, showDetail }) {
    return (
        <div>
            <Modal
                show={show}
                onHide={showDetail}
                dialogClassName={cx("modal")}
            >
                <Modal.Header closeButton>
                    <Modal.Title className={cx("modal-title")}>
                        Chi tiết thông tin giáo viên
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col xs={5}>
                            {teacherShow.avatar ? (
                                <Image
                                    src={URL.createObjectURL(
                                        teacherShow.avatar
                                    )}
                                    alt="avatar"
                                    className={cx("avatar-image")}
                                />
                            ) : (
                                <FaUserAlt className={cx("avatar-image")} />
                            )}
                        </Col>
                        <Col>
                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th style={{ width: "200px" }}>
                                            Thông tin
                                        </th>
                                        <th>Nội dung</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr style={{ fontSize: "14px" }}>
                                        <td>ID giáo viên:</td>
                                        <td>{teacherShow.id}</td>
                                    </tr>
                                    <tr style={{ fontSize: "14px" }}>
                                        <td>Tên giáo viên:</td>
                                        <td>{teacherShow.fullName}</td>
                                    </tr>
                                    <tr style={{ fontSize: "14px" }}>
                                        <td>Tuổi:</td>
                                        <td>{teacherShow.age}</td>
                                    </tr>
                                    <tr style={{ fontSize: "14px" }}>
                                        <td>Giới tính:</td>
                                        <td>{teacherShow.gender}</td>
                                    </tr>
                                    <tr style={{ fontSize: "14px" }}>
                                        <td>Ngày tháng năm sinh:</td>
                                        <td>{teacherShow.birthDay}</td>
                                    </tr>
                                    <tr style={{ fontSize: "14px" }}>
                                        <td>Dân tộc:</td>
                                        <td>{teacherShow.ethnic}</td>
                                    </tr>
                                    <tr style={{ fontSize: "14px" }}>
                                        <td>Email:</td>
                                        <td>{teacherShow.email}</td>
                                    </tr>
                                    <tr style={{ fontSize: "14px" }}>
                                        <td>Địa chỉ:</td>
                                        <td>{teacherShow.address}</td>
                                    </tr>
                                    <tr style={{ fontSize: "14px" }}>
                                        <td>Số điện thoại:</td>
                                        <td>{teacherShow.phone}</td>
                                    </tr>
                                    <tr style={{ fontSize: "14px" }}>
                                        <td>Bằng cấp:</td>
                                        <td>
                                            {teacherShow.level === 1
                                                ? "Cử nhân"
                                                : teacherShow.level === 2
                                                ? "Thạc sĩ"
                                                : teacherShow.level === 3
                                                ? "Tiến sĩ"
                                                : teacherShow.level === 4
                                                ? "Phó giáo sư"
                                                : "Giáo sư"}
                                        </td>
                                    </tr>
                                    <tr style={{ fontSize: "14px" }}>
                                        <td>Tình trạng làm việc:</td>
                                        <td>
                                            {teacherShow.status === 1
                                                ? "Đang làm"
                                                : "Nghỉ việc"}
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default DetailTeacher;
