import * as classNames from "classnames/bind";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import styles from "./Class.module.scss";
import AddEditClass from "./AddEditClass";
import ListClass from "./ListClass";
import { getClassAPI } from "../../../services/classService";

const cx = classNames.bind(styles);

function Class() {
    const [isShow, setIsShow] = useState(false);
    const [listClass, setListClass] = useState([]);

    const { gradeName } = useParams();

    const getClass = async (search) => {
        const dataAPI = await getClassAPI(gradeName, search);
        setListClass(dataAPI);
    };

    useEffect(() => {
        getClass();
    }, [gradeName]);

    const handleClickShowAddForm = () => {
        setIsShow(!isShow);
    };

    return (
        <div className={cx("manage-class")}>
            <h2 className={cx("manage-class-title")}>
                QUẢN LÝ LỚP KHỐI {gradeName}
            </h2>
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
