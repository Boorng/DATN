import * as classNames from "classnames/bind";
import "react-toastify/dist/ReactToastify.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import { toast } from "react-toastify";
import { memo, useContext, useEffect } from "react";
import { FaUserAlt } from "react-icons/fa";
import { useFormik } from "formik";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import { auth, db } from "../../../../firebase";
import styles from "./AddEditStudent.module.scss";
import {
  postStudentAPI,
  updateStudentAPI,
} from "../../../../services/studentService";
import { Modal } from "react-bootstrap";

const cx = classNames.bind(styles);

function AddEditStudent({
  action,
  studentShow,
  show,
  showAdd,
  getStudent,
  currentUser,
}) {
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
    if (!values.schoolYear) {
      errors.schoolYear = "Bạn chưa nhập khóa";
    }
    if (!values.fatherName) {
      errors.fatherName = "Bạn chưa nhập tên bố";
    }
    if (!values.fatherPhone) {
      errors.fatherPhone = "Bạn chưa nhập số điện thoại bố";
    }
    if (!values.fatherCareer) {
      errors.fatherCareer = "Bạn chưa nhập nghề nghiệp bố";
    }
    if (!values.motherName) {
      errors.motherName = "Bạn chưa nhập tên mẹ";
    }
    if (!values.motherPhone) {
      errors.motherPhone = "Bạn chưa nhập số điện thoại mẹ";
    }
    if (!values.motherCareer) {
      errors.motherCareer = "Bạn chưa nhập nghề nghiệp mẹ";
    }

    return errors;
  };

  const validateBirthday = (birthday) => {
    const arr = birthday.split("/");
    return `${arr[2]}-${arr[1]}-${arr[0]}`;
  };

  const formik = useFormik({
    initialValues: {
      id: studentShow ? studentShow.id : "",
      fullName: studentShow ? studentShow.fullName : "",
      age: studentShow ? studentShow.age : 0,
      gender: studentShow ? studentShow.gender : "Nam",
      ethnic: studentShow ? studentShow.ethnic : "",
      birthDay: studentShow
        ? validateBirthday(studentShow.birthDay)
        : "1999-01-01",
      email: studentShow ? studentShow.email : "",
      address: studentShow ? studentShow.address : "",
      phone: studentShow ? studentShow.phone : "",
      fatherName: studentShow ? studentShow.fatherName : "",
      fatherPhone: studentShow ? studentShow.fatherPhone : "",
      fatherCareer: studentShow ? studentShow.fatherCareer : "",
      motherName: studentShow ? studentShow.motherName : "",
      motherPhone: studentShow ? studentShow.motherPhone : "",
      motherCareer: studentShow ? studentShow.motherCareer : "",
      status: studentShow ? studentShow.status : 1,
      schoolYear: studentShow ? studentShow.schoolYear : "",
    },
    enableReinitialize: true,
    validate,
    onSubmit: async (values) => {
      if (studentShow) {
        const response = await updateStudentAPI(values);
        if (response.message === "Success") {
          toast.info("Cập nhật thông tin học sinh thành công");
          await getStudent();
          showAdd();
        }
      } else {
        const response = await postStudentAPI(values);
        if (response.message === "Success") {
          toast.success("Thêm học sinh thành công");
          await getStudent();
          showAdd();
        } else {
          toast.error(
            "Thêm học sinh thất bại do nhập thông tin không đúng định dạng hoặc ID đã tồn tại"
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
                {action === "add" ? "Thêm" : "Sửa"} thông tin sinh viên
              </h3>
            }
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className={cx("form")} onSubmit={formik.handleSubmit}>
            <Row className="mb-3">
              <Col xs={3} className={cx("form-image")}>
                {studentShow && studentShow.avatar ? (
                  <Image
                    src={studentShow.avatar}
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
                      <Form.Label className={cx("form-label")}>
                        ID học sinh
                      </Form.Label>
                      <Form.Control
                        className={cx("form-control")}
                        type="text"
                        placeholder="Nhập ID học sinh"
                        required
                        onChange={formik.handleChange}
                        value={formik.values.id}
                        name="id"
                        disabled={studentShow ? true : false}
                      />
                      {formik.errors.id ? (
                        <div className={cx("error-message")}>
                          {formik.errors.id}
                        </div>
                      ) : null}
                    </Form.Group>
                  </Col>

                  <Col xs={6}>
                    <Form.Group>
                      <Form.Label className={cx("form-label")}>
                        Tên học sinh
                      </Form.Label>
                      <Form.Control
                        className={cx("form-control")}
                        type="text"
                        placeholder="Nhập tên học sinh"
                        required
                        onChange={formik.handleChange}
                        value={formik.values.fullName}
                        name="fullName"
                      />
                      {formik.errors.fullName ? (
                        <div className={cx("error-message")}>
                          {formik.errors.fullName}
                        </div>
                      ) : null}
                    </Form.Group>
                  </Col>

                  <Col xs={2}>
                    <Form.Group>
                      <Form.Label className={cx("form-label")}>
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
                      <Form.Label className={cx("form-label")}>Tuổi</Form.Label>
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
                        <div className={cx("error-message")}>
                          {formik.errors.age}
                        </div>
                      ) : null}
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col xs={5}>
                    <Form.Group>
                      <Form.Label className={cx("form-label")}>
                        Dân tộc
                      </Form.Label>
                      <Form.Control
                        className={cx("form-select")}
                        type="text"
                        placeholder="Nhập dân tộc"
                        required
                        onChange={formik.handleChange}
                        name="ethnic"
                        value={formik.values.ethnic}
                      />
                      {formik.errors.ethnic ? (
                        <div className={cx("error-message")}>
                          {formik.errors.ethnic}
                        </div>
                      ) : null}
                    </Form.Group>
                  </Col>

                  <Col>
                    <Form.Group>
                      <Form.Label className={cx("form-label")}>
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
                      <Form.Label className={cx("form-label")}>
                        Tình trạng học tập
                      </Form.Label>
                      <Form.Select
                        className={cx("form-select")}
                        onChange={formik.handleChange}
                        name="status"
                        value={formik.values.status}
                      >
                        <option value={1}>Đang học</option>
                        <option value={2}>Nghỉ học</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label className={cx("form-label")}>Email</Form.Label>
                  <Form.Control
                    className={cx("form-control")}
                    type="email"
                    placeholder="Nhập email"
                    required
                    onChange={formik.handleChange}
                    name="email"
                    disabled={studentShow ? true : false}
                    value={formik.values.email}
                  />
                  {formik.errors.email ? (
                    <div className={cx("error-message")}>
                      {formik.errors.email}
                    </div>
                  ) : null}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className={cx("form-label")}>Địa chỉ</Form.Label>
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
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label className={cx("form-label")}>
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
                        <div className={cx("error-message")}>
                          {formik.errors.phone}
                        </div>
                      ) : null}
                    </Form.Group>
                  </Col>
                  <Col xs={4}>
                    <Form.Group className="mb-3">
                      <Form.Label className={cx("form-label")}>Khóa</Form.Label>
                      <Form.Control
                        className={cx("form-control")}
                        type="text"
                        placeholder="Nhập niên khóa"
                        required
                        onChange={formik.handleChange}
                        name="schoolYear"
                        value={formik.values.schoolYear}
                      />
                      {formik.errors.schoolYear ? (
                        <div className={cx("error-message")}>
                          {formik.errors.schoolYear}
                        </div>
                      ) : null}
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col xs={6}>
                    <Form.Group>
                      <Form.Label className={cx("form-label")}>
                        Họ và tên bố
                      </Form.Label>
                      <Form.Control
                        className={cx("form-control")}
                        type="text"
                        placeholder="Nhập tên bố"
                        required
                        onChange={formik.handleChange}
                        name="fatherName"
                        value={formik.values.fatherName}
                      />
                      {formik.errors.fatherName ? (
                        <div className={cx("error-message")}>
                          {formik.errors.fatherName}
                        </div>
                      ) : null}
                    </Form.Group>
                  </Col>

                  <Col xs={2}>
                    <Form.Group>
                      <Form.Label className={cx("form-label")}>
                        Số điện thoại
                      </Form.Label>
                      <Form.Control
                        className={cx("form-control")}
                        type="text"
                        placeholder="Nhập tuổi bố"
                        required
                        onChange={formik.handleChange}
                        name="fatherPhone"
                        value={formik.values.fatherPhone}
                      />
                      {formik.errors.fatherPhone ? (
                        <div className={cx("error-message")}>
                          {formik.errors.fatherPhone}
                        </div>
                      ) : null}
                    </Form.Group>
                  </Col>

                  <Col>
                    <Form.Group>
                      <Form.Label className={cx("form-label")}>
                        Nghề nghiệp
                      </Form.Label>
                      <Form.Control
                        className={cx("form-control")}
                        type="text"
                        placeholder="Nhập nghề nghiệp bố"
                        required
                        onChange={formik.handleChange}
                        name="fatherCareer"
                        value={formik.values.fatherCareer}
                      />
                      {formik.errors.fatherCareer ? (
                        <div className={cx("error-message")}>
                          {formik.errors.fatherCareer}
                        </div>
                      ) : null}
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col xs={6}>
                    <Form.Group>
                      <Form.Label className={cx("form-label")}>
                        Họ và tên mẹ
                      </Form.Label>
                      <Form.Control
                        className={cx("form-control")}
                        type="text"
                        placeholder="Nhập tên mẹ"
                        required
                        onChange={formik.handleChange}
                        name="motherName"
                        value={formik.values.motherName}
                      />
                      {formik.errors.motherName ? (
                        <div className={cx("error-message")}>
                          {formik.errors.motherName}
                        </div>
                      ) : null}
                    </Form.Group>
                  </Col>

                  <Col xs={2}>
                    <Form.Group>
                      <Form.Label className={cx("form-label")}>
                        Số điện thoại
                      </Form.Label>
                      <Form.Control
                        className={cx("form-control")}
                        type="text"
                        placeholder="Nhập tuổi mẹ"
                        required
                        onChange={formik.handleChange}
                        name="motherPhone"
                        value={formik.values.motherPhone}
                      />
                      {formik.errors.motherPhone ? (
                        <div className={cx("error-message")}>
                          {formik.errors.motherPhone}
                        </div>
                      ) : null}
                    </Form.Group>
                  </Col>

                  <Col>
                    <Form.Group>
                      <Form.Label className={cx("form-label")}>
                        Nghề nghiệp
                      </Form.Label>
                      <Form.Control
                        className={cx("form-control")}
                        type="text"
                        placeholder="Nhập nghề nghiệp mẹ"
                        required
                        onChange={formik.handleChange}
                        name="motherCareer"
                        value={formik.values.motherCareer}
                      />
                      {formik.errors.motherCareer ? (
                        <div className={cx("error-message")}>
                          {formik.errors.motherCareer}
                        </div>
                      ) : null}
                    </Form.Group>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Modal.Footer>
              <Button
                type="submit"
                variant="primary"
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
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default memo(AddEditStudent);
