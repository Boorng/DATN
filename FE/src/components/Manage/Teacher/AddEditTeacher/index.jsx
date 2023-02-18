import * as classNames from "classnames/bind";
import "react-toastify/dist/ReactToastify.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import { toast } from "react-toastify";
import { memo, useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";

import styles from "./AddEditTeacher.module.scss";
import { Modal } from "react-bootstrap";
import {
    postTeacherAPI,
    updateTeacherAPI,
} from "../../../../services/teacherService";
import { useFormik } from "formik";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../../../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const cx = classNames.bind(styles);

function AddEditTeacher({ action, teacherShow, show, showAdd, getTeacher }) {
    const validate = (values) => {
        const errors = {};
        if (!values.email) {
            errors.email = "Bạn chưa nhập email";
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
        ) {
            errors.email = "Email không hợp lệ";
        }

        if (!values.id) {
            errors.id = "Bạn chưa nhập ID";
        }
        if (!values.fullName) {
            errors.fullName = "Bạn chưa nhập tên";
        }
        if (!values.age) {
            errors.age = "Bạn chưa nhập tuổi";
        }
        if (!values.ethnic) {
            errors.ethnic = "Bạn chưa nhập dân tộc";
        }
        if (!values.address) {
            errors.address = "Bạn chưa nhập địa chỉ";
        }
        if (!values.phone) {
            errors.phone = "Bạn chưa nhập số điện thoại";
        }

        return errors;
    };

    const validateBirthday = (birthday) => {
        const arr = birthday.split("/");
        return `${arr[2]}-${arr[1]}-${arr[0]}`;
    };

    const formik = useFormik({
        initialValues: {
            id: teacherShow ? teacherShow.id : "",
            fullName: teacherShow ? teacherShow.fullName : "",
            age: teacherShow ? teacherShow.age : 0,
            gender: teacherShow ? teacherShow.gender : "Nam",
            ethnic: teacherShow ? teacherShow.ethnic : "",
            birthDay: teacherShow
                ? validateBirthday(teacherShow.birthDay)
                : "1999-01-01",
            email: teacherShow ? teacherShow.email : "",
            address: teacherShow ? teacherShow.address : "",
            phone: teacherShow ? teacherShow.phone : "",
            level: teacherShow ? teacherShow.level : 1,
            status: teacherShow ? teacherShow.status : 1,
        },
        enableReinitialize: true,
        validate,
        onSubmit: async (values) => {
            if (teacherShow) {
                const response = await updateTeacherAPI(values);
                if (response.message === "Success") {
                    toast.info("Cập nhật thông tin giáo viên thành công");
                    await getTeacher();
                    showAdd();
                }
            } else {
                const response = await postTeacherAPI(values);

                if (response.message === "Success") {
                    const res = await createUserWithEmailAndPassword(
                        auth,
                        values.email,
                        response.content
                    );

                    try {
                        await updateProfile(res.user, {
                            displayName: `${values.fullName} - ${values.id}`,
                        });

                        //create user on firestore
                        await setDoc(doc(db, "users", res.user.uid), {
                            uid: res.user.uid,
                            displayName: `${values.fullName} - ${values.id}`,
                            email: values.email,
                        });

                        //create empty user chats on firestore
                        await setDoc(doc(db, "userChats", res.user.uid), {});

                        toast.success("Thêm giáo viên thành công");
                        await getTeacher();
                        showAdd();
                    } catch (err) {
                        console.log(err);
                        toast.error("Thêm giáo viên thất bại do lỗi server");
                    }
                } else {
                    toast.error(
                        "Thêm thông tin thất bại do nhập thông tin không đúng định dạng hoặc ID đã tồn tại"
                    );
                }
            }
        },
    });

    return (
        <div>
            <Modal show={show} onHide={showAdd} dialogClassName={cx("modal")}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {
                            <h3 className={cx("form-title")}>
                                {action === "add" ? "Thêm" : "Sửa"} thông tin
                                giáo viên
                            </h3>
                        }
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form className={cx("form")} onSubmit={formik.handleSubmit}>
                        <Row className="mb-3">
                            <Col xs={3} className={cx("form-image")}>
                                {teacherShow && teacherShow.avatar ? (
                                    <Image
                                        src={teacherShow.avatar}
                                        alt="Avatar"
                                        className={cx("avatar-image")}
                                    />
                                ) : (
                                    <FaUserAlt className={cx("avatar-image")} />
                                )}
                            </Col>
                            <Col xs={9}>
                                <Row className="mb-3">
                                    <Col>
                                        <Form.Group>
                                            <Form.Label
                                                className={cx("form-label")}
                                            >
                                                ID giáo viên
                                            </Form.Label>
                                            <Form.Control
                                                className={cx("form-control")}
                                                type="text"
                                                placeholder="Nhập ID giáo viên"
                                                required
                                                onChange={formik.handleChange}
                                                value={formik.values.id}
                                                name="id"
                                                disabled={teacherShow && true}
                                            />
                                            {formik.errors.id ? (
                                                <div
                                                    className={cx(
                                                        "error-message"
                                                    )}
                                                >
                                                    {formik.errors.id}
                                                </div>
                                            ) : null}
                                        </Form.Group>
                                    </Col>

                                    <Col xs={6}>
                                        <Form.Group>
                                            <Form.Label
                                                className={cx("form-label")}
                                            >
                                                Tên giáo viên
                                            </Form.Label>
                                            <Form.Control
                                                className={cx("form-control")}
                                                type="text"
                                                placeholder="Nhập tên giáo viên"
                                                required
                                                onChange={formik.handleChange}
                                                value={formik.values.fullName}
                                                name="fullName"
                                            />
                                            {formik.errors.fullName ? (
                                                <div
                                                    className={cx(
                                                        "error-message"
                                                    )}
                                                >
                                                    {formik.errors.fullName}
                                                </div>
                                            ) : null}
                                        </Form.Group>
                                    </Col>

                                    <Col xs={2}>
                                        <Form.Group>
                                            <Form.Label
                                                className={cx("form-label")}
                                            >
                                                Giới tính
                                            </Form.Label>
                                            <Form.Select
                                                className={cx("form-select")}
                                                onChange={formik.handleChange}
                                                name="gender"
                                                value={formik.values.gender}
                                            >
                                                <option value="Nam">Nam</option>
                                                <option value="Nữ">Nữ</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>

                                    <Col>
                                        <Form.Group>
                                            <Form.Label
                                                className={cx("form-label")}
                                            >
                                                Tuổi
                                            </Form.Label>
                                            <Form.Control
                                                className={cx("form-control")}
                                                type="number"
                                                placeholder="Nhập tuổi"
                                                required
                                                onChange={formik.handleChange}
                                                value={formik.values.age}
                                                name="age"
                                            />
                                            {formik.errors.age ? (
                                                <div
                                                    className={cx(
                                                        "error-message"
                                                    )}
                                                >
                                                    {formik.errors.age}
                                                </div>
                                            ) : null}
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row className="mb-3">
                                    <Col xs={2}>
                                        <Form.Group>
                                            <Form.Label
                                                className={cx("form-label")}
                                            >
                                                Dân tộc
                                            </Form.Label>
                                            <Form.Control
                                                className={cx("form-control")}
                                                onChange={formik.handleChange}
                                                name="ethnic"
                                                value={formik.values.ethnic}
                                            />
                                            {formik.errors.ethnic ? (
                                                <div
                                                    className={cx(
                                                        "error-message"
                                                    )}
                                                >
                                                    {formik.errors.ethnic}
                                                </div>
                                            ) : null}
                                        </Form.Group>
                                    </Col>

                                    <Col>
                                        <Form.Group>
                                            <Form.Label
                                                className={cx("form-label")}
                                            >
                                                Ngày tháng năm sinh
                                            </Form.Label>
                                            <Form.Control
                                                className={cx("form-control")}
                                                type="date"
                                                onChange={formik.handleChange}
                                                name="birthDay"
                                                value={formik.values.birthDay}
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col>
                                        <Form.Group>
                                            <Form.Label
                                                className={cx("form-label")}
                                            >
                                                Chứng chỉ
                                            </Form.Label>
                                            <Form.Select
                                                className={cx("form-select")}
                                                onChange={formik.handleChange}
                                                name="level"
                                                value={formik.values.level}
                                            >
                                                <option value={1}>
                                                    Cử nhân
                                                </option>
                                                <option value={2}>
                                                    Thạc sĩ
                                                </option>
                                                <option value={3}>
                                                    Tiến sĩ
                                                </option>
                                                <option value={4}>
                                                    Phó giáo sư
                                                </option>
                                                <option value={5}>
                                                    Giáo sư
                                                </option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>

                                    <Col>
                                        <Form.Group>
                                            <Form.Label
                                                className={cx("form-label")}
                                            >
                                                Tình trạng làm việc
                                            </Form.Label>
                                            <Form.Select
                                                className={cx("form-select")}
                                                onChange={formik.handleChange}
                                                name="status"
                                                value={formik.values.status}
                                            >
                                                <option value={1}>
                                                    Đang làm
                                                </option>
                                                <option value={2}>
                                                    Nghỉ việc
                                                </option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Form.Group className="mb-3">
                                        <Form.Label
                                            className={cx("form-label")}
                                        >
                                            Email
                                        </Form.Label>
                                        <Form.Control
                                            className={cx("form-control")}
                                            type="email"
                                            placeholder="Nhập email"
                                            required
                                            onChange={formik.handleChange}
                                            name="email"
                                            value={formik.values.email}
                                            disabled={teacherShow && true}
                                        />
                                        {formik.errors.email ? (
                                            <div
                                                className={cx("error-message")}
                                            >
                                                {formik.errors.email}
                                            </div>
                                        ) : null}
                                    </Form.Group>
                                </Row>

                                <Form.Group className="mb-3">
                                    <Form.Label className={cx("form-label")}>
                                        Địa chỉ
                                    </Form.Label>
                                    <Form.Control
                                        className={cx("form-control")}
                                        type="text"
                                        placeholder="Nhập địa chỉ"
                                        required
                                        onChange={formik.handleChange}
                                        name="address"
                                        value={formik.values.address}
                                    />
                                    {formik.errors.address ? (
                                        <div className={cx("error-message")}>
                                            {formik.errors.address}
                                        </div>
                                    ) : null}
                                </Form.Group>

                                <Row>
                                    <Form.Group className="mb-3">
                                        <Form.Label
                                            className={cx("form-label")}
                                        >
                                            Số điện thoại
                                        </Form.Label>
                                        <Form.Control
                                            className={cx("form-control")}
                                            type="text"
                                            placeholder="Nhập số điện thoại"
                                            required
                                            onChange={formik.handleChange}
                                            name="phone"
                                            value={formik.values.phone}
                                        />
                                        {formik.errors.phone ? (
                                            <div
                                                className={cx("error-message")}
                                            >
                                                {formik.errors.phone}
                                            </div>
                                        ) : null}
                                    </Form.Group>
                                </Row>
                            </Col>
                        </Row>
                        <Modal.Footer>
                            <Button
                                type="submit"
                                variant="primary"
                                className={cx("button-add-teacher")}
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
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default memo(AddEditTeacher);
