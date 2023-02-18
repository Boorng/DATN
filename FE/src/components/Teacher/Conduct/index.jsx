import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as classNames from "classnames/bind";
import { FaUserAlt } from "react-icons/fa";
import { Image } from "react-bootstrap";

import styles from "./ConductTeacher.module.scss";
import { getTeacherByAccount } from "../../../services/teacherService";
import { handleCheck } from "../../../utils/common";
import { getStudentClassAPI } from "../../../services/studentClassService";
import ListStudentConduct from "./ListStudentConduct";

const cx = classNames.bind(styles);

function ConductTeacher() {
    const { classId, className, academicYear } = useParams();

    const [listStudentClass, setListStudentClass] = useState([]);
    const [teacher, setTeacher] = useState({});

    const getStudentClass = async () => {
        const dataAPI = await getStudentClassAPI(classId);
        setListStudentClass(dataAPI);
    };

    const getInformation = async (accountId) => {
        const data = await getTeacherByAccount(accountId);
        setTeacher(data);
    };

    const navigate = useNavigate();

    useEffect(() => {
        const check = handleCheck();
        if (!check) {
            navigate("/");
        } else {
            if (check.Role === "2") {
                getInformation(check.Id);
                getStudentClass();
            } else {
                navigate("/");
                alert("Bạn không có quyền vào trang này");
            }
        }
    }, [classId]);

    return (
        <div className={cx("manage-list-student")}>
            <div className={cx("manage-list-student-header")}>
                <h2 className={cx("manage-list-student-title")}>
                    DANH SÁCH HỌC SINH LỚP {className} NĂM HỌC {academicYear}
                </h2>
                <div className={cx("teacher-user")}>
                    {teacher.avatar ? (
                        <Image
                            src={teacher.avatar}
                            alt="Avatar"
                            className={cx("avatar-image")}
                        />
                    ) : (
                        <FaUserAlt className={cx("avatar-image")} />
                    )}
                    <span className={cx("user-name")}>
                        Xin chào {teacher.fullName}
                    </span>
                </div>
            </div>
            <div className={cx("manage-list-student-content")}>
                <div className={cx("manage-list-student-container")}>
                    <ListStudentConduct
                        listStudentClass={listStudentClass}
                        teacher={teacher}
                    />
                </div>
            </div>
        </div>
    );
}

export default ConductTeacher;
