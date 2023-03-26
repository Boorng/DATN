import * as classNames from "classnames/bind";
import { useState } from "react";
import { FcCollapse } from "react-icons/fc";
import { NavLink } from "react-router-dom";

import Image from "../../assets/Image";
import styles from "./NavMenu.module.scss";

const cx = classNames.bind(styles);

function NavMenu() {
    const data = [
        {
            id: 1,
            name: "/manage/information",
            title: "Trang chủ",
        },
        {
            id: 2,
            name: "/manage/student",
            title: "Quản lý học sinh",
        },
        {
            id: 3,
            name: "/manage/teacher",
            title: "Quản lý giáo viên",
        },
        {
            id: 4,
            name: "/manage/team",
            title: "Quản lý tổ chuyên môn",
        },
        {
            id: 5,
            name: "/manage/class",
            title: "Quản lý lớp",
            content: [
                { id: 51, name: "Khối 6", to: "/manage/class/grade/6" },
                { id: 52, name: "Khối 7", to: "/manage/class/grade/7" },
                { id: 53, name: "Khối 8", to: "/manage/class/grade/8" },
                { id: 54, name: "Khối 9", to: "/manage/class/grade/9" },
            ],
        },
        {
            id: 6,
            name: "/manage/semester",
            title: "Quản lý học kỳ",
        },
        {
            id: 7,
            name: "/manage/result",
            title: "Quản lý kết quả học tập",
            content: [
                { id: 71, name: "Khối 6", to: "/manage/result/grade/6" },
                { id: 72, name: "Khối 7", to: "/manage/result/grade/7" },
                { id: 73, name: "Khối 8", to: "/manage/result/grade/8" },
                { id: 74, name: "Khối 9", to: "/manage/result/grade/9" },
            ],
        },
        {
            id: 8,
            title: "Xem kết quả đánh giá hạnh kiểm",
            content: [
                {
                    id: 81,
                    name: "Khối 6",
                    to: "/manage/conduct/grade/6",
                },
                {
                    id: 82,
                    name: "Khối 7",
                    to: "/manage/conduct/grade/7",
                },
                {
                    id: 83,
                    name: "Khối 8",
                    to: "/manage/conduct/grade/8",
                },
                {
                    id: 84,
                    name: "Khối 9",
                    to: "/manage/conduct/grade/9",
                },
            ],
        },
        {
            id: 9,
            title: "Quản lý phân công giảng dạy",
            content: [
                {
                    id: 91,
                    name: "Khối 6",
                    to: "/manage/training-management/grade/6",
                },
                {
                    id: 92,
                    name: "Khối 7",
                    to: "/manage/training-management/grade/7",
                },
                {
                    id: 93,
                    name: "Khối 8",
                    to: "/manage/training-management/grade/8",
                },
                {
                    id: 94,
                    name: "Khối 9",
                    to: "/manage/training-management/grade/9",
                },
            ],
        },
        {
            id: 10,
            name: "/manage/chat-app",
            title: "Giải đáp thắc mắc",
        },
    ];

    const activeNavbar = {
        color: "#9e100e",
        fontWeight: "600",
    };

    const [showList, setShowList] = useState([]);

    const handleShowList = (id) => {
        if (showList.includes(id)) {
            setShowList(showList.filter((item) => item !== id));
        } else {
            setShowList([...showList, id]);
        }
    };

    const handleLogOut = () => {
        localStorage.setItem("authenticated", false);
        localStorage.setItem("token", "");
    };

    return (
        <div className={cx("nav-menu")}>
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
                        <div className={cx("nav-menu-item")} key={item.id}>
                            {item.content ? (
                                <div className={cx("nav-menu-item-accordion")}>
                                    <div
                                        className={cx(
                                            "nav-menu-item-accordion-header"
                                        )}
                                        onClick={() => handleShowList(item.id)}
                                    >
                                        <span>{item.title}</span>
                                        <FcCollapse
                                            className={
                                                !showList.includes(item.id) &&
                                                cx("nav-menu-item-icon")
                                            }
                                        />
                                    </div>
                                    {showList.includes(item.id) && (
                                        <div
                                            className={cx(
                                                "nav-menu-item-accordion-body"
                                            )}
                                        >
                                            {item.content.map((itemChild) => {
                                                return (
                                                    <NavLink
                                                        key={itemChild.id}
                                                        className={cx(
                                                            "nav-menu-item-body-child"
                                                        )}
                                                        to={itemChild.to}
                                                        style={({ isActive }) =>
                                                            isActive
                                                                ? activeNavbar
                                                                : undefined
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
                                    className={cx("nav-menu-item-link")}
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
                className={cx("nav-menu-item-href")}
                onClick={handleLogOut}
            >
                Đăng xuất
            </a>
        </div>
    );
}

export default NavMenu;
