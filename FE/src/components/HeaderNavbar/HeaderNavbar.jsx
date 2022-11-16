import * as classNames from "classnames/bind";
import { NavLink } from "react-router-dom";

import styles from "./HeaderNavbar.module.scss";

const cx = classNames.bind(styles);

function HeaderNavbar() {
    const activeNavbar = {
        boxSizing: "border-box",
        color: "red",
        paddingTop: "5px",
        borderBottom: "5px solid red",
        fontWeight: "600",
    };

    return (
        <div className={cx("header-nav")}>
            <NavLink
                to="/"
                className={cx("header-nav-item")}
                style={({ isActive }) => (isActive ? activeNavbar : undefined)}
            >
                TRANG CHỦ
            </NavLink>
            <NavLink
                to="/rule"
                className={cx("header-nav-item")}
                style={({ isActive }) => (isActive ? activeNavbar : undefined)}
            >
                QUY ĐỊNH
            </NavLink>
            <NavLink
                to="/contact"
                className={cx("header-nav-item")}
                style={({ isActive }) => (isActive ? activeNavbar : undefined)}
            >
                LIÊN HỆ
            </NavLink>
        </div>
    );
}

export default HeaderNavbar;
