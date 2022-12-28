import * as classNames from "classnames/bind";
import "react-toastify/dist/ReactToastify.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { memo, useEffect, useState } from "react";

import styles from "./AddEditClass.module.scss";
import { addClass, editClass } from "../../../../slices/classSlice";
import { Modal, ModalFooter } from "react-bootstrap";

const cx = classNames.bind(styles);

function AddEditClass({ action, classShow, show, showAdd }) {
    const dispatch = useDispatch();

    const [classes, setClasses] = useState({
        Id: "",
        Name: "",
        Grade: "6",
        SchoolYear: "",
    });

    useEffect(() => {
        if (classShow) {
            setClasses(classShow);
        }
    }, [classShow]);

    const handleOnClickTeacher = async () => {
        console.log(classes);
        const arr = Object.values(classes);
        const check = arr.filter((item) => item === 0 || item === "");
        if (check.length === 0) {
            if (classShow) {
                dispatch(editClass(classes));
                toast.info("Cập nhật thông tin lớp thành công");
            } else {
                dispatch(addClass(classes));
                toast.success("Thêm lớp thành công");
            }
            showAdd();
        } else {
            toast.error("Thêm thất bại do chưa nhập đủ thông tin");
        }
    };

    const handleOnChange = (e) => {
        if (e.target.value.trim() !== "") {
            setClasses({
                ...classes,
                [e.target.name]: e.target.value,
            });
        } else {
            setClasses({
                ...classes,
                [e.target.name]: "",
            });
            console.log(classes);
        }
    };

    return (
        <div>
            <Modal show={show} onHide={showAdd} dialogClassName={cx("modal")}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {
                            <h3 className={cx("form-title")}>
                                {action === "add" ? "Thêm" : "Sửa"} thông tin
                                lớp
                            </h3>
                        }
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className={cx("form")}>
                        <Row className="mb-3">
                            <Row className="mb-3">
                                <Col>
                                    <Form.Group>
                                        <Form.Label
                                            className={cx("form-label")}
                                        >
                                            ID lớp
                                        </Form.Label>
                                        <Form.Control
                                            className={cx("form-control")}
                                            type="text"
                                            placeholder="Nhập ID lớp"
                                            required
                                            onChange={handleOnChange}
                                            value={classes.Id}
                                            name="Id"
                                        />
                                    </Form.Group>
                                </Col>

                                <Col xs={6}>
                                    <Form.Group
                                        className={cx("manage-student-item-7")}
                                    >
                                        <Form.Label
                                            className={cx("form-label")}
                                        >
                                            Tên lớp
                                        </Form.Label>
                                        <Form.Control
                                            className={cx("form-control")}
                                            type="text"
                                            placeholder="Nhập tên lớp"
                                            required
                                            onChange={handleOnChange}
                                            value={classes.Name}
                                            name="Name"
                                        />
                                    </Form.Group>
                                </Col>

                                <Col xs={2}>
                                    <Form.Group>
                                        <Form.Label
                                            className={cx("form-label")}
                                        >
                                            Khối
                                        </Form.Label>
                                        <Form.Select
                                            className={cx("form-select")}
                                            onChange={handleOnChange}
                                            name="Grade"
                                            value={classes.Grade}
                                        >
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Form.Group className="mb-3">
                                <Form.Label className={cx("form-label")}>
                                    Khóa học
                                </Form.Label>
                                <Form.Control
                                    className={cx("form-control")}
                                    type="text"
                                    placeholder="Nhập khóa"
                                    required
                                    onChange={handleOnChange}
                                    name="SchoolYear"
                                    value={classes.SchoolYear}
                                />
                            </Form.Group>
                        </Row>
                    </Form>
                </Modal.Body>
                <ModalFooter>
                    <Button
                        onClick={handleOnClickTeacher}
                        className={cx("button-add-class")}
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
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default memo(AddEditClass);
