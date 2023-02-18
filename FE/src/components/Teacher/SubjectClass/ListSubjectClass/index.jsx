import { Table } from "react-bootstrap";
import * as classNames from "classnames/bind";

import styles from "./ListSubjectClass.module.scss";
import { Fragment } from "react";

const cx = classNames.bind(styles);

function ListSubjectClass({ listTestStudent }) {
    return (
        <div>
            <Table striped>
                <thead>
                    <tr>
                        <th className={cx("table-head")}>ID</th>
                        <th className={cx("table-head")}>Họ và tên</th>
                        <th className={cx("table-head")}>Hệ số 1</th>
                        <th className={cx("table-head")}>Hệ số 2</th>
                        <th className={cx("table-head")}>Hệ số 3</th>
                    </tr>
                </thead>
                <tbody>
                    {listTestStudent.map((sc) => {
                        return (
                            <tr key={sc.divisionId}>
                                <td className={cx("table-document")}>
                                    {sc.studentId}
                                </td>
                                <td className={cx("table-document")}>
                                    {sc.studentName}
                                </td>
                                <td
                                    className={cx(
                                        "table-document",
                                        sc.factorOne.length && "column-divide"
                                    )}
                                >
                                    {sc.factorOne.map((item) => {
                                        return (
                                            <td
                                                className={cx("table-document")}
                                                key={item.id}
                                            >
                                                {item.mark}
                                            </td>
                                        );
                                    })}
                                </td>
                                <td className={cx("table-document")}>
                                    {sc.factorTwo &&
                                        sc.factorTwo.hasOwnProperty("mark") &&
                                        sc.factorTwo.mark}
                                </td>
                                <td className={cx("table-document")}>
                                    {sc.factorThree &&
                                        sc.factorThree.hasOwnProperty("mark") &&
                                        sc.factorThree.mark}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    );
}

export default ListSubjectClass;
