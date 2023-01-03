import * as classNames from "classnames/bind";
import Offcanvas from "react-bootstrap/Offcanvas";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

import styles from "./DetailClass.module.scss";
import { Col, Image, Modal, Row, Table } from "react-bootstrap";
import { FaUserAlt } from "react-icons/fa";

const cx = classNames.bind(styles);

function DetailClass({ classShow, show, showDetail }) {
    return (
        <div>
            <Modal
                show={show}
                onHide={showDetail}
                dialogClassName={cx("modal")}
            >
                <Modal.Header closeButton>
                    <Modal.Title className={cx("modal-title")}>
                        Chi tiết thông tin lớp
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <Table responsive>
                                <thead>
                                    <tr style={{ width: "200px" }}>
                                        <th style={{ width: "200px" }}>
                                            Thông tin
                                        </th>
                                        <th>Nội dung</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr style={{ fontSize: "14px" }}>
                                        <td>ID Lớp:</td>
                                        <td>{classShow.id}</td>
                                    </tr>
                                    <tr style={{ fontSize: "14px" }}>
                                        <td>Tên Lớp:</td>
                                        <td>{classShow.name}</td>
                                    </tr>
                                    <tr style={{ fontSize: "14px" }}>
                                        <td>Khối:</td>
                                        <td>{classShow.grade}</td>
                                    </tr>
                                    <tr style={{ fontSize: "14px" }}>
                                        <td>Năm học:</td>
                                        <td>{classShow.academicYear}</td>
                                    </tr>
                                    <tr style={{ fontSize: "14px" }}>
                                        <td>Giáo viên chủ nhiệm:</td>
                                        <td>{classShow.headerTeacherName}</td>
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

export default DetailClass;
