import * as classNames from "classnames/bind";
import "react-toastify/dist/ReactToastify.css";

import styles from "./Student.module.scss";
import AddEditStudent from "./AddEditStudent";
import { useState } from "react";
import ListStudent from "./ListStudent";
import { read, utils } from "xlsx";
import { useDispatch } from "react-redux";
import { addListStudent } from "../../../slices/studentSlice";
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
                    setListAdd(rows);
                    setShowAddList(true);
                    setFileName(file.name);
                }
            };
            reader.readAsArrayBuffer(file);
        }
    };

    return (
        <div className={cx("manage-student")}>
            <h2 className={cx("manage-student-title")}>QUẢN LÝ SINH VIÊN</h2>
            <div className={cx("manage-student-content")}>
                <div className={cx("list-button")}>
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