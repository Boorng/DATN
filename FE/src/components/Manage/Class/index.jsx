import * as classNames from "classnames/bind";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

import styles from "./Class.module.scss";
import AddEditClass from "./AddEditClass";
import ListClass from "./ListClass";
import { useParams } from "react-router-dom";

const cx = classNames.bind(styles);

function Class() {
    const [isShow, setIsShow] = useState(false);

    const { gradeName } = useParams();

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
                    />
                )}
                <ListClass gradeName={gradeName} />
            </div>
        </div>
    );
}

export default Class;
