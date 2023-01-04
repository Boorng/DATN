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

const cx = classNames.bind(styles);

function AddEditTeacher({ action, teacherShow, show, showAdd, getTeacher }) {
    const [teacher, setTeacher] = useState({
        id: "",
        fullName: "",
        age: 0,
        gender: "Nam",
        ethnic: "Kinh",
        birthDay: "1999-01-01",
        email: "",
        address: "",
        phone: "",
        level: 1,
        status: 1,
    });

    useEffect(() => {
        if (teacherShow) {
            const arr = teacherShow.birthDay.split("/");
            const birthDay = `${arr[2]}-${arr[1]}-${arr[0]}`;
            setTeacher({ ...teacherShow, birthDay: birthDay });
        }
    }, []);

    const handleOnClickTeacher = async () => {
        const arr = Object.values(teacher);
        const check = arr.filter((item) => item === 0 || item === "");
        if (check.length === 0) {
            if (teacherShow) {
                const response = await updateTeacherAPI(teacher);
                if (response.message === "Success") {
                    toast.info("Cập nhật thông tin giáo viên thành công");
                    await getTeacher();
                    showAdd();
                } else {
                    toast.error(
                        "Cập nhật thông tin thất bại do thông tin nhập không đúng định dạng"
                    );
                }
            } else {
                const response = await postTeacherAPI(teacher);
                if (response.message === "Success") {
                    toast.success("Thêm giáo viên thành công");
                    await getTeacher();
                    showAdd();
                } else {
                    toast.error(
                        "Thêm thông tin thất bại do nhập thông tin không đúng định dạng hoặc ID đã tồn tại"
                    );
                }
            }
        } else {
            toast.error("Thêm thất bại do chưa nhập đủ thông tin");
        }
    };

    const handleOnChange = (e) => {
        if (e.target.value.trim() !== "") {
            setTeacher({
                ...teacher,
                [e.target.name]:
                    e.target.name === "level"
                        ? +e.target.value
                        : e.target.value,
            });
        } else {
            setTeacher({
                ...teacher,
                [e.target.name]: "",
            });
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
                                giáo viên
                            </h3>
                        }
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form className={cx("form")}>
                        <Row className="mb-3">
                            <Col xs={3} className={cx("form-image")}>
                                {teacher.avatar ? (
                                    <Image
                                        src={URL.createObjectURL(
                                            teacher.avatar
                                        )}
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
                                                onChange={handleOnChange}
                                                value={teacher.id}
                                                name="id"
                                            />
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
                                                onChange={handleOnChange}
                                                value={teacher.fullName}
                                                name="fullName"
                                            />
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
                                                onChange={handleOnChange}
                                                name="gender"
                                                value={teacher.gender}
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
                                                onChange={handleOnChange}
                                                value={teacher.age}
                                                name="age"
                                            />
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
                                            <Form.Select
                                                className={cx("form-select")}
                                                onChange={handleOnChange}
                                                name="ethnic"
                                                value={teacher.ethnic}
                                            >
                                                <option value="Kinh">
                                                    Kinh
                                                </option>
                                            </Form.Select>
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
                                                onChange={handleOnChange}
                                                name="birthDay"
                                                value={teacher.birthDay}
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
                                                onChange={handleOnChange}
                                                name="level"
                                                value={teacher.level}
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
                                            onChange={handleOnChange}
                                            name="email"
                                            value={teacher.email}
                                        />
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
                                        onChange={handleOnChange}
                                        name="address"
                                        value={teacher.address}
                                    />
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
                                            onChange={handleOnChange}
                                            name="phone"
                                            value={teacher.phone}
                                        />
                                    </Form.Group>
                                </Row>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="primary"
                        onClick={handleOnClickTeacher}
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
            </Modal>
        </div>
    );
}

export default memo(AddEditTeacher);
