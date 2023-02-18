import * as classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { getSubjectAPI } from "../../../services/subjectService";
import { handleCheck } from "../../../utils/common";
import AddEditSubject from "./AddEditSubject";
import ListSubject from "./ListSubject";

import styles from "./TrainingManagement.module.scss";

const cx = classNames.bind(styles);

function TrainingManageMent() {
    const { gradeName } = useParams();

    const [listSubject, setListSubject] = useState([]);
    const [isShow, setIsShow] = useState(false);

    const getSubject = async () => {
        const dataAPI = await getSubjectAPI(gradeName);
        setListSubject(dataAPI);
    };

    const navigate = useNavigate();

    useEffect(() => {
        const check = handleCheck();
        if (!check) {
            navigate("/");
        } else {
            if (check.Role === "3") getSubject();
            else {
                navigate("/");
                alert("Bạn không có quyền vào trang này");
            }
        }
    }, [gradeName]);

    const handleClickShowAddForm = () => {
        setIsShow(!isShow);
    };

    return (
        <div className={cx("manage-training-management")}>
            <div className={cx("manage-training-management-header")}>
                <h2 className={cx("manage-training-management-title")}>
                    QUẢN LÝ ĐÀO TẠO KHỐI {gradeName}
                </h2>
                <div className={cx("manage-user")}>
                    <FaUserAlt className={cx("avatar-image")} />
                    <span className={cx("user-name")}> Xin chào Admin</span>
                </div>
            </div>
            <div className={cx("manage-training-management-content")}>
                <div className={cx("show-add")}>
                    <button
                        className={cx("button-show-add")}
                        onClick={handleClickShowAddForm}
                    >
                        Thêm môn
                    </button>
                </div>

                {isShow && (
                    <AddEditSubject
                        action="add"
                        show={isShow}
                        showAdd={handleClickShowAddForm}
                        gradeName={gradeName}
                        getSubject={getSubject}
                    />
                )}

                <ListSubject
                    gradeName={gradeName}
                    listSubject={listSubject}
                    getSubject={getSubject}
                />
            </div>
        </div>
    );
}

export default TrainingManageMent;
