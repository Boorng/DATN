import * as classNames from "classnames/bind";
import "react-toastify/dist/ReactToastify.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { memo, useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";

import styles from "./AddEditTeacher.module.scss";
import { Modal } from "react-bootstrap";
import { addTeacher, editTeacher } from "../../../../slices/teacherSlice";

const cx = classNames.bind(styles);

function AddEditTeacher({ action, teacherShow, show, showAdd }) {
    const dispatch = useDispatch();

    const [teacher, setTeacher] = useState({
        Id: "",
        Name: "",
        Age: 0,
        Gender: "Nam",
        Ethnic: "kinh",
        Dob: "1999-01-01",
        Email: "",
        Address: "",
        PhoneNum: "",
        Status: "1",
        Level: "1",
        Leader: false,
        ViceLeader: false,
        TeamId: "1",
    });

    useEffect(() => {
        if (teacherShow) {
            setTeacher(teacherShow);
        }
    }, []);

    const handleOnClickTeacher = async () => {
        const arr = Object.values(teacher);
        const check = arr.filter((item) => item === 0 || item === "");
        if (check.length === 0) {
            if (teacherShow) {
                dispatch(editTeacher(teacher));
                toast.info("Cập nhật thông tin giáo viên thành công");
            } else {
                dispatch(addTeacher(teacher));
                toast.success("Thêm giáo viên thành công");
            }
            showAdd();
        } else {
            toast.error("Thêm thất bại do chưa nhập đủ thông tin");
        }
    };

    const handleOnChange = (e) => {
        if (e.target.value.trim() !== "") {
            setTeacher({
                ...teacher,
                [e.target.name]: e.target.value,
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
                                            teacher.Avatar
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
                                                value={teacher.Id}
                                                name="Id"
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
                                                value={teacher.Name}
                                                name="Name"
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
                                                name="Gender"
                                                value={teacher.Gender}
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
                                                value={teacher.Age}
                                                name="Age"
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
                                                name="Ethnic"
                                                value={teacher.Ethnic}
                                            >
                                                <option value="kinh">
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
                                                name="Dob"
                                                value={teacher.Dob}
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
                                                name="Status"
                                                value={teacher.Status}
                                            >
                                                <option value="1">
                                                    Cử nhân
                                                </option>
                                                <option value="2">
                                                    Thạc sĩ
                                                </option>
                                                <option value="3">
                                                    Tiến sĩ
                                                </option>
                                                <option value="4">
                                                    Phó giáo sư
                                                </option>
                                                <option value="5">
                                                    Giáo sư
                                                </option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Form.Group className="mb-3">
                                    <Form.Label className={cx("form-label")}>
                                        Email
                                    </Form.Label>
                                    <Form.Control
                                        className={cx("form-control")}
                                        type="email"
                                        placeholder="Nhập email"
                                        required
                                        onChange={handleOnChange}
                                        name="Email"
                                        value={teacher.Email}
                                    />
                                </Form.Group>

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
                                        name="Address"
                                        value={teacher.Address}
                                    />
                                </Form.Group>

                                <Row>
                                    <Col xs={8}>
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
                                                name="PhoneNum"
                                                value={teacher.PhoneNum}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label
                                                className={cx("form-label")}
                                            >
                                                Tổ chuyên môn
                                            </Form.Label>
                                            <Form.Select
                                                className={cx("form-select")}
                                                onChange={handleOnChange}
                                                name="TeamId"
                                                value={teacher.TeamId}
                                            >
                                                <option value="1">
                                                    Khoa học tự nhiên
                                                </option>
                                                <option value="2">
                                                    Văn hóa xã hội
                                                </option>
                                                <option value="3">
                                                    Thể dục thể thao
                                                </option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
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
