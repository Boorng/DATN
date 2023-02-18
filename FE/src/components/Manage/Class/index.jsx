import * as classNames from "classnames/bind";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";

import styles from "./Class.module.scss";
import AddEditClass from "./AddEditClass";
import ListClass from "./ListClass";
import { getClassAPI } from "../../../services/classService";
import { handleCheck } from "../../../utils/common";

const cx = classNames.bind(styles);

function Class() {
    const [isShow, setIsShow] = useState(false);
    const [listClass, setListClass] = useState([]);

    const { gradeName } = useParams();

    const navigate = useNavigate();

    const getClass = async (search) => {
        const dataAPI = await getClassAPI(gradeName, search);
        setListClass(dataAPI);
    };

    useEffect(() => {
        const check = handleCheck();
        if (!check) {
            navigate("/");
        } else {
            if (check.Role === "3") {
                getClass();
            } else {
                navigate("/");
                alert("Bạn không có quyền vào trang này");
            }
        }
    }, [gradeName]);

    const handleClickShowAddForm = () => {
        setIsShow(!isShow);
    };

    return (
        <div className={cx("manage-class")}>
            <div className={cx("manage-class-header")}>
                <h2 className={cx("manage-class-title")}>
                    QUẢN LÝ LỚP KHỐI {gradeName}
                </h2>
                <div className={cx("manage-user")}>
                    <FaUserAlt className={cx("avatar-image")} />
                    <span className={cx("user-name")}> Xin chào Admin</span>
                </div>
            </div>
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
                </div>
                {isShow && (
                    <AddEditClass
                        action="add"
                        show={isShow}
                        showAdd={handleClickShowAddForm}
                        gradeName={gradeName}
                        getClass={getClass}
                    />
                )}
                <ListClass
                    gradeName={gradeName}
                    listClass={listClass}
                    getClass={getClass}
                />
            </div>
        </div>
    );
}

export default Class;
