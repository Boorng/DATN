import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as classNames from "classnames/bind";

import styles from "./DetailConduct.module.scss";
import { getStudentClassAPI } from "../../../../services/studentClassService";
import { handleCheck } from "../../../../utils/common";
import { FaUserAlt } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { getSemesterAPI } from "../../../../services/semesterService";
import ListDetailConduct from "./ListDetailConduct";
import StatisticChartConduct from "./StatisticChart";

const cx = classNames.bind(styles);

function DetailConduct() {
    const { classId, className, academicYear, gradeName } = useParams();

    const [listStudentClass, setListStudentClass] = useState([]);
    const [isStatistic, setIsStatistic] = useState(false);
    const [listSemester, setListSemester] = useState([]);

    const handleShowStatistic = () => {
        setIsStatistic(!isStatistic);
    };

    const getStudentClass = async (search) => {
        const dataAPI = await getStudentClassAPI(classId, search);
        setListStudentClass(dataAPI);
    };

    const getSemester = async () => {
        const dataAPI = await getSemesterAPI(academicYear);
        setListSemester(dataAPI);
    };

    const navigate = useNavigate();

    useEffect(() => {
        const check = handleCheck();
        if (!check) {
            navigate("/");
        } else {
            if (check.Role === "3") {
                getStudentClass();
                getSemester();
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
                </h2>{" "}
                <div className={cx("manage-user")}>
                    <FaUserAlt className={cx("avatar-image")} />
                    <span className={cx("user-name")}> Xin chào Admin</span>
                </div>
            </div>
            <div className={cx("manage-list-student-content")}>
                <div className={cx("list-button")}>
                    <Button
                        className={cx("button-statistic")}
                        onClick={handleShowStatistic}
                    >
                        Thống kê danh hiệu thi đua
                    </Button>
                    {isStatistic && listSemester.length !== 0 && (
                        <StatisticChartConduct
                            show={isStatistic}
                            showStatistic={handleShowStatistic}
                            classId={classId}
                            className={className}
                            gradeName={gradeName}
                            academicYear={academicYear}
                            listSemester={listSemester}
                        />
                    )}
                </div>
                <ListDetailConduct
                    listStudentClass={listStudentClass}
                    getStudentClass={getStudentClass}
                    className={className}
                />
            </div>
        </div>
    );
}

export default DetailConduct;
