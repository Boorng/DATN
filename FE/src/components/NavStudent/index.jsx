import * as classNames from "classnames/bind";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { FcCollapse } from "react-icons/fc";
import { NavLink } from "react-router-dom";
import Image from "../../assets/Image";
import { auth } from "../../firebase";
import { getClassByStudentAPI } from "../../services/studentClassService";
import { getStudentByAccount } from "../../services/studentService";
import { handleCheck } from "../../utils/common";

import styles from "./NavStudent.module.scss";

const cx = classNames.bind(styles);

function NavStudent() {
    const [data, setData] = useState([]);
    const [showList, setShowList] = useState([]);
    const [checkResult, setCheckResult] = useState("");

    const handleShowList = (id) => {
        if (showList.includes(id)) {
            setShowList(showList.filter((item) => item !== id));
        } else {
            setShowList([...showList, id]);
        }
    };

    const activeNavbar = {
        color: "#9e100e",
        fontWeight: "600",
    };

    const getClass = async () => {
        const check = handleCheck();
        const student = await getStudentByAccount(check.Id);
        const resAPI = await getClassByStudentAPI(student.id);
        const dataAPI = [
            {
                id: 1,
                name: "/student/information",
                title: "Thông tin cá nhân",
            },
            {
                id: 2,
                name: "/student/result",
                title: "Kết quả học tập",
                content: resAPI.map((item) => {
                    return {
                        id: item.id,
                        name: item.name,
                        to: `/student/result/grade/${item.grade}/class/${item.name}/academicYear/${item.academicYear}/${item.id}/${student.fullName}/${item.divisionId}`,
                    };
                }),
            },
            {
                id: 3,
                name: "/student/conduct",
                title: "Báo cáo tổng kết",
                content: resAPI.map((item) => {
                    return {
                        id: item.id,
                        name: item.name,
                        to: `/student/conduct/grade/${item.grade}/class/${item.name}/academicYear/${item.academicYear}/${item.id}/${student.fullName}/${student.id}/${item.divisionId}`,
                    };
                }),
            },
            {
                id: 4,
                name: "/student/changePassword",
                title: "Đổi mật khẩu",
            },
            {
                id: 5,
                name: "/student/chat-app",
                title: "Giải đáp thắc mắc",
            },
        ];

        setData(dataAPI);
    };

    const handleCheckResult = (id) => {
        if (id !== "") {
            setCheckResult(id);
        } else {
            setCheckResult("");
        }
    };

    useEffect(() => {
        getClass();
    }, []);

    const handleLogOut = () => {
        signOut(auth);
        localStorage.setItem("authenticated", false);
        localStorage.setItem("token", "");
    };

    return (
        <div className={cx("nav-student")}>
            <div className={cx("nav-image")}>
                <img
                    src={Image.icon_title_header}
                    alt="icon"
                    className={cx("image")}
                />
            </div>
            <div className={cx("nav-content")}>
                {data.map((item) => {
                    return (
                        <div className={cx("nav-student-item")} key={item.id}>
                            {item.content ? (
                                <div
                                    className={cx("nav-student-item-accordion")}
                                >
                                    <div
                                        className={cx(
                                            "nav-student-item-accordion-header"
                                        )}
                                        onClick={() => handleShowList(item.id)}
                                    >
                                        <span>{item.title}</span>
                                        <FcCollapse
                                            className={
                                                !showList.includes(item.id) &&
                                                cx("nav-student-item-icon")
                                            }
                                        />
                                    </div>
                                    {showList.includes(item.id) && (
                                        <div
                                            className={cx(
                                                "nav-student-item-accordion-body"
                                            )}
                                        >
                                            {item.content.map((itemChild) => {
                                                return (
                                                    <NavLink
                                                        key={itemChild.id}
                                                        className={cx(
                                                            "nav-student-item-body-child",
                                                            itemChild.id ===
                                                                checkResult &&
                                                                "active"
                                                        )}
                                                        to={itemChild.to}
                                                        onClick={() =>
                                                            handleCheckResult(
                                                                itemChild.id
                                                            )
                                                        }
                                                    >
                                                        {itemChild.name}
                                                    </NavLink>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <NavLink
                                    to={`${item.name}`}
                                    key={item.id}
                                    style={({ isActive }) =>
                                        isActive ? activeNavbar : undefined
                                    }
                                    className={cx("nav-student-item-link")}
                                    onClick={handleCheckResult}
                                >
                                    {item.title}
                                </NavLink>
                            )}
                        </div>
                    );
                })}
            </div>
            <a
                href="/"
                className={cx("nav-student-item-href")}
                onClick={handleLogOut}
            >
                Đăng xuất
            </a>
        </div>
    );
}

export default NavStudent;
