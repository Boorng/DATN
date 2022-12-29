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

import styles from "./AddEditStudent.module.scss";
import { addStudent, editStudent } from "../../../../slices/studentSlice";
import {
    postStudentAPI,
    updateStudentAPI,
} from "../../../../services/getRequest";
import { Modal } from "react-bootstrap";

const cx = classNames.bind(styles);

function AddEditStudent({ action, studentShow, show, showAdd }) {
    const dispatch = useDispatch();

    const [student, setStudent] = useState({
        id: "",
        fullName: "",
        age: 0,
        gender: "Nam",
        ethnic: "Kinh",
        birthDay: "1999-01-01",
        email: "",
        address: "",
        phone: "",
        fatherName: "",
        fatherPhone: "",
        fatherCareer: "",
        motherName: "",
        motherPhone: "",
        motherCareer: "",
        status: 1,
    });

    useEffect(() => {
        if (studentShow) {
            const arr = studentShow.birthDay.split("/");
            const birthDay = `${arr[2]}-${arr[1]}-${arr[0]}`;
            setStudent({ ...studentShow, birthDay: birthDay });
        }
    }, []);

    const handleOnClickStudent = async () => {
        console.log(student);
        const arr = Object.values(student);
        const check = arr.filter((item) => item === 0 || item === "");
        if (check.length === 0) {
            if (studentShow) {
                const response = await updateStudentAPI(student);
                if (response.message === "Success") {
                    dispatch(editStudent(student));
                    toast.info("Cập nhật thông tin học sinh thành công");
                }
            } else {
                const response = await postStudentAPI(student);
                if (response.message === "Success") {
                    dispatch(addStudent(student));
                    toast.success("Thêm học sinh thành công");
                } else {
                    toast.error("Thêm học sinh thất bại");
                }
            }
            showAdd();
        } else {
            toast.error("Thêm thất bại do chưa nhập đủ thông tin");
        }
    };

    const handleOnChange = (e) => {
        if (e.target.value.trim() !== "") {
            setStudent({
                ...student,
                [e.target.name]: e.target.value,
            });
        } else {
            setStudent({
                ...student,
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
                                sinh viên
                            </h3>
                        }
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className={cx("form")}>
                        <Row className="mb-3">
                            <Col xs={3} className={cx("form-image")}>
                                {student.Avatar ? (
                                    <Image
                                        src={URL.createObjectURL(
                                            student.Avatar
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
                                                ID học sinh
                                            </Form.Label>
                                            <Form.Control
                                                className={cx("form-control")}
                                                type="text"
                                                placeholder="Nhập ID học sinh"
                                                required
                                                onChange={handleOnChange}
                                                value={student.id}
                                                name="id"
                                                disabled={
                                                    studentShow ? true : false
                                                }
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col xs={6}>
                                        <Form.Group>
                                            <Form.Label
                                                className={cx("form-label")}
                                            >
                                                Tên học sinh
                                            </Form.Label>
                                            <Form.Control
                                                className={cx("form-control")}
                                                type="text"
                                                placeholder="Nhập tên học sinh"
                                                required
                                                onChange={handleOnChange}
                                                value={student.fullName}
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
                                                value={student.gender}
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
                                                value={student.age}
                                                name="age"
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row className="mb-3">
                                    <Col xs={5}>
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
                                                value={student.ethnic}
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
                                                value={student.birthDay}
                                            />
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
                                        name="email"
                                        disabled={studentShow ? true : false}
                                        value={student.email}
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
                                        name="address"
                                        value={student.address}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className={cx("form-label")}>
                                        Số điện thoại
                                    </Form.Label>
                                    <Form.Control
                                        className={cx("form-control")}
                                        type="text"
                                        placeholder="Nhập số điện thoại"
                                        required
                                        onChange={handleOnChange}
                                        name="phone"
                                        value={student.phone}
                                    />
                                </Form.Group>

                                <Row className="mb-3">
                                    <Col xs={6}>
                                        <Form.Group>
                                            <Form.Label
                                                className={cx("form-label")}
                                            >
                                                Họ và tên bố
                                            </Form.Label>
                                            <Form.Control
                                                className={cx("form-control")}
                                                type="text"
                                                placeholder="Nhập tên bố"
                                                required
                                                onChange={handleOnChange}
                                                name="fatherName"
                                                value={student.fatherName}
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col xs={2}>
                                        <Form.Group>
                                            <Form.Label
                                                className={cx("form-label")}
                                            >
                                                Số điện thoại
                                            </Form.Label>
                                            <Form.Control
                                                className={cx("form-control")}
                                                type="text"
                                                placeholder="Nhập tuổi bố"
                                                required
                                                onChange={handleOnChange}
                                                name="fatherPhone"
                                                value={student.fatherPhone}
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col>
                                        <Form.Group>
                                            <Form.Label
                                                className={cx("form-label")}
                                            >
                                                Nghề nghiệp
                                            </Form.Label>
                                            <Form.Control
                                                className={cx("form-control")}
                                                type="text"
                                                placeholder="Nhập nghề nghiệp bố"
                                                required
                                                onChange={handleOnChange}
                                                name="fatherCareer"
                                                value={student.fatherCareer}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row className="mb-3">
                                    <Col xs={6}>
                                        <Form.Group>
                                            <Form.Label
                                                className={cx("form-label")}
                                            >
                                                Họ và tên mẹ
                                            </Form.Label>
                                            <Form.Control
                                                className={cx("form-control")}
                                                type="text"
                                                placeholder="Nhập tên mẹ"
                                                required
                                                onChange={handleOnChange}
                                                name="motherName"
                                                value={student.motherName}
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col xs={2}>
                                        <Form.Group>
                                            <Form.Label
                                                className={cx("form-label")}
                                            >
                                                Số điện thoại
                                            </Form.Label>
                                            <Form.Control
                                                className={cx("form-control")}
                                                type="text"
                                                placeholder="Nhập tuổi mẹ"
                                                required
                                                onChange={handleOnChange}
                                                name="motherPhone"
                                                value={student.motherPhone}
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col>
                                        <Form.Group>
                                            <Form.Label
                                                className={cx("form-label")}
                                            >
                                                Nghề nghiệp
                                            </Form.Label>
                                            <Form.Control
                                                className={cx("form-control")}
                                                type="text"
                                                placeholder="Nhập nghề nghiệp mẹ"
                                                required
                                                onChange={handleOnChange}
                                                name="motherCareer"
                                                value={student.motherCareer}
                                            />
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
                        onClick={handleOnClickStudent}
                        className={cx("button-add-student")}
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

export default memo(AddEditStudent);
