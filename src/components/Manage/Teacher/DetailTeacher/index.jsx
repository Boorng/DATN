import * as classNames from "classnames/bind";
import Offcanvas from "react-bootstrap/Offcanvas";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

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
                                        <td>{teacherShow.Id}</td>
                                    </tr>
                                    <tr style={{ fontSize: "14px" }}>
                                        <td>Tên giáo viên:</td>
                                        <td>{teacherShow.Name}</td>
                                    </tr>
                                    <tr style={{ fontSize: "14px" }}>
                                        <td>Tuổi:</td>
                                        <td>{teacherShow.Age}</td>
                                    </tr>
                                    <tr style={{ fontSize: "14px" }}>
                                        <td>Giới tính:</td>
                                        <td>{teacherShow.Gender}</td>
                                    </tr>
                                    <tr style={{ fontSize: "14px" }}>
                                        <td>Ngày tháng năm sinh:</td>
                                        <td>{teacherShow.Dob}</td>
                                    </tr>
                                    <tr style={{ fontSize: "14px" }}>
                                        <td>Dân tộc:</td>
                                        <td>{teacherShow.Ethnic}</td>
                                    </tr>
                                    <tr style={{ fontSize: "14px" }}>
                                        <td>Email:</td>
                                        <td>{teacherShow.Email}</td>
                                    </tr>
                                    <tr style={{ fontSize: "14px" }}>
                                        <td>Địa chỉ:</td>
                                        <td>{teacherShow.Address}</td>
                                    </tr>
                                    <tr style={{ fontSize: "14px" }}>
                                        <td>Số điện thoại:</td>
                                        <td>{teacherShow.PhoneNum}</td>
                                    </tr>
                                    <tr style={{ fontSize: "14px" }}>
                                        <td>Tình trạng làm việc:</td>
                                        <td>
                                            {teacherShow.Status === "1"
                                                ? "Đang làm"
                                                : "Nghỉ việc"}
                                        </td>
                                    </tr>
                                    <tr style={{ fontSize: "14px" }}>
                                        <td>Tổ chuyên môn:</td>
                                        <td>{teacherShow.TeamId}</td>
                                    </tr>
                                    {teacherShow.Leader ||
                                        (teacherShow.ViceLeader && (
                                            <tr style={{ fontSize: "14px" }}>
                                                <td>Chức vụ:</td>
                                                <td>
                                                    {teacherShow.Leader
                                                        ? "Tổ trưởng"
                                                        : "Tổ phó"}
                                                </td>
                                            </tr>
                                        ))}
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
