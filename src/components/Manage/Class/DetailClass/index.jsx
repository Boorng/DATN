import * as classNames from "classnames/bind";
import Offcanvas from "react-bootstrap/Offcanvas";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

import styles from "./DetailClass.module.scss";
import { Col, Image, Row, Table } from "react-bootstrap";
import { FaUserAlt } from "react-icons/fa";

const cx = classNames.bind(styles);

function DetailClass({ studentShow, show, showDetail }) {
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
                        Chi tiết thông tin lớp học
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Row>
                        <Col xs={5}></Col>
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
                                <tbody></tbody>
                            </Table>
                        </Col>
                    </Row>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
}

export default DetailClass;
