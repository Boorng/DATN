import { useEffect, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import * as classNames from "classnames/bind";
import { Bar } from "react-chartjs-2";

import styles from "./StatisticChartConduct.module.scss";
import { getStatisticAPI } from "../../../../../services/testService";
import { getAllConductAPI } from "../../../../../services/conductService";

const cx = classNames.bind(styles);

function StatisticChartConduct({
    show,
    showStatistic,
    classId,
    className,
    gradeName,
    academicYear,
    listSemester,
}) {
    const [data, setData] = useState({
        labels: [
            "Học sinh giỏi",
            "Học sinh tiên tiến",
            "Học sinh trung bình",
            "Không đạt",
        ],
    });
    const [semesterName, setSemesterName] = useState("");
    const [semesterId, setSemesterId] = useState("");
    const [dataAPI, setDataAPI] = useState([]);
    const [conductAPI, setConductAPI] = useState([]);

    const handleOnChange = (e) => {
        setSemesterName(e.target.options[e.target.selectedIndex].text);
        setSemesterId(e.target.value);
    };

    const checkDataSemester = () => {
        const dataCheck = dataAPI.map((item) => {
            return {
                ...item,
                evaluate:
                    conductAPI.find((c) => c.studentId === item.studentId) !==
                    undefined
                        ? conductAPI.find((c) => c.studentId === item.studentId)
                              .evaluate
                        : "",
            };
        });

        let countGood = 0;
        let countMedium = 0;
        let countWeak = 0;
        let countNotPass = 0;

        if (semesterName[semesterName.length - 1] === "1") {
            countGood = dataCheck.filter(
                (item) =>
                    item.averageMarkSemesterOne <= 10 &&
                    item.averageMarkSemesterOne >= 8 &&
                    item.evaluate === "Tốt"
            ).length;

            countMedium = dataCheck.filter(
                (item) =>
                    item.averageMarkSemesterOne < 8 &&
                    item.averageMarkSemesterOne >= 5 &&
                    item.evaluate !== "Yếu"
            ).length;

            countWeak = dataCheck.filter(
                (item) =>
                    item.averageMarkSemesterOne < 5 &&
                    item.averageMarkSemesterOne >= 3.5
            ).length;

            countNotPass = dataCheck.filter(
                (item) => item.averageMarkSemesterOne < 3.5
            ).length;
        } else {
            countGood = dataCheck.filter(
                (item) =>
                    (item.averageMarkSemesterTwo * 2 +
                        item.averageMarkSemesterOne) /
                        3 <=
                        10 &&
                    (item.averageMarkSemesterTwo * 2 +
                        item.averageMarkSemesterOne) /
                        3 >=
                        8 &&
                    item.evaluate === "Tốt"
            ).length;

            countMedium = dataCheck.filter(
                (item) =>
                    (item.averageMarkSemesterTwo * 2 +
                        item.averageMarkSemesterOne) /
                        3 <
                        8 &&
                    (item.averageMarkSemesterTwo * 2 +
                        item.averageMarkSemesterOne) /
                        3 >=
                        6.5 &&
                    item.evaluate !== "Yếu"
            ).length;

            countWeak = dataCheck.filter(
                (item) =>
                    (item.averageMarkSemesterTwo * 2 +
                        item.averageMarkSemesterOne) /
                        3 <
                        5 &&
                    (item.averageMarkSemesterTwo * 2 +
                        item.averageMarkSemesterOne) /
                        3 >=
                        3.5
            ).length;

            countNotPass = dataCheck.filter(
                (item) =>
                    (item.averageMarkSemesterTwo * 2 +
                        item.averageMarkSemesterOne) /
                        3 <
                    3.5
            ).length;
        }
        const datasets = [
            {
                label: "",
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                    "rgba(255, 205, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                ],
                borderColor: [
                    "rgb(255, 99, 132)",
                    "rgb(255, 159, 64)",
                    "rgb(255, 205, 86)",
                    "rgb(75, 192, 192)",
                ],
                borderWidth: 1,
                data: [countGood, countMedium, countWeak, countNotPass],
            },
        ];

        setData({ ...data, datasets: datasets });
    };

    const getStatistic = async () => {
        if (!classId) classId = "";
        const resAPI = await getStatisticAPI(academicYear, gradeName, classId);

        setDataAPI(resAPI);
    };

    const getConduct = async () => {
        if (!classId) classId = "";

        const resConductAPI = await getAllConductAPI(
            semesterId ? semesterId : listSemester[listSemester.length - 1].id,
            classId,
            gradeName
        );

        setConductAPI(resConductAPI);
    };

    useEffect(() => {
        getStatistic();
        setSemesterName(listSemester[listSemester.length - 1].name);
        setSemesterId(listSemester[listSemester.length - 1].id);
    }, []);

    useEffect(() => {
        getConduct();
    }, [semesterId]);

    useEffect(() => {
        checkDataSemester();
    }, [semesterId, conductAPI, dataAPI]);

    console.log(conductAPI);

    return (
        <Modal show={show} onHide={showStatistic} dialogClassName={cx("modal")}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <h3 className={cx("form-title")}>
                        THỐNG KÊ DANH HIỆU THI ĐUA {semesterName} CỦA{" "}
                        {className ? `LỚP ${className}` : `KHỐI ${gradeName}`}
                    </h3>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Select
                    className={cx("form-select")}
                    onChange={handleOnChange}
                    name="semester"
                    value={semesterId}
                >
                    {listSemester.map((item) => (
                        <option value={item.id} key={item.id}>
                            {item.name}
                        </option>
                    ))}
                </Form.Select>
                {data.hasOwnProperty("datasets") && (
                    <Bar
                        data={data}
                        options={{
                            elements: {
                                bar: {
                                    borderWidth: 2,
                                },
                            },
                            responsive: true,
                            plugins: {
                                legend: {
                                    display: false,
                                },
                            },
                        }}
                    />
                )}
            </Modal.Body>
        </Modal>
    );
}

export default StatisticChartConduct;
