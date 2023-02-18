import * as classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";

import styles from "./NavSemester.module.scss";

const cx = classNames.bind(styles);

function NavSemester({
    semester,
    gradeName,
    className,
    classId,
    studentName,
    divisionId,
    academicYear,
    edit,
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
        if (edit) {
            navigate(
                `/manage/result/grade/${gradeName}/class/${className}/academicYear/${academicYear}/${classId}/edit-student/${studentName}/${divisionId}/semester/${
                    semester[semester.length - 1].name
                }/${semester[semester.length - 1].id}`
            );
        } else {
            navigate(
                `/manage/result/grade/${gradeName}/class/${className}/academicYear/${academicYear}/${classId}/student/${studentName}/${divisionId}/semester/${
                    semester[semester.length - 1].name
                }/${semester[semester.length - 1].id}`
            );
        }
    }, []);

    const handleClick = (id) => {
        setIdActive(id);
    };

    return (
        <div className={cx("nav-semester")}>
            {!edit && semester.length > 1 && (
                <NavLink
                    to={`/manage/result/grade/${gradeName}/class/${className}/academicYear/${academicYear}/${classId}/student/${studentName}/${divisionId}/fullYear`}
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
                            to={
                                !edit
                                    ? `/manage/result/grade/${gradeName}/class/${className}/academicYear/${academicYear}/${classId}/student/${studentName}/${divisionId}/semester/${item.name}/${item.id}`
                                    : `/manage/result/grade/${gradeName}/class/${className}/academicYear/${academicYear}/${classId}/edit-student/${studentName}/${divisionId}/semester/${item.name}/${item.id}`
                            }
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

export default NavSemester;
