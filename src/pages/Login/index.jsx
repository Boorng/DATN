import * as classNames from "classnames/bind";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FaUserAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "./Login.module.scss";
import { login } from "../../slices/loginSlice";

const cx = classNames.bind(styles);

function Login() {
    const [Email, setEmail] = useState("");
    const [Pass, setPass] = useState("");
    const [Select, setSelect] = useState("student");
    const [showForgot, setShowForgot] = useState(false);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {}, []);

    const users = [
        {
            id: 1,
            type: "student",
            data: [
                {
                    id: 1,
                    email: "trantrung2khp@gmail.com",
                    pass: "123456",
                },
                {
                    id: 2,
                    email: "nqtp2khn@gmail.com",
                    pass: "mtmpd0611",
                },
                {
                    id: 3,
                    email: "trungtd2000@gmail.com",
                    pass: "123456",
                },
            ],
        },
        {
            id: 2,
            type: "parent",
            data: [
                {
                    id: 1,
                    email: "trantrung2khp1@gmail.com",
                    pass: "123456",
                },
                {
                    id: 2,
                    email: "nqtp2khn1@gmail.com",
                    pass: "mtmpd0611",
                },
                {
                    id: 3,
                    email: "trungtd20001@gmail.com",
                    pass: "123456",
                },
            ],
        },
        {
            id: 3,
            type: "teacher",
            data: [
                {
                    id: 1,
                    email: "trantrung2khp2@gmail.com",
                    pass: "123456",
                },
                {
                    id: 2,
                    email: "nqtp2khn2@gmail.com",
                    pass: "mtmpd0611",
                },
                {
                    id: 3,
                    email: "trungtd20002@gmail.com",
                    pass: "123456",
                },
            ],
        },
    ];

    const handleEmailOnChange = (e) => {
        if (e.target.value.trim() !== "") {
            setEmail(e.target.value);
        } else {
            setEmail("");
        }
    };

    const handlePassOnChange = (e) => {
        if (e.target.value.trim() !== "") {
            setPass(e.target.value);
        } else {
            setPass("");
        }
    };

    const handleForgotPass = () => {
        setShowForgot(!showForgot);
    };

    const handleSubmit = () => {
        let userCopy = {};
        users.forEach((userType) => {
            if (userType.type === Select) userCopy = userType;
        });

        if (
            userCopy.data.filter((user) => {
                const { email, pass } = user;
                return email === Email && pass === Pass;
            }).length > 0
        ) {
            const idCop = userCopy.data.filter((user) => {
                const { email, pass } = user;
                return email === Email && pass === Pass;
            });
            const id = idCop[0].id;
            localStorage.setItem("authenticated", true);

            dispatch(login({ idUser: id, type: userCopy.type }));

            if (userCopy.type === "student") {
                navigate(`/student/information/${id}`);
            } else if (userCopy.type === "teacher") {
                navigate(`/manage/information/${id}`);
            }
            toast.success("Login success");
        } else {
            toast.error("Email or Password is not correct");
        }
    };

    const handleSelect = (e) => {
        setSelect(e.target.value);
    };

    return (
        <div className={cx("login")}>
            <h1 className={cx("login-form-header")}>
                TRƯỜNG TRUNG HỌC CƠ SỞ CHU VĂN AN
            </h1>
            <div className={cx("loginform")}>
                <h2 className={cx("headerTitle")}>Đăng nhập</h2>
                <div className={cx("row")}>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="text"
                        placeholder="Nhập email"
                        autoFocus
                        onChange={handleEmailOnChange}
                        value={Email}
                    />
                </div>
                {!showForgot ? (
                    <>
                        <div className={cx("row")}>
                            <label htmlFor="password">Mật khẩu</label>
                            <input
                                id="password"
                                type="password"
                                placeholder="Nhập mật khẩu"
                                onChange={handlePassOnChange}
                                value={Pass}
                            />
                        </div>
                        <div className={cx("row", "button")}>
                            <button>Đăng nhập</button>
                        </div>
                        <div className={cx("forgot-pass")}>
                            <span
                                className={cx("forgot-pass-content")}
                                onClick={handleForgotPass}
                            >
                                Quên mật khẩu?
                            </span>
                        </div>
                    </>
                ) : (
                    <>
                        <div className={cx("row", "button")}>
                            <button>Reset mật khẩu</button>
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
        </div>
    );
}

export default Login;
