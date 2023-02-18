import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import * as classNames from "classnames/bind";

import styles from "./SummaryResult.module.scss";
import { getSummaryResultAPI } from "../../../../../services/testService";
import { handleCheck } from "../../../../../utils/common";

const cx = classNames.bind(styles);

function SummaryResult() {
    const { gradeName, divisionId, academicYear } = useParams();
    const [result, setResult] = useState([]);

    const getSummary = async () => {
        const dataAPI = await getSummaryResultAPI(
            divisionId,
            gradeName,
            academicYear
        );
        setResult(dataAPI);
    };

    const navigate = useNavigate();

    useEffect(() => {
        const check = handleCheck();
        if (!check) {
            navigate("/");
        } else {
            if (check.Role === "3") getSummary();
            else {
                navigate("/");
                alert("Bạn không có quyền vào trang này");
            }
        }
    }, [divisionId]);

    return (
        <div className={cx("summary-result")}>
            <Table striped hover>
                <thead>
                    <tr>
                        <th className={cx("table-head", "subject")}>Môn học</th>
                        <th className={cx("table-head")}>
                            Điểm trung bình học kỳ I
                        </th>
                        <th className={cx("table-head")}>
                            Điểm trung bình học kỳ II
                        </th>
                        <th className={cx("table-head")}>Điểm tổng kết</th>
                    </tr>
                </thead>
                <tbody>
                    {result.map((res) => {
                        return (
                            <tr key={res.subjectId}>
                                <td className={cx("table-document")}>
                                    {res.subjectName}
                                </td>
                                <td className={cx("table-document")}>
                                    {res.averageOne}
                                </td>
                                <td className={cx("table-document")}>
                                    {res.averageTwo}
                                </td>
                                <td className={cx("table-document")}>
                                    {(res.averageOne + res.averageTwo * 2) / 3}
                                </td>
                            </tr>
                        );
                    })}
                    <tr>
                        <td className={cx("table-document", "summary")}>
                            Tổng kết
                        </td>
                        <td className={cx("table-document", "summary")}>
                            {result.reduce(
                                (sum, current) => sum + current.averageOne,
                                0
                            ) / result.length}
                        </td>
                        <td className={cx("table-document", "summary")}>
                            {result.reduce(
                                (sum, current) => sum + current.averageTwo,
                                0
                            ) / result.length}
                        </td>
                        <td className={cx("table-document", "summary")}>
                            {(result.reduce(
                                (sum, current) => sum + current.averageOne,
                                0
                            ) /
                                result.length +
                                (result.reduce(
                                    (sum, current) => sum + current.averageTwo,
                                    0
                                ) /
                                    result.length) *
                                    2) /
                                3}
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
}

export default SummaryResult;
