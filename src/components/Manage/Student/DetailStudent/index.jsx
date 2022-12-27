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
                                    src={URL.createObjectURL(
                                        studentShow.avatar
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
                                        <td>ID học sinh:</td>
                                        <td>{studentShow.Id}</td>
                                    </tr>
                                    <tr style={{ fontSize: "14px" }}>
                                        <td>Tên học sinh:</td>
                                        <td>{studentShow.Name}</td>
                                    </tr>
                                    <tr style={{ fontSize: "14px" }}>
                                        <td>Tuổi:</td>
                                        <td>{studentShow.Age}</td>
                                    </tr>
                                    <tr style={{ fontSize: "14px" }}>
                                        <td>Giới tính:</td>
                                        <td>{studentShow.Gender}</td>
                                    </tr>
                                    <tr style={{ fontSize: "14px" }}>
                                        <td>Ngày tháng năm sinh:</td>
                                        <td>{studentShow.Dob}</td>
                                    </tr>
                                    <tr style={{ fontSize: "14px" }}>
                                        <td>Dân tộc:</td>
                                        <td>{studentShow.Ethnic}</td>
                                    </tr>
                                    <tr style={{ fontSize: "14px" }}>
                                        <td>Email:</td>
                                        <td>{studentShow.Email}</td>
                                    </tr>
                                    <tr style={{ fontSize: "14px" }}>
                                        <td>Địa chỉ:</td>
                                        <td>{studentShow.Address}</td>
                                    </tr>
                                    <tr style={{ fontSize: "14px" }}>
                                        <td>Số điện thoại:</td>
                                        <td>{studentShow.PhoneNum}</td>
                                    </tr>
                                    <tr style={{ fontSize: "14px" }}>
                                        <td>Tên bố:</td>
                                        <td>{studentShow.FatherName}</td>
                                    </tr>
                                    <tr style={{ fontSize: "14px" }}>
                                        <td>Nghề nghiệp:</td>
                                        <td>{studentShow.FatherCareer}</td>
                                    </tr>
                                    <tr style={{ fontSize: "14px" }}>
                                        <td>Số điện thoại:</td>
                                        <td>{studentShow.FatherPhone}</td>
                                    </tr>
                                    <tr style={{ fontSize: "14px" }}>
                                        <td>Tên mẹ:</td>
                                        <td>{studentShow.MotherName}</td>
                                    </tr>
                                    <tr style={{ fontSize: "14px" }}>
                                        <td>Nghề nghiệp:</td>
                                        <td>{studentShow.MotherCareer}</td>
                                    </tr>
                                    <tr style={{ fontSize: "14px" }}>
                                        <td>Số điện thoại:</td>
                                        <td>{studentShow.MotherPhone}</td>
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
