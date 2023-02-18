import * as classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";

import styles from "./NavSemesterTeacher.module.scss";

const cx = classNames.bind(styles);

function NavSemesterTeacher({
    semester,
    gradeName,
    className,
    classId,
    studentName,
    divisionId,
    academicYear,
    teacherName,
}) {
    const [idActive, setIdActive] = useState("");
    const { semesterId } = useParams();

    const navigate = useNavigate();

    const summary = { id: 0, name: "Tổng kết" };

    useEffect(() => {
        if (semesterId) {
            setIdActive(+semesterId);
        }
    }, [semesterId]);

    useEffect(() => {
        navigate(
            `/teacher/homeroom-class/result/${classId}/${className}/grade/${gradeName}/academicYear/${academicYear}/student/${studentName}/${divisionId}/${teacherName}/semester/${
                semester[semester.length - 1].name
            }/${semester[semester.length - 1].id}`
        );
    }, []);

    const handleClick = (id) => {
        setIdActive(id);
    };

    return (
        <div className={cx("nav-semester")}>
            {semester.length > 1 && (
                <NavLink
                    to={`/teacher/homeroom-class/result/${classId}/${className}/grade/${gradeName}/academicYear/${academicYear}/student/${studentName}/${divisionId}/${teacherName}/fullYear`}
                    className={cx(
                        "nav-semester-link",
                        summary.id === idActive && "active"
                    )}
                    onClick={() => handleClick(summary.id)}
                >
                    {summary.name}
                </NavLink>
            )}
            {semester &&
                semester.map((item) => {
                    return (
                        <NavLink
                            to={`/teacher/homeroom-class/result/${classId}/${className}/grade/${gradeName}/academicYear/${academicYear}/student/${studentName}/${divisionId}/${teacherName}/semester/${item.name}/${item.id}`}
                            key={item.id}
                            className={cx(
                                "nav-semester-link",
                                item.id === idActive && "active"
                            )}
                            onClick={() => handleClick(item.id)}
                        >
                            {item.name}
                        </NavLink>
                    );
                })}
        </div>
    );
}

export default NavSemesterTeacher;
