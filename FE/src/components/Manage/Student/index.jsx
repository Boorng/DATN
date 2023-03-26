import * as classNames from "classnames/bind";
import "react-toastify/dist/ReactToastify.css";

import styles from "./Student.module.scss";
import AddEditStudent from "./AddEditStudent";
import { useContext, useEffect, useState } from "react";
import ListStudent from "./ListStudent";
import { read, utils } from "xlsx";
import AddListStudent from "./AddListStudent";
import { getStudentAPI } from "../../../services/studentService";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { handleCheck } from "../../../utils/common";
import { FaUserAlt } from "react-icons/fa";
import { AuthContext } from "../../../context/AuthContext";

const cx = classNames.bind(styles);

function Student() {
    const { currentUser } = useContext(AuthContext);

    const [isShow, setIsShow] = useState(false);
    const [fileName, setFileName] = useState("");
    const [showAddList, setShowAddList] = useState(false);
    const [listAdd, setListAdd] = useState([]);
    const [listStudent, setListStudent] = useState([]);
    const [schoolYear, setSchoolYear] = useState("");

    const getStudent = async (search) => {
        const dataAPI = await getStudentAPI(schoolYear, search);
        setListStudent(dataAPI);
    };

    const navigate = useNavigate();

    useEffect(() => {
        const check = handleCheck();
        if (!check) {
            navigate("/");
        } else {
            if (check.Role === "3") getStudent();
            else {
                navigate("/");
                alert("Bạn không có quyền vào trang này");
            }
        }
    }, []);

    const handleClickShowAddForm = () => {
        setIsShow(!isShow);
    };

    const handleFindSchoolYear = async () => {
        await getStudent();
    };

    const handleSchoolYearChange = (e) => {
        setSchoolYear(e.target.value);
    };

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
                    console.log(rows);
                    const listAddImport = rows.map((item) => {
                        return {
                            id: item["Id"],
                            fullName: item["Họ và tên"],
                            age: item["Tuổi"],
                            gender: item["Giới tính"],
                            ethnic: item["Dân tộc"],
                            birthDay: item["Ngày tháng năm sinh"],
                            email: item["Email"],
                            address: item["Địa chỉ"],
                            phone: item["Số điện thoại"],
                            fatherName: item["Tên bố"],
                            fatherPhone: item["Số điện thoại bố"],
                            fatherCareer: item["Nghề nghiệp bố"],
                            motherName: item["Tên mẹ"],
                            motherPhone: item["Số điện thoại mẹ"],
                            motherCareer: item["Nghề nghiệp mẹ"],
                            status: 1,
                            schoolYear: item["Khóa"],
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
        <div className={cx("manage-student")}>
            <div className={cx("manage-student-header")}>
                <h2 className={cx("manage-student-title")}>QUẢN LÝ HỌC SINH</h2>
                <div className={cx("manage-user")}>
                    <FaUserAlt className={cx("avatar-image")} />
                    <span className={cx("user-name")}> Xin chào Admin</span>
                </div>
            </div>
            <div className={cx("manage-student-content")}>
                <div className={cx("list-button")}>
                    <div className={cx("list-button-add")}>
                        <div className={cx("show-add")}>
                            <button
                                className={cx("button-show-add")}
                                onClick={handleClickShowAddForm}
                            >
                                Thêm sinh viên
                            </button>
                        </div>

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
                    <div className={cx("button-find")}>
                        <Form.Control
                            placeholder="Nhập niên khóa cần tìm"
                            className={cx("button-find-input")}
                            onChange={handleSchoolYearChange}
                            value={schoolYear}
                        />
                        <Button
                            className={cx("button-find-label")}
                            variant="success"
                            onClick={handleFindSchoolYear}
                        >
                            Tìm kiếm
                        </Button>
                    </div>
                </div>

                {showAddList && (
                    <AddListStudent
                        show={showAddList}
                        setShow={setShowAddList}
                        listStudentAdd={listAdd}
                        fileName={fileName}
                        getStudent={getStudent}
                        currentUser={currentUser}
                    />
                )}

                {isShow && (
                    <AddEditStudent
                        action="add"
                        show={isShow}
                        showAdd={handleClickShowAddForm}
                        getStudent={getStudent}
                        currentUser={currentUser}
                    />
                )}

                <ListStudent
                    listStudent={listStudent}
                    getStudent={getStudent}
                />
            </div>
        </div>
    );
}

export default Student;
