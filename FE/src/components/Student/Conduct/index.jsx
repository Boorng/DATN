import * as classNames from "classnames/bind";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useEffect, useRef, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

import { getTeacherByClassId } from "../../../services/classService";
import { getConductByStudentIdAPI } from "../../../services/conductService";
import { getSummaryResultAPI } from "../../../services/testService";
import { handleCheck } from "../../../utils/common";

import styles from "./ConductStudent.module.scss";

const cx = classNames.bind(styles);

function ConductStudent() {
    const {
        semesterName,
        semesterId,
        academicYear,
        studentName,
        studentId,
        className,
        divisionId,
        gradeName,
        classId,
    } = useParams();

    const pdfRef = useRef();

    const [result, setResult] = useState([]);
    const [conduct, setConduct] = useState({});
    const [ability, setAbility] = useState("");
    const [title, setTitle] = useState("");
    const [teacherName, setTeacherName] = useState("");

    const navigate = useNavigate();

    const getSummary = async () => {
        const dataResAPI = await getSummaryResultAPI(
            divisionId,
            gradeName,
            academicYear
        );
        const dataConductAPI = await getConductByStudentIdAPI(
            studentId,
            semesterId
        );

        const teacherNameAPI = await getTeacherByClassId(classId);

        let average = 0;

        if (semesterName[semesterName.length - 1] === "1") {
            average =
                dataResAPI.reduce(
                    (sum, current) => sum + current.averageOne,
                    0
                ) / result.length;
        } else {
            average =
                (dataResAPI.reduce(
                    (sum, current) => sum + current.averageOne,
                    0
                ) /
                    dataResAPI.length +
                    (dataResAPI.reduce(
                        (sum, current) => sum + current.averageTwo,
                        0
                    ) /
                        dataResAPI.length) *
                        2) /
                3;
        }

        const abilityRes =
            average >= 8
                ? "Giỏi"
                : average >= 6.5
                ? "Khá"
                : average >= 5
                ? "Trung bình"
                : average >= 3.5
                ? "Yếu"
                : "Kém";

        let titleSet = "";

        if (abilityRes === "Giỏi") {
            if (dataConductAPI.evaluate === "Tốt") {
                titleSet = "HS Giỏi";
            } else if (dataConductAPI.evaluate === "Khá") {
                titleSet = "HS Tiên tiến";
            } else {
                titleSet = "HS Trung bình";
            }
        } else if (abilityRes === "Khá") {
            if (
                dataConductAPI.evaluate === "Tốt" ||
                dataConductAPI.evaluate === "Khá"
            ) {
                titleSet = "HS Tiên tiến";
            } else {
                titleSet = "HS Trung bình";
            }
        } else {
            titleSet = "HS Trung bình";
        }

        setTitle(titleSet);
        setAbility(abilityRes);
        setResult(dataResAPI);
        setConduct(dataConductAPI);
        setTeacherName(teacherNameAPI);
    };

    const getConduct = async () => {};

    const getData = async () => {
        await getSummary();
        await getConduct();
    };

    useEffect(() => {
        const check = handleCheck();
        if (!check) {
            navigate("/");
        } else {
            if (check.Role === "1") getData();
            else {
                navigate("/");
                alert("Bạn không có quyền vào trang này");
            }
        }
    }, [divisionId, semesterId]);

    useEffect(() => {}, [semesterId]);

    return (
        <div className={cx("detail-conduct-teacher")}>
            <div ref={pdfRef}>
                <div className={cx("detail-conduct-teacher-header")}>
                    <h2 className={cx("detail-conduct-teacher-title")}>
                        PHIẾU ĐIỂM HỌC KỲ {semesterName} - NĂM HỌC{" "}
                        {academicYear}
                    </h2>
                    <div className={cx("detail-conduct-teacher-title-wrap")}>
                        <Row className="mb-3">
                            <span
                                className={cx(
                                    "detail-conduct-teacher-title-content"
                                )}
                            >
                                Giáo viên chủ nhiệm: {teacherName}
                            </span>
                        </Row>
                        <Row>
                            <Col xs={6}>
                                <span
                                    className={cx(
                                        "detail-conduct-teacher-title-content"
                                    )}
                                >
                                    Họ và tên: {studentName}
                                </span>
                            </Col>
                            <Col xs={4}>
                                <span
                                    className={cx(
                                        "detail-conduct-teacher-title-content"
                                    )}
                                >
                                    MHS: {studentId}
                                </span>
                            </Col>
                            <Col xs={2}>
                                <span
                                    className={cx(
                                        "detail-conduct-teacher-title-content"
                                    )}
                                >
                                    Lớp: {className}
                                </span>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div className={cx("detail-conduct-teacher-content")}>
                    <table className={cx("detail-conduct-teacher-table")}>
                        <thead>
                            <tr>
                                <th
                                    className={cx(
                                        "detail-conduct-teacher-table-header"
                                    )}
                                >
                                    STT
                                </th>
                                <th
                                    className={cx(
                                        "detail-conduct-teacher-table-header",
                                        "detail-conduct-teacher-table-header-subject"
                                    )}
                                >
                                    MÔN HỌC
                                </th>
                                <th
                                    className={cx(
                                        "detail-conduct-teacher-table-header"
                                    )}
                                >
                                    ĐIỂM TRUNG BÌNH
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {result.map((res, index) => {
                                return (
                                    <tr key={res.subjectId}>
                                        <td className={cx("table-document")}>
                                            {index + 1}
                                        </td>
                                        <td className={cx("table-document")}>
                                            {res.subjectName}
                                        </td>
                                        <td className={cx("table-document")}>
                                            {semesterName[
                                                semesterName.length - 1
                                            ] === "1"
                                                ? res.averageOne
                                                : (res.averageOne +
                                                      res.averageTwo * 2) /
                                                  3}
                                        </td>
                                    </tr>
                                );
                            })}
                            <tr>
                                <td className={cx("table-document")}></td>
                                <td className={cx("table-document", "summary")}>
                                    TB các môn
                                </td>
                                <td className={cx("table-document", "summary")}>
                                    {semesterName[semesterName.length - 1] ===
                                    "1"
                                        ? result.reduce(
                                              (sum, current) =>
                                                  sum + current.averageOne,
                                              0
                                          ) / result.length
                                        : (result.reduce(
                                              (sum, current) =>
                                                  sum + current.averageOne,
                                              0
                                          ) /
                                              result.length +
                                              (result.reduce(
                                                  (sum, current) =>
                                                      sum + current.averageTwo,
                                                  0
                                              ) /
                                                  result.length) *
                                                  2) /
                                          3}
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <table
                        className={cx(
                            "detail-conduct-teacher-table",
                            "conduct"
                        )}
                    >
                        <thead>
                            <tr>
                                <th
                                    className={cx(
                                        "detail-conduct-teacher-table-header"
                                    )}
                                >
                                    XẾP LOẠI
                                </th>
                                <th
                                    className={cx(
                                        "detail-conduct-teacher-table-header"
                                    )}
                                >
                                    HỌC KỲ {semesterName}
                                </th>
                                <th
                                    className={cx(
                                        "detail-conduct-teacher-table-header",
                                        "comment"
                                    )}
                                >
                                    NHẬN XÉT
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className={cx("table-document", "summary")}>
                                    Học lực
                                </td>
                                <td className={cx("table-document")}>
                                    {ability}
                                </td>
                                <td
                                    className={cx("table-document")}
                                    rowSpan={3}
                                >
                                    {conduct.comment ? conduct.comment : ""}
                                </td>
                            </tr>
                            <tr>
                                <td className={cx("table-document", "summary")}>
                                    Hạnh kiểm
                                </td>
                                <td className={cx("table-document")}>
                                    {conduct.evaluate ? conduct.evaluate : ""}
                                </td>
                            </tr>
                            <tr>
                                <td className={cx("table-document", "summary")}>
                                    Danh hiệu thi đua
                                </td>
                                <td className={cx("table-document")}>
                                    {title}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ConductStudent;
