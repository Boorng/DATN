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
        <div className={cx("login-form")}>
            <div className={cx("login-form-header")}>
                <FaUserAlt className={cx("login-form-icon")} />
                <span className={cx("login-form-title")}>ĐĂNG NHẬP</span>
            </div>

            <div className={cx("login-form-select")}>
                <span className={cx("login-form-select-title")}>
                    Vui lòng chọn vai trò đăng nhập:
                </span>
                <Form.Select
                    className={cx("login-form-select-list")}
                    onChange={handleSelect}
                >
                    <option value="student">Học sinh</option>
                    <option value="parent">Phụ huynh</option>
                    <option value="teacher">Giáo viên</option>
                </Form.Select>
            </div>
            <Form className={cx("login-form-content")}>
                <Form.Group>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Email"
                        value={Email}
                        onChange={handleEmailOnChange}
                        required
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Mật khẩu:</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Mật khẩu"
                        value={Pass}
                        onChange={handlePassOnChange}
                        required
                    />
                </Form.Group>

                <Button
                    variant="primary"
                    className={cx("login-form-button")}
                    onClick={handleSubmit}
                >
                    Đăng nhập
                </Button>
            </Form>
        </div>
    );
}

export default Login;
