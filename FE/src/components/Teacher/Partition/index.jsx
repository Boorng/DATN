import * as classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Col, Form, Image, Row } from "react-bootstrap";
import { FaUserAlt } from "react-icons/fa";

import { getTeacherByAccount } from "../../../services/teacherService";
import { getByTeacherIdAPI } from "../../../services/assignService";
import styles from "./Partition.module.scss";
import { useNavigate } from "react-router-dom";
import { handleCheck } from "../../../utils/common";
import { getSemesterAPI } from "../../../services/semesterService";
import ListPartition from "./ListPartition";

const cx = classNames.bind(styles);

function Partition() {
    const [teacher, setTeacher] = useState({});
    const [listSemester, setListSemester] = useState([]);
    const [semesterId, setSemesterId] = useState("");
    const [semesterName, setSemesterName] = useState("");
    const [listAssign, setListAssign] = useState([]);

    const navigate = useNavigate();

    const getInformation = async (accountId) => {
        const data = await getTeacherByAccount(accountId);
        setTeacher(data);
    };

    const getAssign = async () => {
        if (semesterId && teacher.id) {
            const data = await getByTeacherIdAPI(teacher.id, semesterId);
            setListAssign(data);
        }
    };

    const handleOnChange = (e) => {
        setSemesterId(e.target.value);
        setSemesterName(e.target.options[e.target.selectedIndex].text);
    };

    const getSemester = async () => {
        const dataAPI = await getSemesterAPI();
        setListSemester(dataAPI);
        setSemesterId(dataAPI[0].id);
    };

    useEffect(() => {
        const check = handleCheck();
        if (!check) {
            navigate("/");
        } else {
            if (check.Role === "2") {
                getInformation(check.Id);
                getSemester();
            } else {
                navigate("/");
                alert("Bạn không có quyền vào trang này");
            }
        }
    }, []);

    useEffect(() => {
        getAssign();
    }, [semesterId, teacher]);

    return (
        <div className={cx("manage-assign")}>
            <div className={cx("manage-assign-header")}>
                <h2 className={cx("manage-assign-title")}>
                    DANH SÁCH CÁC LỚP GIẢNG DẠY
                </h2>
                <div className={cx("manage-user")}>
                    {teacher.avatar ? (
                        <Image
                            src={teacher.avatar}
                            alt="Avatar"
                            className={cx("avatar-image")}
                        />
                    ) : (
                        <FaUserAlt className={cx("avatar-image")} />
                    )}
                    <span className={cx("user-name")}>
                        Xin chào {teacher.fullName}
                    </span>
                </div>
            </div>

            <div className={cx("manage-assign-content")}>
                <div className={cx("list-button")}>
                    <Row>
                        <Col>
                            <label className={cx("form-label")}>Học kỳ:</label>
                        </Col>
                        <Col>
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
                        </Col>
                    </Row>
                </div>
                <div className={cx("manage-assign-container")}>
                    <ListPartition listAssign={listAssign} />
                </div>
            </div>
        </div>
    );
}

export default Partition;
