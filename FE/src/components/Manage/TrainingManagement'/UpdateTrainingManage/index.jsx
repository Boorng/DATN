import {
    Button,
    Col,
    Form,
    Modal,
    Offcanvas,
    Row,
    Table,
} from "react-bootstrap";
import * as classNames from "classnames/bind";

import styles from "./UpdateTrainingManage.module.scss";
import { useState } from "react";
import AdđById from "./AddById";
import AddByFile from "./AddByFile";
import { read, utils } from "xlsx";

const cx = classNames.bind(styles);

function UpdateTrainingManage({ classShow, show, showEdit }) {
    const listClass = [
        "Nguyễn Quang Thu Phương 1",
        "Nguyễn Quang Thu Phương 2",
        "Nguyễn Quang Thu Phương 3",
    ];

    const [listAdd, setListAdd] = useState([]);
    const [fileName, setFileName] = useState("");
    const [showAddId, setShowAddId] = useState(false);
    const [showAddFile, setShowAddFile] = useState(false);

    const handleAddByImport = ($event) => {
        const files = $event.target.files;

        if (files.length) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                const wb = read(event.target.result);
                const sheets = wb.SheetNames;

                if (sheets.length) {
                    const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
                    setListAdd(rows);
                    setShowAddFile(true);
                    setFileName(file.name);
                }
            };
            reader.readAsArrayBuffer(file);
        }
    };

    const showAddById = () => {
        setShowAddId(!showAddId);
    };

    const showAddByFile = () => {
        setShowAddFile(!showAddFile);
    };

    return (
        <Offcanvas
            show={show}
            onHide={showEdit}
            style={{ width: "1000px", padding: "15px 20px" }}
            placement="end"
        >
            <Offcanvas.Header closeButton>
                <Offcanvas.Title className={cx("canvas-title")}>
                    Cập nhật thông tin lớp {classShow.Name}
                </Offcanvas.Title>
            </Offcanvas.Header>
            <Modal.Body>
                <Row className="ms-3">
                    <Col>
                        <span>Lớp: {classShow.Name}</span>
                    </Col>
                    <Col className={cx("select-teacher")}>
                        <span>Giáo viên chủ nhiệm: </span>
                        <Form.Select className={cx("form-select")}>
                            <option>Nguyễn Quang Thu Phương 1</option>
                            <option>Nguyễn Quang Thu Phương 2</option>
                            <option>Nguyễn Quang Thu Phương 3</option>
                        </Form.Select>
                    </Col>
                </Row>
                <Row className="mb-5 mt-4 ms-3">
                    <span>Sĩ số: {classShow.NumberStudent}</span>
                </Row>
                <Row className={cx("wrap-button-find")}>
                    <Col className={cx("find-student")}>
                        <span className={cx("find-student-title")}>
                            Tìm kiếm:
                        </span>
                        <Form.Control
                            className={cx("form-control")}
                            placeholder="Nhập tên/ID của học sinh tìm kiếm"
                        ></Form.Control>
                    </Col>
                    <Col className={cx("list-button")}>
                        <Button
                            className={cx("button-add-byid")}
                            onClick={showAddById}
                        >
                            Thêm bằng ID
                        </Button>
                        <input
                            type="file"
                            name="file"
                            className={cx("custom-file-input")}
                            id="inputGroupFile"
                            required
                            hidden
                            onChange={handleAddByImport}
                            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                        />
                        <label
                            className={cx("custom-file-label")}
                            htmlFor="inputGroupFile"
                        >
                            Thêm bằng file
                        </label>
                    </Col>
                </Row>
                <Table striped hover>
                    <thead>
                        <th className={cx("table-head")}>ID</th>
                        <th className={cx("table-head")}>Họ và tên</th>
                        <th className={cx("table-head")}>
                            Ngày tháng năm sinh
                        </th>
                        <th className={cx("table-head")}>Tình trạng học tập</th>
                        <th className={cx("table-head")} s></th>
                    </thead>
                    <tbody>
                        {classShow.ListStudent.map((stu) => {
                            return (
                                <tr>
                                    <td className={cx("table-body")}>
                                        {stu.Id}
                                    </td>
                                    <td className={cx("table-body")}>
                                        {stu.Name}
                                    </td>
                                    <td className={cx("table-body")}>
                                        {stu.Dob}
                                    </td>
                                    <td className={cx("table-body")}>
                                        {stu.Status === "1"
                                            ? "Đang học"
                                            : "Nghỉ học"}
                                    </td>
                                    <td>
                                        <Button
                                            className={cx(
                                                "button-change-class"
                                            )}
                                        >
                                            Chuyển lớp
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
                {showAddId && (
                    <AdđById show={showAddId} showAddById={showAddById} />
                )}
                {showAddFile && (
                    <AddByFile
                        show={showAddFile}
                        showAddByFile={showAddByFile}
                        listAdd={listAdd}
                        fileName={fileName}
                    />
                )}
            </Modal.Body>
        </Offcanvas>
    );
}

export default UpdateTrainingManage;
