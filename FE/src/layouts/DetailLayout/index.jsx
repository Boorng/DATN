import * as classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";

import NavSemester from "../../components/NavSemester";
import { getSemesterAPI } from "../../services/semesterService";

import styles from "./DetailLayout.module.scss";

const cx = classNames.bind(styles);

function DetailLayout({ children }) {
    const {
        gradeName,
        className,
        classId,
        studentName,
        divisionId,
        academicYear,
    } = useParams();
    const [semester, setSemester] = useState([]);

    const getSemester = async () => {
        const dataAPI = await getSemesterAPI(academicYear);
        setSemester(dataAPI);
    };

    useEffect(() => {
        getSemester();
    }, [divisionId]);

    return (
        <div className={cx("detail-layout")}>
            <div className={cx("detail-layout-header")}>
                <h2 className={cx("detail-layout-title")}>
                    KẾT QUẢ HỌC TẬP CỦA CỦA HỌC SINH {studentName} LỚP{" "}
                    {className} NĂM HỌC {academicYear}
                </h2>
                <div className={cx("manage-user")}>
                    <FaUserAlt className={cx("avatar-image")} />
                    <span className={cx("user-name")}> Xin chào Admin</span>
                </div>
            </div>

            <div className={cx("detail-layout-content")}>
                {semester.length > 0 && (
                    <NavSemester
                        semester={semester}
                        gradeName={gradeName}
                        className={className}
                        classId={classId}
                        studentName={studentName}
                        divisionId={divisionId}
                        academicYear={academicYear}
                    />
                )}
                {semester.length === 0 && (
                    <div>
                        Không tìm thấy kết quả học tập do chưa có học kỳ nào
                        trong năm
                    </div>
                )}
                {children}
            </div>
        </div>
    );
}

export default DetailLayout;
