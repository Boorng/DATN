import * as classNames from "classnames/bind";
import { Col, Image, Modal, Row, Table } from "react-bootstrap";
import { FaUserAlt } from "react-icons/fa";

import styles from "./DetailStudent.module.scss";

const cx = classNames.bind(styles);

function DetailStudent({ studentShow, show, showDetail }) {
    return (
        <div>
            <Modal
                show={show}
                onHide={showDetail}
                dialogClassName={cx("modal")}
            >
                <Modal.Header closeButton>
                    <Modal.Title className={cx("modal-title")}>
                        Chi tiết thông tin học sinh
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col xs={5}>
                            {studentShow.avatar ? (
                                <Image
                                    src={studentShow.avatar}
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
                                        <td>ID học sinh:</td>
                                        <td>
                                            {studentShow.studentId ||
                                                studentShow.id}
                                        </td>
                                    </tr>
                                    <tr style={{ fontSize: "14px" }}>
                                        <td>Tên học sinh:</td>
                                        <td>{studentShow.fullName}</td>
                                    </tr>
                                    <tr style={{ fontSize: "14px" }}>
                                        <td>Tuổi:</td>
                                        <td>{studentShow.age}</td>
                                    </tr>
                                    <tr style={{ fontSize: "14px" }}>
                                        <td>Giới tính:</td>
                                        <td>{studentShow.gender}</td>
                                    </tr>
                                    <tr style={{ fontSize: "14px" }}>
                                        <td>Ngày tháng năm sinh:</td>
                                        <td>{studentShow.birthDay}</td>
                                    </tr>
                                    <tr style={{ fontSize: "14px" }}>
                                        <td>Dân tộc:</td>
                                        <td>{studentShow.ethnic}</td>
                                    </tr>
                                    <tr style={{ fontSize: "14px" }}>
                                        <td>Email:</td>
                                        <td>{studentShow.email}</td>
                                    </tr>
                                    <tr style={{ fontSize: "14px" }}>
                                        <td>Địa chỉ:</td>
                                        <td>{studentShow.address}</td>
                                    </tr>
                                    <tr style={{ fontSize: "14px" }}>
                                        <td>Số điện thoại:</td>
                                        <td>{studentShow.phone}</td>
                                    </tr>
                                    <tr style={{ fontSize: "14px" }}>
                                        <td>Tên bố:</td>
                                        <td>{studentShow.fatherName}</td>
                                    </tr>
                                    <tr style={{ fontSize: "14px" }}>
                                        <td>Nghề nghiệp:</td>
                                        <td>{studentShow.fatherCareer}</td>
                                    </tr>
                                    <tr style={{ fontSize: "14px" }}>
                                        <td>Số điện thoại:</td>
                                        <td>{studentShow.fatherPhone}</td>
                                    </tr>
                                    <tr style={{ fontSize: "14px" }}>
                                        <td>Tên mẹ:</td>
                                        <td>{studentShow.motherName}</td>
                                    </tr>
                                    <tr style={{ fontSize: "14px" }}>
                                        <td>Nghề nghiệp:</td>
                                        <td>{studentShow.motherCareer}</td>
                                    </tr>
                                    <tr style={{ fontSize: "14px" }}>
                                        <td>Số điện thoại:</td>
                                        <td>{studentShow.motherPhone}</td>
                                    </tr>
                                    <tr style={{ fontSize: "14px" }}>
                                        <td>Tình trạng học tập:</td>
                                        <td>
                                            {studentShow.status === 1
                                                ? "Đang học"
                                                : "Nghỉ học"}
                                        </td>
                                    </tr>
                                    <tr style={{ fontSize: "14px" }}>
                                        <td>Khóa:</td>
                                        <td>{studentShow.schoolYear}</td>
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

export default DetailStudent;
