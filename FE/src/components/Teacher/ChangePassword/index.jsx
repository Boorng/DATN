import * as classNames from "classnames/bind";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiLockOpenAlt } from "react-icons/bi";
import { Button, Form, Image, InputGroup } from "react-bootstrap";
import { toast } from "react-toastify";
import { useFormik } from "formik";

import styles from "./ChangePasswordTeacher.module.scss";
import { handleCheck } from "../../../utils/common";
import { FaUserAlt } from "react-icons/fa";
import {
  changePasswordAPI,
  checkPasswordAPI,
} from "../../../services/accountService";
import { getTeacherByAccount } from "../../../services/teacherService";
import { AuthContext } from "../../../context/AuthContext";
import { updatePassword } from "firebase/auth";

const cx = classNames.bind(styles);

function ChangePasswordTeacher() {
  const [teacher, setTeacher] = useState({});

  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const validate = (values) => {
    const errors = {};
    if (!values.passwordOld) {
      errors.passwordOld = "Bạn chưa nhập mật khẩu hiện tại";
    } else if (values.passwordOld.length < 6) {
      errors.passwordOld = "Mật khẩu phải có ít nhất 6 kí tự";
    }

    if (!values.passwordNew) {
      errors.passwordNew = "Bạn chưa nhập mật khẩu";
    } else if (values.passwordNew.length < 6) {
      errors.passwordNew = "Mật khẩu phải có ít nhất 6 kí tự";
    }

    if (!values.rePasswordNew) {
      errors.rePasswordNew = "Bạn chưa nhập mật khẩu";
    } else if (values.rePasswordNew.length < 6) {
      errors.rePasswordNew = "Mật khẩu phải có ít nhất 6 kí tự";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      passwordOld: "",
      passwordNew: "",
      rePasswordNew: "",
    },
    validate,
    onSubmit: async (values, action) => {
      const res = await checkPasswordAPI(teacher.accountId, values.passwordOld);
      if (res) {
        if (values.passwordNew !== values.rePasswordNew) {
          toast.error("Mật khẩu mới nhập lại không đúng");
        } else if (values.passwordNew === values.passwordOld) {
          toast.error("Mật khẩu mới không thể giống mật khẩu cũ");
        } else {
          const response = await changePasswordAPI(
            teacher.accountId,
            values.passwordNew
          );
          if (response.message === "Success") {
            // try {
            //     await updatePassword(
            //         currentUser,
            //         values.passwordNew
            //     );

            toast.success("Cập nhật mật khẩu thành công");
            action.resetForm({
              values: {
                passwordOld: "",
                passwordNew: "",
                rePasswordNew: "",
              },
            });
            // } catch (err) {
            //     console.log(err);
            // }
          } else {
            toast.error("Cập nhật mật khẩu thất bại");
          }
        }
      } else {
        toast.error("Mật khẩu hiện tại không đúng");
      }
    },
  });

  const getInformation = async (accountId) => {
    const data = await getTeacherByAccount(accountId);
    setTeacher(data);
  };

  useEffect(() => {
    const check = handleCheck();
    if (!check) {
      navigate("/");
    } else {
      if (check.Role === "2") {
        getInformation(check.Id);
      } else {
        navigate("/");
        alert("Bạn không có quyền vào trang này");
      }
    }
  }, []);

  return (
    <Form onSubmit={formik.handleSubmit} className={cx("change-password")}>
      <div className={cx("change-password-header")}>
        <h2 className={cx("change-password-title")}>ĐỔI MẬT KHẨU</h2>
        <div className={cx("teacher-user")}>
          {teacher.avatar ? (
            <Image
              src={teacher.avatar}
              alt="Avatar"
              className={cx("avatar-image")}
            />
          ) : (
            <FaUserAlt className={cx("avatar-image")} />
          )}

          <span className={cx("user-name")}>Xin chào {teacher.fullName}</span>
        </div>
      </div>
      <div className={cx("change-password-content")}>
        <div className={cx("change-password-form")}>
          <div className={cx("change-password-form-input")}>
            <InputGroup>
              <InputGroup.Text>
                <BiLockOpenAlt className={cx("password-icon")} />
              </InputGroup.Text>
              <Form.Control
                type="password"
                placeholder="Nhập mật khẩu hiện tại"
                className={cx("change-pass-content-input")}
                value={formik.values.passwordOld}
                onChange={formik.handleChange}
                name="passwordOld"
              />
            </InputGroup>
            {formik.errors.passwordOld ? (
              <div className={cx("error-message")}>
                {formik.errors.passwordOld}
              </div>
            ) : null}
            <InputGroup>
              <InputGroup.Text>
                <BiLockOpenAlt className={cx("password-icon")} />
              </InputGroup.Text>
              <Form.Control
                type="password"
                placeholder="Nhập mật khẩu mới"
                className={cx("change-pass-content-input")}
                value={formik.values.passwordNew}
                onChange={formik.handleChange}
                name="passwordNew"
              />
            </InputGroup>
            {formik.errors.passwordNew ? (
              <div className={cx("error-message")}>
                {formik.errors.passwordNew}
              </div>
            ) : null}
            <InputGroup>
              <InputGroup.Text>
                <BiLockOpenAlt className={cx("password-icon")} />
              </InputGroup.Text>
              <Form.Control
                type="password"
                placeholder="Nhập lại mật khẩu mới"
                className={cx("change-pass-content-input")}
                value={formik.values.rePasswordNew}
                onChange={formik.handleChange}
                name="rePasswordNew"
              />
            </InputGroup>
            {formik.errors.rePasswordNew ? (
              <div className={cx("error-message")}>
                {formik.errors.rePasswordNew}
              </div>
            ) : null}
          </div>
          <Button
            className={cx("button-update")}
            variant="success"
            type="submit"
          >
            Cập nhật
          </Button>
        </div>
      </div>
    </Form>
  );
}

export default ChangePasswordTeacher;
