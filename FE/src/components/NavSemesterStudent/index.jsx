import * as classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";

import styles from "./NavSemesterStudent.module.scss";

const cx = classNames.bind(styles);

function NavSemesterStudent({
    semester,
    gradeName,
    className,
    classId,
    studentName,
    divisionId,
    academicYear,
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
            `/student/result/grade/${gradeName}/class/${className}/academicYear/${academicYear}/${classId}/${studentName}/${divisionId}/semester/${
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
                    to={`/student/result/grade/${gradeName}/class/${className}/academicYear/${academicYear}/${classId}/${studentName}/${divisionId}/fullYear`}
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
                            to={`/student/result/grade/${gradeName}/class/${className}/academicYear/${academicYear}/${classId}/${studentName}/${divisionId}/semester/${item.name}/${item.id}`}
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

export default NavSemesterStudent;
