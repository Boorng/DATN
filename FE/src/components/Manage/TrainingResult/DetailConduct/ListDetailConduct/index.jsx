import * as classNames from "classnames/bind";
import { Table } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

import styles from "./ListDetailConduct.module.scss";

const cx = classNames.bind(styles);

function ListDetailConduct({ listStudentClass, getStudentClass, className }) {
    const { gradeName, academicYear, classId } = useParams();

    return (
        <div className={cx("list-student-class")}>
            <Table striped hover>
                <thead>
                    <tr>
                        <th className={cx("table-head")}>STT</th>
                        <th className={cx("table-head")}>ID</th>
                        <th className={cx("table-head")}>Họ và tên</th>
                        <th className={cx("table-head")}>Số điện thoại</th>
                        <th className={cx("table-head")}>Tình trạng học tập</th>
                        <th className={cx("table-head")}></th>
                    </tr>
                </thead>
                <tbody>
                    {listStudentClass.map((sc, index) => {
                        return (
                            <tr key={sc.id}>
                                <td className={cx("table-document")}>
                                    {index + 1}
                                </td>
                                <td className={cx("table-document")}>
                                    {sc.studentId}
                                </td>
                                <td className={cx("table-document")}>
                                    {sc.fullName}
                                </td>
                                <td className={cx("table-document")}>
                                    {sc.phone}
                                </td>
                                <td className={cx("table-document")}>
                                    {sc.status === 0 ? "Nghỉ học" : "Đang học"}
                                </td>

                                <td className={cx("list-button")}>
                                    <Link
                                        className={cx(
                                            "button",
                                            "button-detail"
                                        )}
                                        to={`/manage/conduct/grade/${gradeName}/class/${className}/academicYear/${academicYear}/${classId}/student/${sc.fullName}/${sc.studentId}/${sc.id}`}
                                    >
                                        Xem chi tiết
                                    </Link>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    );
}

export default ListDetailConduct;
