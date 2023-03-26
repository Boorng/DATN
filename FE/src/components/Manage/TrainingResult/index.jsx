import * as classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { FaUserAlt } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { checkYearAPI, getClassAPI } from "../../../services/classService";
import { getSemesterAPI } from "../../../services/semesterService";
import { handleCheck } from "../../../utils/common";
import StatisticChartConduct from "./DetailConduct/StatisticChart";
import FindConduct from "./FindConduct";

import styles from "./TrainingResult.module.scss";

const cx = classNames.bind(styles);

function TrainingResult() {
    const [listClass, setListClass] = useState([]);
    const [isStatistic, setIsStatistic] = useState(false);
    const [showInAca, setShowInAca] = useState(false);
    const [academicYear, setAcademicYear] = useState("");
    const [showErr, setShowErr] = useState(false);
    const [listSemester, setListSemester] = useState([]);

    const { gradeName } = useParams();

    const getClass = async (search) => {
        const dataAPI = await getClassAPI(gradeName, search);
        setListClass(dataAPI);
    };

    const getSemester = async () => {
        const dataAPI = await getSemesterAPI(academicYear);
        setListSemester(dataAPI);
    };

    const handleSearch = async (input) => {
        await getClass(input);
    };

    const navigate = useNavigate();

    useEffect(() => {
        const check = handleCheck();
        if (!check) {
            navigate("/");
        } else {
            if (check.Role === "3") {
                getClass();
                getSemester();
            } else {
                navigate("/");
                alert("Bạn không có quyền vào trang này");
            }
        }
    }, [gradeName]);

    const handleShowStatistic = () => {
        setIsStatistic(!isStatistic);
    };

    const handleShowInput = () => {
        setShowInAca(!showInAca);
    };

    const handleOnChange = (e) => {
        setAcademicYear(e.target.value);
    };

    const handleCheckYear = async () => {
        const resAPI = await checkYearAPI(academicYear);

        if (resAPI) {
            setIsStatistic(true);
        } else {
            setShowErr(true);
        }
        setShowInAca(false);
    };

    return (
        <div className={cx("manage-result")}>
            <div className={cx("manage-result-header")}>
                <h2 className={cx("manage-result-title")}>
                    KẾT QUẢ ĐÁNH GIÁ HẠNH KIỂM CỦA KHỐI {gradeName}
                </h2>
                <div className={cx("manage-user")}>
                    <FaUserAlt className={cx("avatar-image")} />
                    <span className={cx("user-name")}> Xin chào Admin</span>
                </div>
            </div>
            <div className={cx("manage-result-content")}>
                <div className={cx("list-result")}>
                    <FindConduct handleSearch={handleSearch} />
                    <Button
                        className={cx("button-statistic")}
                        onClick={handleShowInput}
                    >
                        Thống kê danh hiệu thi đua
                    </Button>

                    <Table striped hover>
                        <thead>
                            <tr>
                                <th className={cx("table-head")}>ID</th>
                                <th className={cx("table-head")}>Tên lớp</th>
                                <th className={cx("table-head")}>Khối</th>
                                <th className={cx("table-head")}>Năm học</th>
                                <th className={cx("table-head")}>Sĩ số</th>
                                <th className={cx("table-head")}>
                                    Giáo viên chủ nhiệm
                                </th>
                                <th className={cx("table-head")}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {listClass.map((cls) => {
                                return (
                                    <tr key={cls.id}>
                                        <td className={cx("table-document")}>
                                            {cls.id}
                                        </td>
                                        <td className={cx("table-document")}>
                                            {cls.name}
                                        </td>
                                        <td className={cx("table-document")}>
                                            {cls.grade}
                                        </td>
                                        <td className={cx("table-document")}>
                                            {cls.academicYear}
                                        </td>
                                        <td className={cx("table-document")}>
                                            {cls.countStudent}
                                        </td>
                                        <td className={cx("table-document")}>
                                            {cls.headerTeacherName}
                                        </td>

                                        <td className={cx("list-button")}>
                                            <Link
                                                className={cx("button-link")}
                                                to={`/manage/conduct/grade/${gradeName}/class/${cls.name}/academicYear/${cls.academicYear}/${cls.id}`}
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
            </div>
            {showInAca && (
                <Modal
                    show={showInAca}
                    onHide={() => setShowInAca(false)}
                    dialogClassName={cx("modal")}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <h3 className={cx("form-title")}>
                                Nhập năm học cần thống kê
                            </h3>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Control
                            className={cx("form-control")}
                            type="text"
                            placeholder="Nhập năm học"
                            required
                            onChange={handleOnChange}
                            value={academicYear}
                            name="academicYear"
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="success"
                            className={cx("button-success")}
                            onClick={handleCheckYear}
                        >
                            Xác nhận
                        </Button>
                        <Button
                            onClick={() => setShowInAca(false)}
                            variant="secondary"
                            className={cx("button-back")}
                        >
                            Quay lại
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}

            {showErr && (
                <Modal
                    show={showErr}
                    onHide={() => setShowErr(false)}
                    dialogClassName={cx("modal")}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <h3 className={cx("form-title")}>Cảnh báo</h3>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            Năm học bạn nhập không có dữ liệu trong hệ thống
                        </div>
                    </Modal.Body>
                </Modal>
            )}

            {isStatistic && (
                <StatisticChartConduct
                    show={isStatistic}
                    showStatistic={handleShowStatistic}
                    gradeName={gradeName}
                    academicYear={academicYear}
                    listSemester={listSemester}
                />
            )}
        </div>
    );
}

export default TrainingResult;
