import * as classNames from "classnames/bind";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import styles from "./DetailResultStudent.module.scss";
import { Table } from "react-bootstrap";
import { getStudentResult } from "../../../../services/testService";
import { handleCheck } from "../../../../utils/common";

const cx = classNames.bind(styles);

function DetailResultStudent() {
    const { divisionId, semesterId, gradeName } = useParams();
    const [result, setResult] = useState([]);

    const getResult = async () => {
        const dataAPI = await getStudentResult(
            divisionId,
            gradeName,
            semesterId
        );

        setResult(dataAPI);
    };

    const navigate = useNavigate();

    useEffect(() => {
        const check = handleCheck();
        if (!check) {
            navigate("/");
        } else {
            if (check.Role === "1") getResult();
            else {
                navigate("/");
                alert("Bạn không có quyền vào trang này");
            }
        }
    }, [divisionId, semesterId]);

    return (
        <div className={cx("manage-list-student")}>
            <div className={cx("manage-list-student-content")}>
                <Table striped hover>
                    <thead>
                        <tr>
                            <th className={cx("table-head", "subject")}>
                                Môn học
                            </th>
                            <th className={cx("table-head")}>Hệ số 1</th>
                            <th className={cx("table-head")}>Hệ số 2</th>
                            <th className={cx("table-head")}>Hệ số 3</th>
                        </tr>
                    </thead>
                    <tbody>
                        {result.map((res) => {
                            return (
                                <tr key={res.subjectId}>
                                    <td className={cx("table-document")}>
                                        {res.subjectName}
                                    </td>
                                    <td
                                        className={cx(
                                            "table-document",
                                            res.factorOne.length &&
                                                "column-divide"
                                        )}
                                    >
                                        {res.factorOne.map((item) => {
                                            return (
                                                <td
                                                    className={cx(
                                                        "table-document"
                                                    )}
                                                    key={item.id}
                                                >
                                                    {item.mark}
                                                </td>
                                            );
                                        })}
                                    </td>
                                    <td className={cx("table-document")}>
                                        {res.factorTwo &&
                                            res.factorTwo.hasOwnProperty(
                                                "mark"
                                            ) &&
                                            res.factorTwo.mark}
                                    </td>
                                    <td className={cx("table-document")}>
                                        {res.factorThree &&
                                            res.factorThree.hasOwnProperty(
                                                "mark"
                                            ) &&
                                            res.factorThree.mark}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default DetailResultStudent;
