import * as classNames from "classnames/bind";
import Offcanvas from "react-bootstrap/Offcanvas";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

import styles from "./DetailTeacher.module.scss";
import { Col, Image, Row, Table } from "react-bootstrap";
import { FaUserAlt } from "react-icons/fa";

const cx = classNames.bind(styles);

function DetailTeacher({ teacherShow, show, showDetail }) {
    return (
        <div>
            <Offcanvas
                show={show}
                onHide={showDetail}
                placement="end"
                style={{ width: "1200px", padding: "0 20px" }}
            >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                        Chi tiết thông tin giáo viên
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
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
                                    <tr style={{}}>
                                        <th style={{ width: "200px" }}>
                                            Thông tin
                                        </th>
                                        <th>Nội dung</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr style={{ fontSize: "14px" }}>
                                        <td>ID học sinh:</td>
                                        <td>{teacherShow.id}</td>
                                    </tr>
                                    <tr style={{ fontSize: "14px" }}>
                                        <td>Tên học sinh:</td>
                                        <td>{teacherShow.name}</td>
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
                                        <td>{teacherShow.dob}</td>
                                    </tr>
                                    <tr style={{ fontSize: "14px" }}>
                                        <td>Dân tộc:</td>
                                        <td>{teacherShow.name}</td>
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
                                        <td>Tình trạng làm việc:</td>
                                        <td>{teacherShow.Status}</td>
                                    </tr>
                                    <tr style={{ fontSize: "14px" }}>
                                        <td>:</td>
                                        <td>{teacherShow.Leader}</td>
                                    </tr>
                                    <tr style={{ fontSize: "14px" }}>
                                        <td>Số điện thoại:</td>
                                        <td>{teacherShow.ViceLeader}</td>
                                    </tr>
                                    <tr style={{ fontSize: "14px" }}>
                                        <td>Số điện thoại:</td>
                                        <td>{teacherShow.TeamId}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
}

export default DetailTeacher;
