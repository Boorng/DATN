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

const cx = classNames.bind(styles);

function AddEditClass({ action, studentShow, show, showAdd }) {
    const dispatch = useDispatch();

    const [classes, setClasses] = useState({
        id: "",
        name: "",
        grade: "6",
        schoolYear: "",
    });

    useEffect(() => {
        console.log(studentShow);
        if (studentShow) {
            setClasses(studentShow);
        }
    }, [studentShow]);

    const handleOnClickTeacher = async () => {
        console.log(classes);
        const arr = Object.values(classes);
        const check = arr.filter((item) => item === 0 || item === "");
        if (check.length === 0) {
            if (studentShow) {
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
            <Offcanvas
                show={show}
                onHide={showAdd}
                placement="end"
                style={{ width: "1200px", padding: "0 20px" }}
            >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                        {action === "add" && (
                            <h3 className={cx("form-title")}>Thêm lớp</h3>
                        )}
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Form className="mt-3">
                        <Row className="mb-3">
                            <Col xs={9}>
                                <Row className="mb-3">
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>ID lớp</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Nhập ID lớp"
                                                required
                                                onChange={handleOnChange}
                                                value={classes.id}
                                                name="id"
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col xs={6}>
                                        <Form.Group
                                            className={cx(
                                                "manage-student-item-7"
                                            )}
                                        >
                                            <Form.Label>Tên lớp</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Nhập tên lớp"
                                                required
                                                onChange={handleOnChange}
                                                value={classes.name}
                                                name="name"
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col xs={2}>
                                        <Form.Group>
                                            <Form.Label>Khối</Form.Label>
                                            <Form.Select
                                                onChange={handleOnChange}
                                                name="grade"
                                                value={classes.grade}
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
                                    <Form.Label>Khóa học</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Nhập khóa"
                                        required
                                        onChange={handleOnChange}
                                        name="schoolYear"
                                        value={classes.schoolYear}
                                    />
                                </Form.Group>

                                <Button
                                    onClick={handleOnClickTeacher}
                                    className={cx("button-add-class")}
                                >
                                    {action === "add" ? "Thêm" : "Sửa"}
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
}

export default memo(AddEditClass);
