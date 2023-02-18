import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import * as classNames from "classnames/bind";

import styles from "./AddEditSemester.module.scss";
import { toast } from "react-toastify";
import {
    postSemesterAPI,
    updateSemesterAPI,
} from "../../../../services/semesterService";
import { useFormik } from "formik";

const cx = classNames.bind(styles);

function AddEditSemester({ action, semesterShow, show, showAdd, getSemester }) {
    const validate = (values) => {
        const errors = {};

        if (!values.name) {
            errors.name = "Bạn chưa nhập tên học kỳ";
        }
        if (!values.schoolYear) {
            errors.schoolYear = "Bạn chưa nhập năm học";
        }

        return errors;
    };

    const validateDay = (day) => {
        const arr = day.split("/");
        return `${arr[2]}-${arr[1]}-${arr[0]}`;
    };

    const formik = useFormik({
        initialValues: {
            id: semesterShow ? semesterShow.id : null,
            name: semesterShow ? semesterShow.name : "",
            schoolYear: semesterShow ? semesterShow.schoolYear : "",
            timeStart: semesterShow
                ? validateDay(semesterShow.timeStart)
                : "1999-01-01",
            timeEnd: semesterShow
                ? validateDay(semesterShow.timeEnd)
                : "1999-01-01",
        },
        enableReinitialize: true,
        validate,
        onSubmit: async (values) => {
            if (semesterShow) {
                const response = await updateSemesterAPI(values);
                if (response.message === "Success") {
                    toast.info("Cập nhật thông tin học kỳ thành công");
                    await getSemester();
                    showAdd();
                }
            } else {
                const response = await postSemesterAPI(values);
                if (response.message === "Success") {
                    toast.success("Thêm học kỳ thành công");
                    await getSemester();
                    showAdd();
                } else {
                    toast.error(
                        "Thêm học kỳ thất bại do nhập thông tin không đúng định dạngi"
                    );
                }
            }
        },
    });

    return (
        <Modal show={show} onHide={showAdd} dialogClassName={cx("modal")}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {
                        <h3 className={cx("form-title")}>
                            {action === "add" ? "Thêm" : "Sửa"} thông tin học kỳ
                        </h3>
                    }
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className={cx("form")} onSubmit={formik.handleSubmit}>
                    <Row className="mb-3">
                        <Row className="mb-3">
                            <Col>
                                <Form.Group>
                                    <Form.Label className={cx("form-label")}>
                                        Tên học kỳ
                                    </Form.Label>
                                    <Form.Control
                                        className={cx("form-control")}
                                        type="text"
                                        placeholder="Nhập tên học kỳ"
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

                            <Col>
                                <Form.Group>
                                    <Form.Label className={cx("form-label")}>
                                        Năm học
                                    </Form.Label>
                                    <Form.Control
                                        className={cx("form-control")}
                                        type="text"
                                        placeholder="Nhập năm học"
                                        required
                                        onChange={formik.handleChange}
                                        value={formik.values.schoolYear}
                                        name="schoolYear"
                                    />
                                    {formik.errors.schoolYear ? (
                                        <div className={cx("error-message")}>
                                            {formik.errors.schoolYear}
                                        </div>
                                    ) : null}
                                </Form.Group>
                            </Col>
                        </Row>
                    </Row>

                    <Row className="mb-3">
                        <Row className="mb-3">
                            <Col>
                                <Form.Group>
                                    <Form.Label className={cx("form-label")}>
                                        Thời gian bắt đầu
                                    </Form.Label>
                                    <Form.Control
                                        className={cx("form-control")}
                                        type="date"
                                        onChange={formik.handleChange}
                                        name="timeStart"
                                        value={formik.values.timeStart}
                                    />
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Group>
                                    <Form.Label className={cx("form-label")}>
                                        Thời gian kết thúc
                                    </Form.Label>
                                    <Form.Control
                                        className={cx("form-control")}
                                        type="date"
                                        onChange={formik.handleChange}
                                        name="timeEnd"
                                        value={formik.values.timeEnd}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Row>
                    <Modal.Footer>
                        <Button
                            type="submit"
                            className={cx("button-add-semester")}
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

export default AddEditSemester;
