import * as classNames from "classnames/bind";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
    addConductAPI,
    getConductByStudentIdAPI,
    updateConductAPI,
} from "../../../../../services/conductService";

import styles from "./EditConductTeacher.module.scss";

const cx = classNames.bind(styles);

function EditConductTeacher() {
    const { semesterId, studentId } = useParams();

    const [conduct, setConduct] = useState({});

    const getConduct = async () => {
        const resAPI = await getConductByStudentIdAPI(studentId, semesterId);
        if (resAPI != null) {
            setConduct(resAPI);
        }
    };

    useEffect(() => {
        getConduct();
    }, [studentId, semesterId]);

    const validate = (values) => {
        const errors = {};
        if (!values.evaluate) {
            errors.email = "Bạn chưa nhập hạnh kiểm";
        }
        if (!values.comment) {
            errors.password = "Bạn chưa nhập nhận xét";
        }

        return errors;
    };

    const formik = useFormik({
        initialValues: {
            evaluate: conduct.hasOwnProperty("evaluate")
                ? conduct.evaluate
                : "",
            comment: conduct.hasOwnProperty("comment") ? conduct.comment : "",
        },
        enableReinitialize: true,
        validate,
        onSubmit: async (values) => {
            if (conduct) {
                const conductEdit = {
                    id: conduct.id,
                    evaluate: values.evaluate,
                    comment: values.comment,
                    semesterId: semesterId,
                    studentId: studentId,
                };

                const res = await updateConductAPI(conductEdit);

                if (res.message === "Success") {
                    toast.success("Cập nhật đánh giá hạnh kiểm thành công");
                } else {
                    toast.error("Cập nhật thất bại");
                }
            } else {
                const conductModel = {
                    evaluate: values.evaluate,
                    comment: values.comment,
                    semesterId: semesterId,
                    studentId: studentId,
                };

                const res = await addConductAPI(conductModel);

                if (res.message === "Success") {
                    toast.success("Cập nhật đánh giá hạnh kiểm thành công");
                } else {
                    toast.error("Cập nhật thất bại");
                }
            }
        },
    });

    return (
        <div className={cx("edit-conduct-teacher")}>
            <Form onSubmit={formik.handleSubmit}>
                <Row className="mb-3">
                    <Col xs={3}>
                        <Form.Group>
                            <Form.Label className={cx("form-label")}>
                                Hạnh kiểm:
                            </Form.Label>
                            <Form.Control
                                className={cx("form-control")}
                                type="text"
                                placeholder="Nhập đánh giá hạnh kiểm"
                                required
                                onChange={formik.handleChange}
                                value={formik.values.evaluate}
                                name="evaluate"
                            />
                        </Form.Group>
                        {formik.errors.email ? (
                            <div className={cx("error-message")}>
                                {formik.errors.evaluate}
                            </div>
                        ) : null}
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Form.Group>
                            <Form.Label className={cx("form-label")}>
                                Nhận xét:
                            </Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={12}
                                className={cx("form-control")}
                                type="text"
                                placeholder="Nhập nhận xét"
                                required
                                onChange={formik.handleChange}
                                value={formik.values.comment}
                                name="comment"
                            />
                            {formik.errors.email ? (
                                <div className={cx("error-message")}>
                                    {formik.errors.comment}
                                </div>
                            ) : null}
                        </Form.Group>
                    </Col>
                </Row>
                <Button
                    type="submit"
                    variant="success"
                    className={cx("button-submit")}
                >
                    Cập nhật
                </Button>
            </Form>
        </div>
    );
}

export default EditConductTeacher;
