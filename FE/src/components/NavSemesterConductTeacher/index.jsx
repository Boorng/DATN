import * as classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";

import styles from "./NavSemesterConductTeacher.module.scss";

const cx = classNames.bind(styles);

function NavSemesterConductTeacher({
    semester,
    gradeName,
    className,
    classId,
    studentName,
    studentId,
    academicYear,
    teacherName,
    edit,
    divisionId,
}) {
    const [idActive, setIdActive] = useState("");
    const { semesterId } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        if (semesterId) {
            setIdActive(+semesterId);
        }
    }, [semesterId]);

    useEffect(() => {
        navigate(
            `/teacher/homeroom-class/conduct/${classId}/${className}/grade/${gradeName}/academicYear/${academicYear}/${
                edit ? "edit-" : ""
            }student/${studentName}/${studentId}/${divisionId}/${teacherName}/semester/${
                semester[semester.length - 1].name
            }/${semester[semester.length - 1].id}`
        );
    }, []);

    const handleClick = (id) => {
        setIdActive(id);
    };

    return (
        <div className={cx("nav-semester")}>
            {semester &&
                semester.map((item) => {
                    return (
                        <NavLink
                            to={`/teacher/homeroom-class/conduct/${classId}/${className}/grade/${gradeName}/academicYear/${academicYear}/${
                                edit ? "edit-" : ""
                            }student/${studentName}/${studentId}/${divisionId}/${teacherName}/semester/${
                                item.name
                            }/${item.id}`}
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

export default NavSemesterConductTeacher;
