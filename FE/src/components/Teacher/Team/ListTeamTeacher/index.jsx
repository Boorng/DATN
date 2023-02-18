import * as classNames from "classnames/bind";
import { Table, Button } from "react-bootstrap";

import styles from "./ListTeamTeacher.module.scss";

const cx = classNames.bind(styles);

function ListTeamTeacher({ listTeacher }) {
    return (
        <div className={cx("list-teacher")}>
            <Table striped hover>
                <thead>
                    <tr>
                        <th className={cx("table-head")}>ID</th>
                        <th className={cx("table-head")}>Tên giáo viên</th>
                        <th className={cx("table-head")}>Email</th>
                        <th className={cx("table-head")}>Số điện thoại</th>
                        <th className={cx("table-head")}>Chức danh</th>
                        <th className={cx("table-head")}>
                            Tình trạng làm việc
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {listTeacher.map((tea) => {
                        return (
                            <tr key={tea.id}>
                                <td className={cx("table-document")}>
                                    {tea.id}
                                </td>
                                <td className={cx("table-document")}>
                                    {tea.fullName}{" "}
                                    {tea.leader
                                        ? "(Tổ trưởng)"
                                        : tea.viceLeader && "(Tổ phó)"}
                                </td>

                                <td className={cx("table-document")}>
                                    {tea.email}
                                </td>
                                <td className={cx("table-document")}>
                                    {tea.phone}
                                </td>

                                <td className={cx("table-document")}>
                                    {tea.level === 1
                                        ? "Cử nhân"
                                        : tea.level === 2
                                        ? "Thạc sĩ"
                                        : tea.level === 3
                                        ? "Tiến sĩ"
                                        : tea.level === 4
                                        ? "Phó giáo sư"
                                        : "Giáo sư"}
                                </td>
                                <td className={cx("table-document")}>
                                    {tea.status === 1
                                        ? "Đang làm"
                                        : "Nghỉ việc"}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    );
}

export default ListTeamTeacher;
