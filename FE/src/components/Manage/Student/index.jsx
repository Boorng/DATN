import * as classNames from "classnames/bind";
import "react-toastify/dist/ReactToastify.css";

import styles from "./Student.module.scss";
import AddEditStudent from "./AddEditStudent";
import { useState } from "react";
import ListStudent from "./ListStudent";
import { read, utils } from "xlsx";
import AddListStudent from "./AddListStudent";

const cx = classNames.bind(styles);

function Student() {
    const [isShow, setIsShow] = useState(false);
    const [fileName, setFileName] = useState("");
    const [showAddList, setShowAddList] = useState(false);
    const [listAdd, setListAdd] = useState([]);

    const handleClickShowAddForm = () => {
        setIsShow(!isShow);
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
            <h2 className={cx("manage-student-title")}>QUẢN LÝ HỌC SINH</h2>
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

                    <AddListStudent
                        show={showAddList}
                        setShow={setShowAddList}
                        listStudent={listAdd}
                        fileName={fileName}
                    />
                </div>
                {isShow && (
                    <AddEditStudent
                        action="add"
                        show={isShow}
                        showAdd={handleClickShowAddForm}
                    />
                )}
                <ListStudent />
            </div>
        </div>
    );
}

export default Student;
