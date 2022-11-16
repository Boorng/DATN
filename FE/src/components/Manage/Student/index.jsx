import * as classNames from "classnames/bind";
import "react-toastify/dist/ReactToastify.css";

import styles from "./Student.module.scss";
import AddEditStudent from "./AddEditStudent";
import { useState } from "react";
import Image from "../../../assets/Image";
import ListStudent from "./ListStudent";

const cx = classNames.bind(styles);

function Student() {
    const [isAdd, setIsAdd] = useState(false);
    const [isShowList, setIsShowList] = useState(false);

    const handleClickShowAddForm = () => {
        setIsAdd(!isAdd);
    };

    const handleClickShowList = () => {
        setIsShowList(!isShowList);
    };

    return (
        <div className={cx("manage-student")}>
            <h2 className={cx("manage-student-title")}>QUẢN LÝ SINH VIÊN</h2>
            <div className={cx("show-add")}>
                <img
                    src={Image.icon_collapse}
                    alt="icon"
                    className={cx("icon-show", isAdd ? "rotate-down" : "")}
                />
                <button
                    className={cx("button-show-add")}
                    onClick={handleClickShowAddForm}
                >
                    Thêm sinh viên
                </button>
            </div>
            {isAdd && <AddEditStudent action="add" />}
            <div className={cx("show-list")}>
                <img
                    src={Image.icon_collapse}
                    alt="icon"
                    className={cx("icon-show", isShowList ? "rotate-down" : "")}
                />
                <button
                    className={cx("button-show-list")}
                    onClick={handleClickShowList}
                >
                    Danh sách học sinh
                </button>
            </div>

            {isShowList && <ListStudent />}
        </div>
    );
}

export default Student;
