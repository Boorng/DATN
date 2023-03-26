import * as classNames from "classnames/bind";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { postTeamAPI, updateTeamAPI } from "../../../../services/teamService";

import styles from "./AddEditTeam.module.scss";

const cx = classNames.bind(styles);

function AddEditTeam({ action, teamShow, show, showAdd, getTeam }) {
    const validate = (values) => {
        const errors = {};

        if (!values.name) {
            errors.name = "Bạn chưa nhập tên nhóm";
        }

        return errors;
    };

    const formik = useFormik({
        initialValues: {
            id: teamShow ? teamShow.id : "",
            name: teamShow ? teamShow.name : "",
            notification: teamShow ? teamShow.notification : "",
        },
        enableReinitialize: true,
        validate,
        onSubmit: async (values) => {
            if (teamShow) {
                const response = await updateTeamAPI(values);
                if (response.message === "Success") {
                    toast.info("Cập nhật thông tin nhóm thành công");
                    await getTeam();
                    showAdd();
                } else {
                    toast.error(
                        "Cập nhật thông tin thất bại do thông tin nhập không đúng định dạng"
                    );
                }
            } else {
                const response = await postTeamAPI(values);
                if (response.message === "Success") {
                    toast.success("Thêm nhóm thành công");
                    await getTeam();
                    showAdd();
                } else {
                    toast.error(
                        "Thêm thông tin thất bại do nhập thông tin không đúng định dạng"
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
                            {action === "add" ? "Thêm" : "Sửa"} thông tin tổ
                            chuyên môn
                        </h3>
                    }
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form className={cx("form")} onSubmit={formik.handleSubmit}>
                    <Row className="mb-3">
                        <Col xs={4}>
                            <Row className="mb-3">
                                <Col>
                                    <Form.Group>
                                        <Form.Label
                                            className={cx("form-label")}
                                        >
                                            Tên nhóm
                                        </Form.Label>
                                        <Form.Control
                                            className={cx("form-control")}
                                            type="text"
                                            placeholder="Nhập tên nhóm"
                                            required
                                            onChange={formik.handleChange}
                                            value={formik.values.name}
                                            name="name"
                                        />
                                        {formik.errors.name ? (
                                            <div
                                                className={cx("error-message")}
                                            >
                                                {formik.errors.name}
                                            </div>
                                        ) : null}
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col>
                            <Row className="mb-3">
                                <Col>
                                    <Form.Group>
                                        <Form.Label
                                            className={cx("form-label")}
                                        >
                                            Thông báo nhóm
                                        </Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={7}
                                            className={cx("form-control")}
                                            type="text"
                                            placeholder="Nhập thông báo nhóm"
                                            onChange={formik.handleChange}
                                            value={formik.values.notification}
                                            name="notification"
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Modal.Footer>
                        <Button
                            type="submit"
                            variant="primary"
                            className={cx("button-add-team")}
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

export default AddEditTeam;
