import * as classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import NavSemesterConductStudent from "../../components/NavSemesterConductStudent";

import { getSemesterAPI } from "../../services/semesterService";

import styles from "./DetailLayoutConductStudent.module.scss";

const cx = classNames.bind(styles);

function DetailLayoutConductStudent({ children }) {
    const {
        gradeName,
        className,
        classId,
        studentName,
        studentId,
        academicYear,
        divisionId,
    } = useParams();
    const [semester, setSemester] = useState([]);

    const getSemester = async () => {
        const dataAPI = await getSemesterAPI(academicYear);
        setSemester(dataAPI);
    };

    useEffect(() => {
        getSemester();
    }, [studentId]);

    return (
        <div className={cx("detail-layout")}>
            <div className={cx("detail-layout-header")}>
                <h2 className={cx("detail-layout-title")}>
                    KẾT QUẢ ĐÁNH GIÁ HẠNH KIỂM CỦA NĂM HỌC {academicYear}
                </h2>
                <div className={cx("manage-user")}>
                    <FaUserAlt className={cx("avatar-image")} />
                    <span className={cx("user-name")}>
                        Xin chào {studentName}
                    </span>
                </div>
            </div>

            <div className={cx("detail-layout-content")}>
                {semester.length > 0 && (
                    <NavSemesterConductStudent
                        semester={semester}
                        gradeName={gradeName}
                        className={className}
                        classId={classId}
                        studentName={studentName}
                        studentId={studentId}
                        academicYear={academicYear}
                        divisionId={divisionId}
                    />
                )}
                {semester.length === 0 && (
                    <div>
                        Không tìm thấy kết quả đánh giá do chưa có học kỳ nào
                        trong năm
                    </div>
                )}
                {children}
            </div>
        </div>
    );
}

export default DetailLayoutConductStudent;
