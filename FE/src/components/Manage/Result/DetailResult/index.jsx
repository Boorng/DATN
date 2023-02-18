import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as classNames from "classnames/bind";

import styles from "./DetailResult.module.scss";
import { getStudentClassAPI } from "../../../../services/studentClassService";
import ListDetailResult from "./ListDetailResult";
import { handleCheck } from "../../../../utils/common";
import { FaUserAlt } from "react-icons/fa";
import { Button } from "react-bootstrap";
import StatisticChart from "./StatisticChart";
import { getSemesterAPI } from "../../../../services/semesterService";

const cx = classNames.bind(styles);

function DetailResult() {
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
                        Thống kê kết quả học tập
                    </Button>
                    {isStatistic && (
                        <StatisticChart
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
                <ListDetailResult
                    listStudentClass={listStudentClass}
                    getStudentClass={getStudentClass}
                    className={className}
                />
            </div>
        </div>
    );
}

export default DetailResult;
