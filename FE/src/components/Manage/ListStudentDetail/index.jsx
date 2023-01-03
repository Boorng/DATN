import { useParams } from "react-router-dom";
import * as classNames from "classnames/bind";

import styles from "./ListStudentDetail.module.scss";
import { useState } from "react";
import AddListStudentDetail from "./AddListStudentDetail";
import { read, utils } from "xlsx";
import DetailListStudent from "./DetailListStudent";

const cx = classNames.bind(styles);

function ListStudentDetail() {
    const { gradeName, classId, className, academicYear } = useParams();

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
                    const listAddImport = rows.map((item) => {
                        return {
                            classId: classId,
                            studentId: item["Id"],
                            studentName: item["Họ và tên"],
                            studentEmail: item["Email"],
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
            <h2 className={cx("manage-list-student-title")}>
                DANH SÁCH HỌC SINH LỚP {className} NĂM HỌC {academicYear}
            </h2>
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
                    {/* <AddListStudentDetail
                        show={showAddList}
                        setShow={setShowAddList}
                        listTeacher={listAdd}
                        fileName={fileName}
                    /> */}
                </div>

                <DetailListStudent classId={classId} />
            </div>
        </div>
    );
}

export default ListStudentDetail;
