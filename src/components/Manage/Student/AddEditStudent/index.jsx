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
import { postStudentAPI } from "../../../../services/getRequest";
import { Modal } from "react-bootstrap";

const cx = classNames.bind(styles);

function AddEditStudent({ action, studentShow, show, showAdd }) {
    const dispatch = useDispatch();

    const [student, setStudent] = useState({
        Id: "",
        Name: "",
        Age: 0,
        Gender: "Nam",
        Ethnic: "kinh",
        Dob: "1999-01-01",
        Email: "",
        Address: "",
        PhoneNum: "",
        FatherName: "",
        FatherPhone: 0,
        FatherCareer: "",
        MotherName: "",
        MotherPhone: 0,
        MotherCareer: "",
        Status: "1",
        GraduationDate: "1999-01-01",
    });

    useEffect(() => {
        if (studentShow) {
            setStudent(studentShow);
        }
    }, []);

    const handleOnClickStudent = async () => {
        console.log(student);
        const arr = Object.values(student);
        const check = arr.filter((item) => item === 0 || item === "");
        if (check.length === 0) {
            if (studentShow) {
                dispatch(editStudent(student));
                toast.info("Cập nhật thông tin học sinh thành công");
            } else {
                dispatch(addStudent(student));
                // await postStudentAPI(student);
                toast.success("Thêm học sinh thành công");
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
                                                value={student.Id}
                                                name="Id"
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
                                                value={student.Name}
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
                                                value={student.Gender}
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
                                                value={student.Age}
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
                                                value={student.Ethnic}
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
                                                value={student.Dob}
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col>
                                        <Form.Group>
                                            <Form.Label
                                                className={cx("form-label")}
                                            >
                                                Tình trạng học tập
                                            </Form.Label>
                                            <Form.Select
                                                className={cx("form-select")}
                                                onChange={handleOnChange}
                                                name="Status"
                                                value={student.Status}
                                            >
                                                <option value="1">
                                                    Đang học
                                                </option>
                                                <option value="2">
                                                    Nghỉ học
                                                </option>
                                                <option value="3">
                                                    Đã tốt nghiệp
                                                </option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>

                                    <Col>
                                        <Form.Group>
                                            <Form.Label
                                                className={cx("form-label")}
                                            >
                                                Ngày tốt nghiệp
                                            </Form.Label>
                                            <Form.Control
                                                className={cx("form-control")}
                                                type="date"
                                                onChange={handleOnChange}
                                                name="GraduationDate"
                                                value={student.GraduationDate}
                                            ></Form.Control>
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
                                        value={student.Email}
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
                                        value={student.Address}
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
                                        name="PhoneNum"
                                        value={student.PhoneNum}
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
                                                name="FatherName"
                                                value={student.FatherName}
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
                                                name="FatherPhone"
                                                value={student.FatherPhone}
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
                                                name="FatherCareer"
                                                value={student.FatherCareer}
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
                                                name="MotherName"
                                                value={student.MotherName}
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
                                                name="MotherPhone"
                                                value={student.MotherPhone}
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
                                                name="MotherCareer"
                                                value={student.MotherCareer}
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
