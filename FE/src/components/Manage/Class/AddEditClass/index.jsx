import * as classNames from "classnames/bind";
import "react-toastify/dist/ReactToastify.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { toast } from "react-toastify";
import { memo, useEffect, useState } from "react";

import styles from "./AddEditClass.module.scss";
import { Modal } from "react-bootstrap";
import { getTeacherNoLeaveAPI } from "../../../../services/teacherService";
import {
    postClassAPI,
    updateClassAPI,
} from "../../../../services/classService";
import { useFormik } from "formik";

const cx = classNames.bind(styles);

function AddEditClass({
    action,
    classShow,
    show,
    showAdd,
    gradeName,
    getClass,
}) {
    const [listTeacher, setListTeacher] = useState([]);

    const getTeacher = async () => {
        const data = await getTeacherNoLeaveAPI();
        setListTeacher(data);
    };

    useEffect(() => {
        getTeacher();
    }, []);

    const validate = (values) => {
        const errors = {};
        if (!values.id) {
            errors.id = "Bạn chưa nhập ID";
        }
        if (!values.name) {
            errors.name = "Bạn chưa nhập tên";
        }
        if (!values.academicYear) {
            errors.academicYear = "Bạn chưa nhập năm học";
        }
        if (!values.headerTeacherId) {
            errors.headerTeacherId = "Bạn chưa chọn giáo viên chủ nhiệm";
        }

        return errors;
    };

    const formik = useFormik({
        initialValues: {
            id: classShow ? classShow.id : "",
            name: classShow ? classShow.name : "",
            grade: gradeName,
            academicYear: classShow ? classShow.academicYear : "",
            headerTeacherId: classShow ? classShow.headerTeacherId : "",
        },
        enableReinitialize: true,
        validate,
        onSubmit: async (values) => {
            if (classShow) {
                const response = await updateClassAPI(values);
                if (response.message === "Success") {
                    toast.info("Cập nhật thông tin lớp thành công");
                    await getClass();
                    showAdd();
                } else {
                    toast.info(
                        "Cập nhật thông tin lớp thất bại do nhập thông tin không hợp lệ"
                    );
                }
            } else {
                const response = await postClassAPI(values);
                if (response.message === "Success") {
                    toast.success("Thêm lớp thành công");
                    await getClass();
                    showAdd();
                } else {
                    toast.error(
                        "Thêm lớp thất bại do có thông tin nhập không hợp lệ"
                    );
                }
            }
        },
    });

    return (
        <Modal show={show} onHide={showAdd} dialogClassName={cx("modal")}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <h3 className={cx("form-title")}>
                        {action === "add" ? "Thêm" : "Sửa"} thông tin lớp
                    </h3>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className={cx("form")} onSubmit={formik.handleSubmit}>
                    <Row className="mb-3">
                        <Row className="mb-3">
                            <Col>
                                <Form.Group
                                    className={cx("manage-student-item-7")}
                                >
                                    <Form.Label className={cx("form-label")}>
                                        ID lớp
                                    </Form.Label>
                                    <Form.Control
                                        className={cx("form-control")}
                                        type="text"
                                        placeholder="Nhập ID lớp"
                                        required
                                        onChange={formik.handleChange}
                                        value={formik.values.id}
                                        name="id"
                                        disabled={classShow ? true : false}
                                    />
                                </Form.Group>
                                {formik.errors.id ? (
                                    <div className={cx("error-message")}>
                                        {formik.errors.id}
                                    </div>
                                ) : null}
                            </Col>

                            <Col>
                                <Form.Group
                                    className={cx("manage-student-item-7")}
                                >
                                    <Form.Label className={cx("form-label")}>
                                        Tên lớp
                                    </Form.Label>
                                    <Form.Control
                                        className={cx("form-control")}
                                        type="text"
                                        placeholder="Nhập tên lớp"
                                        required
                                        onChange={formik.handleChange}
                                        value={formik.values.name}
                                        name="name"
                                    />
                                    {formik.errors.name ? (
                                        <div className={cx("error-message")}>
                                            {formik.errors.name}
                                        </div>
                                    ) : null}
                                </Form.Group>
                            </Col>

                            <Col xs={4}>
                                <Form.Group>
                                    <Form.Label className={cx("form-label")}>
                                        Khối
                                    </Form.Label>
                                    <Form.Select
                                        className={cx("form-select")}
                                        onChange={formik.handleChange}
                                        name="grade"
                                        value={formik.values.grade}
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
                                    <Form.Label className={cx("form-label")}>
                                        Giáo viên chủ nhiệm
                                    </Form.Label>
                                    <Form.Select
                                        className={cx("form-select")}
                                        onChange={formik.handleChange}
                                        name="headerTeacherId"
                                        value={formik.values.headerTeacherId}
                                    >
                                        <option value="">
                                            --- Chọn giáo viên chủ nhiệm ---
                                        </option>
                                        {listTeacher.map((item) => {
                                            return (
                                                <option value={item.id}>
                                                    {item.id} - {item.fullName}
                                                </option>
                                            );
                                        })}
                                    </Form.Select>
                                    {formik.errors.headerTeacherId ? (
                                        <div className={cx("error-message")}>
                                            {formik.errors.headerTeacherId}
                                        </div>
                                    ) : null}
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label className={cx("form-label")}>
                                        Năm học
                                    </Form.Label>
                                    <Form.Control
                                        className={cx("form-control")}
                                        type="text"
                                        placeholder="Nhập năm học"
                                        required
                                        onChange={formik.handleChange}
                                        name="academicYear"
                                        value={formik.values.academicYear}
                                    />
                                    {formik.errors.academicYear ? (
                                        <div className={cx("error-message")}>
                                            {formik.errors.academicYear}
                                        </div>
                                    ) : null}
                                </Form.Group>
                            </Col>
                        </Row>
                    </Row>
                    <Modal.Footer>
                        <Button
                            type="submit"
                            className={cx("button-add-class")}
                        >
                            {action === "add" ? "Thêm" : "Sửa"}
                        </Button>
                        <Button
                            type="button"
                            variant="secondary"
                            className={cx("button-back")}
                            onClick={showAdd}
                        >
                            Quay lại
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default memo(AddEditClass);
