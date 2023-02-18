import * as classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { read, utils } from "xlsx";
import { getTeacherAPI } from "../../../../services/teacherService";
import AddListTeacherTeam from "./AddListTeacherTeam";

import styles from "./DetailTeam.module.scss";
import ListTeacherTeam from "./ListTeacherTeam";

const cx = classNames.bind(styles);

function DetailTeam() {
    const { teamName, teamId } = useParams();
    const [fileName, setFileName] = useState("");
    const [showAddList, setShowAddList] = useState(false);
    const [listAdd, setListAdd] = useState([]);
    const [listTeacher, setListTeacher] = useState([]);

    const getTeacherByTeam = async (search) => {
        const dataAPI = await getTeacherAPI(search, teamId);
        setListTeacher(dataAPI);
    };

    useEffect(() => {
        getTeacherByTeam();
    }, [teamId]);

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
                            id: item["Id"],
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
        <div className={cx("manage-teacher-team")}>
            <div className={cx("manage-teacher-team-header")}>
                <h2 className={cx("manage-teacher-team-title")}>
                    QUẢN LÝ GIÁO VIÊN {teamName}
                </h2>
                <div className={cx("manage-user")}>
                    <FaUserAlt className={cx("avatar-image")} />
                    <span className={cx("user-name")}> Xin chào Admin</span>
                </div>
            </div>

            <div className={cx("manage-teacher-team-content")}>
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
                </div>
                <ListTeacherTeam
                    listTeacher={listTeacher}
                    getTeacherByTeam={getTeacherByTeam}
                    teamId={teamId}
                    teamName={teamName}
                />
            </div>

            {showAddList && (
                <AddListTeacherTeam
                    show={showAddList}
                    setShow={setShowAddList}
                    listTeacherAdd={listAdd}
                    fileName={fileName}
                    getTeacher={getTeacherByTeam}
                    teamId={teamId}
                />
            )}
        </div>
    );
}

export default DetailTeam;
