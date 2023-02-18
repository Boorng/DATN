import * as classNames from "classnames/bind";
import { Button, Table } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

import styles from "./ListStudentConduct.module.scss";

const cx = classNames.bind(styles);

function ListStudentConduct({ listStudentClass, teacher }) {
    const { gradeName, academicYear, classId, className } = useParams();
    return (
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
                            <td className={cx("table-document")}>{sc.phone}</td>
                            <td className={cx("table-document")}>
                                {sc.status === 0 ? "Nghỉ học" : "Đang học"}
                            </td>

                            <td className={cx("list-button")}>
                                <Link
                                    className={cx("button", "button-update")}
                                    to={`/teacher/homeroom-class/conduct/${classId}/${className}/grade/${gradeName}/academicYear/${academicYear}/edit-student/${sc.fullName}/${sc.studentId}/${sc.id}/${teacher.fullName}`}
                                >
                                    Cập nhật
                                </Link>
                                <Link
                                    className={cx("button", "button-detail")}
                                    to={`/teacher/homeroom-class/conduct/${classId}/${className}/grade/${gradeName}/academicYear/${academicYear}/student/${sc.fullName}/${sc.studentId}/${sc.id}/${teacher.fullName}`}
                                >
                                    Xem chi tiết
                                </Link>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    );
}

export default ListStudentConduct;
