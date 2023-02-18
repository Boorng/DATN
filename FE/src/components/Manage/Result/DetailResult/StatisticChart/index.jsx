import { useEffect, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import * as classNames from "classnames/bind";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";

import styles from "./StatisticChart.module.scss";
import { getStatisticAPI } from "../../../../../services/testService";
import { getSemesterAPI } from "../../../../../services/semesterService";

const cx = classNames.bind(styles);

function StatisticChart({
    show,
    showStatistic,
    classId,
    className,
    gradeName,
    academicYear,
    listSemester,
}) {
    const [data, setData] = useState({
        labels: ["8 - 10", "6.5 - 8", "5 - 6.5", "3.5 - 5", "0 - 3.5"],
    });
    const [semesterName, setSemesterName] = useState("");
    const [dataAPI, setDataAPI] = useState([]);

    const handleOnChange = (e) => {
        const semesterNameSelect = e.target.value;
        setSemesterName(semesterNameSelect);
    };

    const checkDataSemester = () => {
        let countVeryGood = 0;
        let countGood = 0;
        let countMedium = 0;
        let CountWeak = 0;
        let CountVeryWeak = 0;
        if (semesterName[semesterName.length - 1] === "1") {
            countVeryGood = dataAPI.filter(
                (item) =>
                    item.averageMarkSemesterOne <= 10 &&
                    item.averageMarkSemesterOne >= 8
            ).length;

            countGood = dataAPI.filter(
                (item) =>
                    item.averageMarkSemesterOne < 8 &&
                    item.averageMarkSemesterOne >= 6.5
            ).length;

            countMedium = dataAPI.filter(
                (item) =>
                    item.averageMarkSemesterOne < 6.5 &&
                    item.averageMarkSemesterOne >= 5
            ).length;

            CountWeak = dataAPI.filter(
                (item) =>
                    item.averageMarkSemesterOne < 5 &&
                    item.averageMarkSemesterOne >= 3.5
            ).length;

            CountVeryWeak = dataAPI.filter(
                (item) => item.averageMarkSemesterOne < 3.5
            ).length;
        } else if (semesterName[semesterName.length - 1] === "2") {
            countVeryGood = dataAPI.filter(
                (item) =>
                    item.averageMarkSemesterTwo <= 10 &&
                    item.averageMarkSemesterTwo >= 8
            ).length;

            countGood = dataAPI.filter(
                (item) =>
                    item.averageMarkSemesterTwo < 8 &&
                    item.averageMarkSemesterTwo >= 6.5
            ).length;

            countMedium = dataAPI.filter(
                (item) =>
                    item.averageMarkSemesterTwo < 6.5 &&
                    item.averageMarkSemesterTwo >= 5
            ).length;

            CountWeak = dataAPI.filter(
                (item) =>
                    item.averageMarkSemesterTwo < 5 &&
                    item.averageMarkSemesterTwo >= 3.5
            ).length;

            CountVeryWeak = dataAPI.filter(
                (item) => item.averageMarkSemesterTwo < 3.5
            ).length;
        } else {
            countVeryGood = dataAPI.filter(
                (item) =>
                    (item.averageMarkSemesterTwo * 2 +
                        item.averageMarkSemesterOne) /
                        3 <=
                        10 &&
                    (item.averageMarkSemesterTwo * 2 +
                        item.averageMarkSemesterOne) /
                        3 >=
                        8
            ).length;

            countGood = dataAPI.filter(
                (item) =>
                    (item.averageMarkSemesterTwo * 2 +
                        item.averageMarkSemesterOne) /
                        3 <
                        8 &&
                    (item.averageMarkSemesterTwo * 2 +
                        item.averageMarkSemesterOne) /
                        3 >=
                        6.5
            ).length;

            countMedium = dataAPI.filter(
                (item) =>
                    (item.averageMarkSemesterTwo * 2 +
                        item.averageMarkSemesterOne) /
                        3 <
                        6.5 &&
                    (item.averageMarkSemesterTwo * 2 +
                        item.averageMarkSemesterOne) /
                        3 >=
                        5
            ).length;

            CountWeak = dataAPI.filter(
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

            CountVeryWeak = dataAPI.filter(
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
                    "rgba(54, 162, 235, 0.2)",
                ],
                borderColor: [
                    "rgb(255, 99, 132)",
                    "rgb(255, 159, 64)",
                    "rgb(255, 205, 86)",
                    "rgb(75, 192, 192)",
                    "rgb(54, 162, 235)",
                ],
                borderWidth: 1,
                data: [
                    countVeryGood,
                    countGood,
                    countMedium,
                    CountWeak,
                    CountVeryWeak,
                ],
            },
        ];

        setData({ ...data, datasets: datasets });
    };

    const getStatistic = async () => {
        if (!classId) classId = "";
        const resAPI = await getStatisticAPI(academicYear, gradeName, classId);
        setDataAPI(resAPI);
    };

    useEffect(() => {
        getStatistic();
        setSemesterName(listSemester[listSemester.length - 1].name);
    }, []);

    useEffect(() => {
        checkDataSemester();
    }, [semesterName, dataAPI]);

    return (
        <Modal show={show} onHide={showStatistic} dialogClassName={cx("modal")}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <h3 className={cx("form-title")}>
                        THỐNG KÊ KẾT QUẢ HỌC TẬP {semesterName} CỦA{" "}
                        {className ? `LỚP ${className}` : `KHỐI ${gradeName}`}
                    </h3>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Select
                    className={cx("form-select")}
                    onChange={handleOnChange}
                    name="semester"
                    value={semesterName}
                >
                    <option value={academicYear}>{academicYear}</option>
                    {listSemester.map((item) => (
                        <option value={item.name} key={item.id}>
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

export default StatisticChart;
