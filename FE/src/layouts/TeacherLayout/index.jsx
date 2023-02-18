import * as classNames from "classnames/bind";

import Footer from "../../components/Footer";
import NavTeacher from "../../components/NavTeacher";
import styles from "./TeacherLayout.module.scss";

const cx = classNames.bind(styles);

function TeacherLayout({ children }) {
    return (
        <div className={cx("teacher-layout")}>
            <NavTeacher />
            <div className={cx("content")}>
                {children}
                <Footer />
            </div>
        </div>
    );
}

export default TeacherLayout;
