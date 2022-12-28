import * as classNames from "classnames/bind";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { read, utils } from "xlsx";

import styles from "./Class.module.scss";
import AddEditClass from "./AddEditClass";
import ListClass from "./ListClass";
import AddListClass from "./AddListClass";

const cx = classNames.bind(styles);

function Class() {
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
        <div className={cx("manage-class")}>
            <h2 className={cx("manage-class-title")}>QUẢN LÝ LỚP</h2>
            <div className={cx("manage-class-content")}>
                <div className={cx("list-button")}>
                    <div className={cx("show-add")}>
                        <button
                            className={cx("button-show-add")}
                            onClick={handleClickShowAddForm}
                        >
                            Thêm lớp
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
                    <AddListClass
                        show={showAddList}
                        setShow={setShowAddList}
                        listClass={listAdd}
                        fileName={fileName}
                    />
                </div>
                {isShow && (
                    <AddEditClass
                        action="add"
                        show={isShow}
                        showAdd={handleClickShowAddForm}
                    />
                )}
                <ListClass />
            </div>
        </div>
    );
}

export default Class;
