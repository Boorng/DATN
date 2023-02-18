import * as classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { FaUserAlt } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { read, utils } from "xlsx";

import { getAssignAPI } from "../../../services/assignService";
import { getSemesterAPI } from "../../../services/semesterService";
import { handleCheck } from "../../../utils/common";
import AddListAssign from "./AddListAssign";
import ListAssign from "./ListAssign";
import styles from "./TeacherSubject.module.scss";

const cx = classNames.bind(styles);

function TeacherSubject() {
    const { gradeName, subjectName, subjectId } = useParams();

    const [fileName, setFileName] = useState("");
    const [showAddList, setShowAddList] = useState(false);
    const [listAdd, setListAdd] = useState([]);
    const [listTeacher, setListTeacher] = useState([]);
    const [listSemester, setListSemester] = useState([]);
    const [semesterId, setSemesterId] = useState("");
    const [semesterName, setSemesterName] = useState("");

    const getAssign = async (search) => {
        if (semesterId) {
            const dataAPI = await getAssignAPI(
                gradeName,
                subjectId,
                semesterId,
                search
            );
            setListTeacher(dataAPI);
        }
    };

    const getSemester = async () => {
        const dataAPI = await getSemesterAPI();
        setListSemester(dataAPI);
        setSemesterId(dataAPI[0].id);
    };

    const handleOnChange = (e) => {
        setSemesterId(e.target.value);
        setSemesterName(e.target.options[e.target.selectedIndex].text);
    };

    const navigate = useNavigate();

    useEffect(() => {
        const check = handleCheck();
        if (!check) {
            navigate("/");
        } else {
            if (check.Role === "3") {
                getSemester();
                getAssign();
            } else {
                navigate("/");
                alert("Bạn không có quyền vào trang này");
            }
        }
    }, []);

    useEffect(() => {
        getAssign();
    }, [semesterId]);

    const handleAddByImport = ($event) => {
        const files = $event.target.files;

        if (files.length) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                const wb = read(event.target.result);
                const sheets = wb.SheetNames;

                if (sheets.length) {
                    const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
                    const listAddImport = rows.map((item) => {
                        return {
                            teacherId: item["Id"],
                            semesterId: semesterId,
                            classId: item["ID Lớp"],
                            className: item["Lớp dạy"],
                            subjectId: subjectId,
                            subjectName: subjectName,
                            fullName: item["Họ và tên"],
                            age: item["Tuổi"],
                            gender: item["Giới tính"],
                            ethnic: item["Dân tộc"],
                            birthDay: item["Ngày tháng năm sinh"],
                            email: item["Email"],
                            address: item["Địa chỉ"],
                            phone: item["Số điên thoại"],
                            level:
                                item["Bằng cấp"] === "Cử nhân"
                                    ? 1
                                    : item["Bằng cấp"] === "Thạc sĩ"
                                    ? 2
                                    : item["Bằng cấp"] === "Tiến sĩ"
                                    ? 3
                                    : item["Bằng cấp"] === "Phó giáo sư"
                                    ? 4
                                    : 5,
                            status: 1,
                        };
                    });
                    setListAdd(listAddImport);
                    setShowAddList(true);
                    setFileName(file.name);
                }
            };
            reader.readAsArrayBuffer(file);
        }
    };

    return (
        <div className={cx("manage-assign")}>
            <div className={cx("manage-assign-header")}>
                <h2 className={cx("manage-assign-title")}>
                    QUẢN LÝ ĐÀO TẠO MÔN {subjectName} KHỐI {gradeName}
                </h2>
                <div className={cx("manage-user")}>
                    <FaUserAlt className={cx("avatar-image")} />
                    <span className={cx("user-name")}> Xin chào Admin</span>
                </div>
            </div>

            <div className={cx("manage-assign-content")}>
                <div className={cx("list-button")}>
                    <div className={cx("button-add")}>
                        <input
                            type="file"
                            name="file"
                            className={cx("custom-file-input")}
                            id="inputGroupFile"
                            required
                            hidden
                            onChange={handleAddByImport}
                            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                        />
                        <label
                            className={cx("custom-file-label")}
                            htmlFor="inputGroupFile"
                        >
                            Thêm bằng file
                        </label>
                    </div>
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

                    {showAddList && (
                        <AddListAssign
                            show={showAddList}
                            setShow={setShowAddList}
                            listAssignAdd={listAdd}
                            fileName={fileName}
                            getAssign={getAssign}
                        />
                    )}
                </div>

                <ListAssign
                    listTeacher={listTeacher}
                    getAssign={getAssign}
                    subjectName={subjectName}
                    gradeName={gradeName}
                    semesterId={semesterId}
                    semesterName={semesterName}
                />
            </div>
        </div>
    );
}

export default TeacherSubject;
