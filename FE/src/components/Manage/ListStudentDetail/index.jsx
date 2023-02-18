import { useNavigate, useParams } from "react-router-dom";
import * as classNames from "classnames/bind";
import { useEffect, useState } from "react";

import styles from "./ListStudentDetail.module.scss";
import AddListStudentDetail from "./AddListStudentDetail";
import { read, utils } from "xlsx";
import DetailListStudent from "./DetailListStudent";
import { getStudentClassAPI } from "../../../services/studentClassService";
import { handleCheck } from "../../../utils/common";
import { FaUserAlt } from "react-icons/fa";

const cx = classNames.bind(styles);

function ListStudentDetail() {
    const { classId, className, academicYear } = useParams();

    const [fileName, setFileName] = useState("");
    const [showAddList, setShowAddList] = useState(false);
    const [listAdd, setListAdd] = useState([]);
    const [listStudentClass, setListStudentClass] = useState([]);

    const getStudentClass = async (search) => {
        const dataAPI = await getStudentClassAPI(classId, search);
        setListStudentClass(dataAPI);
    };

    const navigate = useNavigate();

    useEffect(() => {
        const check = handleCheck();
        if (!check) {
            navigate("/");
        } else {
            if (check.Role === "3") {
                getStudentClass();
            } else {
                navigate("/");
                alert("Bạn không có quyền vào trang này");
            }
        }
    }, [classId]);

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
                            classId: classId,
                            studentId: item["Id"],
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
        <div className={cx("manage-list-student")}>
            <div className={cx("manage-list-student-header")}>
                <h2 className={cx("manage-list-student-title")}>
                    DANH SÁCH HỌC SINH LỚP {className} NĂM HỌC {academicYear}
                </h2>
                <div className={cx("manage-user")}>
                    <FaUserAlt className={cx("avatar-image")} />
                    <span className={cx("user-name")}> Xin chào Admin</span>
                </div>
            </div>
            <div className={cx("manage-list-student-content")}>
                <div className={cx("list-button")}>
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

                    {showAddList && (
                        <AddListStudentDetail
                            show={showAddList}
                            setShow={setShowAddList}
                            listStudentClassAdd={listAdd}
                            fileName={fileName}
                            getStudentClass={getStudentClass}
                        />
                    )}
                </div>

                <DetailListStudent
                    listStudentClass={listStudentClass}
                    getStudentClass={getStudentClass}
                    className={className}
                    academicYear={academicYear}
                />
            </div>
        </div>
    );
}

export default ListStudentDetail;
