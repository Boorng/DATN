import * as classNames from "classnames/bind";
import { memo, useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import {
    postSubjectAPI,
    updateSubjectAPI,
} from "../../../../services/subjectService";

import styles from "./AddEditSubject.module.scss";

const cx = classNames.bind(styles);

function AddEditSubject({
    action,
    subjectShow,
    show,
    showAdd,
    gradeName,
    getSubject,
}) {
    const [subject, setSubject] = useState({
        name: "",
        grade: gradeName,
    });

    useEffect(() => {
        if (subjectShow) {
            setSubject(subjectShow);
        }
    }, [subjectShow]);

    const handleOnChange = (e) => {
        if (e.target.value.trim() !== "") {
            setSubject({
                ...subject,
                [e.target.name]: e.target.value,
            });
        } else {
            setSubject({
                ...subject,
                [e.target.name]: "",
            });
        }
    };

    const handleOnClickClass = async () => {
        if (subject.name.length > 0) {
            if (subjectShow) {
                const response = await updateSubjectAPI(subject);
                if (response.message === "Success") {
                    toast.info("Cập nhật thông tin môn học");
                    await getSubject();
                    showAdd();
                } else {
                    toast.info(
                        "Cập nhật thông tin môn thất bại do nhập thông tin không hợp lệ"
                    );
                }
            } else {
                const response = await postSubjectAPI(subject);
                if (response.message === "Success") {
                    toast.success("Thêm môn  thành công");
                    await getSubject();
                    showAdd();
                } else {
                    toast.error(
                        "Thêm môn thất bại do có thông tin nhập không hợp lệ"
                    );
                }
            }
        } else {
            toast.error("Thêm thất bại do chưa nhập đủ thông tin");
        }
    };

    return (
        <Modal show={show} onHide={showAdd} dialogClassName={cx("modal")}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {
                        <h3 className={cx("form-title")}>
                            {action === "add" ? "Thêm" : "Sửa"} thông tin môn
                            học
                        </h3>
                    }
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className={cx("form")}>
                    <Row className="mb-3">
                        <Row className="mb-3">
                            <Col>
                                <Form.Group
                                    className={cx("manage-student-item-7")}
                                >
                                    <Form.Label className={cx("form-label")}>
                                        Tên môn học
                                    </Form.Label>
                                    <Form.Control
                                        className={cx("form-control")}
                                        type="text"
                                        placeholder="Nhập tên môn học"
                                        required
                                        onChange={handleOnChange}
                                        value={subject.name}
                                        name="name"
                                    />
                                </Form.Group>
                            </Col>

                            <Col xs={4}>
                                <Form.Group>
                                    <Form.Label className={cx("form-label")}>
                                        Khối
                                    </Form.Label>
                                    <Form.Select
                                        className={cx("form-select")}
                                        onChange={handleOnChange}
                                        name="grade"
                                        value={subject.grade}
                                        disabled
                                    >
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    onClick={handleOnClickClass}
                    className={cx("button-add-subject")}
                >
                    {action === "add" ? "Thêm" : "Sửa"}
                </Button>
                <Button
                    variant="secondary"
                    className={cx("button-back")}
                    onClick={showAdd}
                >
                    Quay lại
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default memo(AddEditSubject);
