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
import { MdOutlineFileUpload } from "react-icons/md";

import styles from "./AddEditStudent.module.scss";
import { addStudent, editStudent } from "../../../../slices/studentSlice";

const cx = classNames.bind(styles);

function AddEditStudent({ action, studentShow }) {
    const [student, setStudent] = useState({
        id: "",
        avatar: "",
        name: "",
        age: 0,
        gender: "Nam",
        ethnic: "kinh",
        dob: "1999-01-01",
        email: "",
        address: "",
        maritalStatus: "Độc thân",
        phoneNum: "",
        fatherName: "",
        fatherAge: 0,
        motherName: "",
        motherAge: 0,
    });

    useEffect(() => {
        if (studentShow) {
            setStudent(studentShow);
        }
    }, []);

    useEffect(() => {
        return () => {
            student.avatar && URL.revokeObjectURL(student.avatar);
        };
    }, [student.avatar]);

    const dispatch = useDispatch();

    const handleOnClickStudent = () => {
        console.log(student);
        const arr = Object.values(student);
        const check = arr.filter((item) => item === 0 || item === "");
        if (check.length === 0) {
            if (studentShow) {
                dispatch(editStudent(student));
                toast.info("Cập nhật thông tin học sinh thành công");
            } else {
                dispatch(addStudent(student));
                toast.success("Thêm học sinh thành công");
                const newStudent = {
                    id: "",
                    name: "",
                    age: 0,
                    gender: "Nam",
                    ethnic: "kinh",
                    dob: "1999-01-01",
                    email: "",
                    address: "",
                    maritalStatus: "Độc thân",
                    phoneNum: "",
                    fatherName: "",
                    fatherAge: 0,
                    motherName: "",
                    motherAge: 0,
                };
                setStudent({ ...newStudent });
            }
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

    const handleSelectImg = (e) => {
        const file = e.target.files[0];
        console.log(file);
        if (file)
            setStudent({
                ...student,
                [e.target.name]: file,
            });
    };

    return (
        <div className={cx("add-edit-student")}>
            {action === "add" && (
                <h3 className={cx("form-title")}>Thêm sinh viên</h3>
            )}

            <Form className="mt-3">
                <Row className="mb-3">
                    <Col xs={3} className={cx("form-image")}>
                        {student.avatar ? (
                            <Image
                                src={URL.createObjectURL(student.avatar)}
                                alt="avatar"
                                className={cx("avatar-image")}
                            />
                        ) : (
                            <FaUserAlt className={cx("avatar-image")} />
                        )}

                        <div className={cx("avatar")}>
                            <label
                                htmlFor="avatar"
                                className={cx("button-avatar-content")}
                            >
                                Chọn ảnh
                            </label>
                            <MdOutlineFileUpload
                                className={cx("avatar-icon")}
                            />
                            <input
                                type="file"
                                name="avatar"
                                id="avatar"
                                onChange={handleSelectImg}
                                className={cx("button-avatar")}
                            />
                        </div>
                    </Col>
                    <Col xs={9}>
                        <Row className="mb-3">
                            <Col>
                                <Form.Group
                                    className={cx("manage-student-item-7")}
                                >
                                    <Form.Label>ID học sinh</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Nhập ID học sinh"
                                        required
                                        onChange={handleOnChange}
                                        value={student.id}
                                        name="id"
                                    />
                                </Form.Group>
                            </Col>

                            <Col xs={7}>
                                <Form.Group
                                    className={cx("manage-student-item-7")}
                                >
                                    <Form.Label>Tên học sinh</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Nhập tên học sinh"
                                        required
                                        onChange={handleOnChange}
                                        value={student.name}
                                        name="name"
                                    />
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Group>
                                    <Form.Label>Tuổi</Form.Label>
                                    <Form.Control
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
                            <Col xs={2}>
                                <Form.Group>
                                    <Form.Label>Giới tính</Form.Label>
                                    <Form.Select
                                        onChange={handleOnChange}
                                        name="gender"
                                        value={student.gender}
                                    >
                                        <option value="Nam">Nam</option>
                                        <option value="Nữ">Nữ</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>

                            <Col xs={4}>
                                <Form.Group>
                                    <Form.Label>Dân tộc</Form.Label>
                                    <Form.Select
                                        onChange={handleOnChange}
                                        name="ethnic"
                                        value={student.ethnic}
                                    >
                                        <option value="kinh">Kinh</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Group>
                                    <Form.Label>Ngày tháng năm sinh</Form.Label>
                                    <Form.Control
                                        type="date"
                                        onChange={handleOnChange}
                                        name="dob"
                                        value={student.dob}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Nhập email"
                        required
                        onChange={handleOnChange}
                        name="email"
                        value={student.email}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Địa chỉ</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Nhập địa chỉ"
                        required
                        onChange={handleOnChange}
                        name="address"
                        value={student.address}
                    />
                </Form.Group>

                <Row className="mb-3">
                    <Col xs={8}>
                        <Form.Group>
                            <Form.Label>Số điện thoại</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nhập số điện thoại"
                                required
                                onChange={handleOnChange}
                                name="phoneNum"
                                value={student.phoneNum}
                            />
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group>
                            <Form.Label>Tình trạng hôn nhân</Form.Label>
                            <Form.Select
                                onChange={handleOnChange}
                                name="maritalStatus"
                                value={student.maritalStatus}
                            >
                                <option value="single">Độc thân</option>
                                <option value="married">Kết hôn</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col xs={7}>
                        <Form.Group>
                            <Form.Label>Họ và tên bố</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nhập tên bố"
                                required
                                onChange={handleOnChange}
                                name="fatherName"
                                value={student.fatherName}
                            />
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group>
                            <Form.Label>Tuổi bố</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Nhập tuổi bố"
                                required
                                onChange={handleOnChange}
                                name="fatherAge"
                                value={student.fatherAge}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col xs={7}>
                        <Form.Group>
                            <Form.Label>Họ và tên mẹ</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nhập tên mẹ"
                                required
                                onChange={handleOnChange}
                                name="motherName"
                                value={student.motherName}
                            />
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group>
                            <Form.Label>Tuổi mẹ</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Nhập tuổi mẹ"
                                required
                                onChange={handleOnChange}
                                name="motherAge"
                                value={student.motherAge}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Button
                    onClick={handleOnClickStudent}
                    className={cx("button-add-student")}
                >
                    {action === "add" ? "Thêm" : "Sửa"}
                </Button>
            </Form>
        </div>
    );
}

export default memo(AddEditStudent);
