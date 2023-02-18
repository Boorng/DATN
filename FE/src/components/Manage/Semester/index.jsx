import * as classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getSemesterAPI } from "../../../services/semesterService";
import { handleCheck } from "../../../utils/common";
import AddEditSubject from "./AddEditSemester";
import ListSemester from "./ListSemester";

import styles from "./Semester.module.scss";

const cx = classNames.bind(styles);

function Semester() {
    const [isShow, setIsShow] = useState(false);
    const [listSemester, setListSemester] = useState([]);

    const getSemester = async () => {
        const dataAPI = await getSemesterAPI();
        setListSemester(dataAPI);
    };

    const handleClickShowAddForm = () => {
        setIsShow(!isShow);
    };

    const navigate = useNavigate();

    useEffect(() => {
        const check = handleCheck();
        if (!check) {
            navigate("/");
        } else {
            if (check.Role === "3") getSemester();
            else {
                navigate("/");
                alert("Bạn không có quyền vào trang này");
            }
        }
    }, []);

    return (
        <div className={cx("manage-semester")}>
            <div className={cx("manage-semester-header")}>
                <h2 className={cx("manage-semester-title")}>QUẢN LÝ HỌC KỲ</h2>
                <div className={cx("manage-user")}>
                    <FaUserAlt className={cx("avatar-image")} />
                    <span className={cx("user-name")}> Xin chào Admin</span>
                </div>
            </div>
            <div className={cx("manage-semester-content")}>
                <div className={cx("list-button")}>
                    <div className={cx("show-add")}>
                        <button
                            className={cx("button-show-add")}
                            onClick={handleClickShowAddForm}
                        >
                            Thêm học kỳ
                        </button>
                    </div>
                </div>

                {isShow && (
                    <AddEditSubject
                        action="add"
                        show={isShow}
                        showAdd={handleClickShowAddForm}
                        getSemester={getSemester}
                    />
                )}

                <ListSemester
                    listSemester={listSemester}
                    getSemester={getSemester}
                />
            </div>
        </div>
    );
}

export default Semester;
