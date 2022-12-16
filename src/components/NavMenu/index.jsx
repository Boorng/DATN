import * as classNames from "classnames/bind";
import { NavLink } from "react-router-dom";
import Image from "../../assets/Image";

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
        {
            id: 6,
            name: "/manage/trainingresult",
            title: "Quản lý điểm rèn luyện",
        },
    ];

    const activeNavbar = {
        color: "#9e100e",
        fontWeight: "600",
    };

    const handleLogOut = () => {
        localStorage.setItem("authenticated", false);
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
