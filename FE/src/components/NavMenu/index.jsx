import * as classNames from "classnames/bind";
import { NavLink } from "react-router-dom";

import styles from "./NavMenu.module.scss";

const cx = classNames.bind(styles);

function NavMenu() {
    const data = [
        {
            id: 1,
            name: "/manage/information",
            title: "Thông tin người dùng",
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
            name: "/manage/class",
            title: "Quản lý lớp",
        },
        {
            id: 5,
            name: "/manage/result",
            title: "Quản lý kết quả học tập",
        },
    ];

    const activeNavbar = {};

    const handleLogOut = () => {
        localStorage.setItem("authenticated", false);
    };

    return (
        <div className={cx("nav-menu")}>
            {data.map((item) => (
                <NavLink
                    to={`${item.name}`}
                    key={item.id}
                    className={cx("nav-menu-item")}
                    style={({ isActive }) =>
                        isActive ? activeNavbar : undefined
                    }
                >
                    {item.title}
                </NavLink>
            ))}
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
