import * as classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { GiTeacher } from "react-icons/gi";
import { BsPersonFill } from "react-icons/bs";
import { MdOutlineClass } from "react-icons/md";

import { getClassAPI } from "../../../services/classService";
import { getStudentAPI } from "../../../services/studentService";
import { getTeacherAPI } from "../../../services/teacherService";
import { handleCheck } from "../../../utils/common";
import styles from "./Information.module.scss";

const cx = classNames.bind(styles);

function Information() {
    const navigate = useNavigate();

    const [countStudent, setCountStudent] = useState(0);
    const [countTeacher, setCountTeacher] = useState(0);
    const [countClass, setCountClass] = useState(0);

    const getCountAPI = async () => {
        const studentAPI = await getStudentAPI();
        const teacherAPI = await getTeacherAPI();
        const classAPI = await getClassAPI();

        setCountStudent(studentAPI.length);
        setCountTeacher(teacherAPI.length);
        setCountClass(classAPI.length);
    };

    useEffect(() => {
        const check = handleCheck();
        if (!check) {
            navigate("/");
        } else {
            if (check.Role === "3") {
                getCountAPI();
            } else {
                navigate("/");
                alert("Bạn không có quyền vào trang này");
            }
        }
    }, []);

    return (
        <div className={cx("manage-information")}>
            <div className={cx("manage-information-header")}>
                <div className={cx("manage-information-header-user")}>
                    <h2 className={cx("manage-information-title")}>
                        TRANG CHỦ
                    </h2>
                    <div className={cx("manage-user")}>
                        <FaUserAlt className={cx("avatar-image")} />
                        <span className={cx("user-name")}> Xin chào Admin</span>
                    </div>
                </div>
                <div className={cx("manage-information-header-message")}>
                    CHÀO MỪNG BẠN ĐẾN VỚI TRANG QUẢN LÝ
                </div>
                <div className={cx("manage-information-header-content")}>
                    <div
                        className={cx("manage-information-header-content-item")}
                    >
                        <div className={cx("content")}>
                            <div className={cx("content-title")}>
                                TỔNG SỐ GIÁO VIÊN
                            </div>
                            <div className={cx("content-detail")}>
                                {countTeacher}
                            </div>
                        </div>
                        <div className={cx("icon-teacher")}>
                            <GiTeacher className={cx("icon-image")} />
                        </div>
                    </div>
                    <div
                        className={cx("manage-information-header-content-item")}
                    >
                        <div className={cx("content")}>
                            <div className={cx("content-title")}>
                                TỔNG SỐ HỌC SINH
                            </div>
                            <div className={cx("content-detail")}>
                                {countStudent}
                            </div>
                        </div>
                        <div className={cx("icon-student")}>
                            <BsPersonFill className={cx("icon-image")} />
                        </div>
                    </div>
                    <div
                        className={cx("manage-information-header-content-item")}
                    >
                        <div className={cx("content")}>
                            <div className={cx("content-title")}>
                                TỔNG SỐ LỚP
                            </div>
                            <div className={cx("content-detail")}>
                                {countClass}
                            </div>
                        </div>
                        <div className={cx("icon-class")}>
                            <MdOutlineClass className={cx("icon-image")} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Information;
