import * as classNames from "classnames/bind";
import "react-toastify/dist/ReactToastify.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { memo, useEffect, useState } from "react";

import styles from "./AddEditClass.module.scss";
import { addClass, editClass } from "../../../../slices/classSlice";
import { Modal, ModalFooter } from "react-bootstrap";
import { getTeacherAPI } from "../../../../services/teacherService";
import {
    postClassAPI,
    updateClassAPI,
} from "../../../../services/classService";

const cx = classNames.bind(styles);

function AddEditClass({ action, classShow, show, showAdd, gradeName }) {
    const dispatch = useDispatch();

    const [classes, setClasses] = useState({
        name: "",
        grade: gradeName,
        academicYear: "",
        headerTeacherId: "",
        countStudent: 0,
    });

    const [listTeacher, setListTeacher] = useState([]);

    const getTeacher = async () => {
        const data = await getTeacherAPI();
        setListTeacher(data);
    };

    useEffect(() => {
        getTeacher();
    }, []);

    useEffect(() => {
        if (classShow) {
            setClasses(classShow);
        }
    }, [classShow]);

    const handleOnClickClass = async () => {
        const arr = Object.values(classes);
        const check = arr.filter((item) => item === "");
        if (check.length === 0) {
            if (classShow) {
                const response = await updateClassAPI(classes);
                if (response.message === "Success") {
                    dispatch(editClass(classes));
                    toast.info("Cập nhật thông tin lớp thành công");
                    showAdd();
                } else {
                    toast.info(
                        "Cập nhật thông tin lớp thất bại do nhập thông tin không hợp lệ"
                    );
                }
            } else {
                const response = await postClassAPI(classes);
                if (response.message === "Success") {
                    dispatch(addClass(classes));
                    toast.success("Thêm lớp thành công");
                    showAdd();
                } else {
                    toast.error(
                        "Thêm lớp thất bại do có thông tin nhập không hợp lệ"
                    );
                }
            }
        } else {
            toast.error("Thêm thất bại do chưa nhập đủ thông tin");
        }
    };

    const handleOnChange = (e) => {
        if (e.target.value.trim() !== "") {
            if (e.target.name === "headerTeacherId") {
                setClasses({
                    ...classes,
                    [e.target.name]: e.target.value,
                    headerTeacherName: listTeacher.find(
                        (tc) => tc.id === e.target.value
                    ).fullName,
                });
            } else {
                setClasses({
                    ...classes,
                    [e.target.name]: e.target.value,
                });
            }
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
                                            value={classes.name}
                                            name="name"
                                        />
                                    </Form.Group>
                                </Col>

                                <Col xs={4}>
                                    <Form.Group>
                                        <Form.Label
                                            className={cx("form-label")}
                                        >
                                            Khối
                                        </Form.Label>
                                        <Form.Select
                                            className={cx("form-select")}
                                            onChange={handleOnChange}
                                            name="grade"
                                            value={classes.grade}
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

                            <Row>
                                <Col>
                                    <Form.Group>
                                        <Form.Label
                                            className={cx("form-label")}
                                        >
                                            Giáo viên chủ nhiệm
                                        </Form.Label>
                                        <Form.Select
                                            className={cx("form-select")}
                                            onChange={handleOnChange}
                                            name="headerTeacherId"
                                            value={classes.headerTeacherId}
                                        >
                                            <option value="">
                                                --- Chọn giáo viên chủ nhiệm ---
                                            </option>
                                            {listTeacher.map((item) => {
                                                return (
                                                    <option value={item.id}>
                                                        {item.fullName}
                                                    </option>
                                                );
                                            })}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label
                                            className={cx("form-label")}
                                        >
                                            Năm học
                                        </Form.Label>
                                        <Form.Control
                                            className={cx("form-control")}
                                            type="text"
                                            placeholder="Nhập năm học"
                                            required
                                            onChange={handleOnChange}
                                            name="academicYear"
                                            value={classes.academicYear}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Row>
                    </Form>
                </Modal.Body>
                <ModalFooter>
                    <Button
                        onClick={handleOnClickClass}
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
