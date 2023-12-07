import axios from "axios";
import * as classNames from "classnames/bind";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "../../firebase";

import { validateAPI } from "../../services/loginService";
import { handleCheck } from "../../utils/common";
import styles from "./Login.module.scss";

const cx = classNames.bind(styles);

function Login() {
  const [select, setSelect] = useState(1);
  const [showForgot, setShowForgot] = useState(false);

  const type = [
    { id: 1, title: "Học sinh/Phụ huynh" },
    { id: 2, title: "Giáo viên" },
    { id: 3, title: "Admin" },
  ];

  const navigate = useNavigate();

  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Bạn chưa nhập email";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Email không hợp lệ";
    }
    if (!values.password) {
      errors.password = "Bạn chưa nhập mật khẩu";
    } else if (values.password.length < 6) {
      errors.password = "Mật khẩu phải có ít nhất 6 kí tự";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: async (values) => {
      let loginModel = {
        email: values.email,
        password: values.password,
        role: select,
      };
      let res = await validateAPI(loginModel);
      if (res.message === "Invalid email/password") {
        alert(
          "Tài khoản hoặc mật khẩu không hợp lệ. Vui lòng kiểm tra lại tài khoản/mật khẩu"
        );
      } else if (res.message === "No permission") {
        alert(
          "Tài khoản không có vai trò này. Vui lòng chọn lại vai trò đăng nhập"
        );
      } else if (res.message === "Success") {
        localStorage.setItem("token", res.token);
        const resCheck = handleCheck();
        if (resCheck.Role === "3") {
          try {
            navigate("/manage/information");
            console.log("check");
          } catch (err) {
            console.log(err);
          }
        } else if (resCheck.Role === "2") {
          try {
            navigate("/teacher/information");
          } catch (err) {
            console.log(err);
          }
        } else if (resCheck.Role === "1") {
          try {
            navigate("/student/information");
          } catch (err) {
            console.log(err);
          }
        }
      }
    },
  });

  const resetPass = async () => {
    await sendPasswordResetEmail(auth, formik.values.email);
  };

  const handleForgotPass = () => {
    setShowForgot(!showForgot);
  };

  const handleSelect = (e) => {
    setSelect(+e.target.value);
  };

  useEffect(() => {
    const check = handleCheck();
    if (check) {
      if (check.Role === "3") {
        navigate("/manage/information");
      } else if (check.Role === "2") {
        navigate("/teacher/information");
      } else if (check.Role === "1") {
        navigate("/student/information");
      }
    }
  }, []);

  return (
    <form onSubmit={formik.handleSubmit} className={cx("login")}>
      <h1 className={cx("login-form-header")}>
        TRƯỜNG TRUNG HỌC CƠ SỞ TAM ĐẢO
      </h1>
      <div className={cx("login-form")}>
        <h2 className={cx("header-title")}>Đăng nhập</h2>
        <div className={cx("row")}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            placeholder="Nhập email"
            autoFocus
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.errors.email ? (
            <div className={cx("error-message")}>{formik.errors.email}</div>
          ) : null}
        </div>
        {!showForgot ? (
          <>
            <div className={cx("row")}>
              <label htmlFor="password">Mật khẩu</label>
              <input
                id="password"
                type="password"
                placeholder="Nhập mật khẩu"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              {formik.errors.password ? (
                <div className={cx("error-message")}>
                  {formik.errors.password}
                </div>
              ) : null}
            </div>
            <div className={cx("select-type")}>
              <span className={cx("select-type-title")}>
                Bạn muốn đăng đăng nhập với vai trò:
              </span>
              <Form className={cx("select-type-option")}>
                {type.map((item) => {
                  return (
                    <div className={cx("select-type-item")} key={item.id}>
                      <Form.Check
                        inline
                        label={item.title}
                        name={item.title}
                        type="radio"
                        id={item.id}
                        value={item.id}
                        onChange={handleSelect}
                        checked={item.id === select}
                      />
                    </div>
                  );
                })}
              </Form>
            </div>
            <div className={cx("row", "button")}>
              <button type="submit">Đăng nhập</button>
            </div>
          </>
        ) : (
          <>
            <div className={cx("row", "button")}>
              <button type="button" onClick={resetPass}>
                Reset mật khẩu
              </button>
            </div>
            <div className={cx("forgot-pass")}>
              <span
                className={cx("forgot-pass-content")}
                onClick={handleForgotPass}
              >
                Quay lại
              </span>
            </div>
          </>
        )}

        {}
      </div>
    </form>
  );
}

export default Login;
