import * as classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { FaUserAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { getClassByHeaderTeacher } from "../../../services/classService";
import { getTeacherByAccount } from "../../../services/teacherService";
import { handleCheck } from "../../../utils/common";
import ListMainResult from "./ListMainResult";
import styles from "./MainResult.module.scss";

const cx = classNames.bind(styles);

function MainResult() {
    const [teacher, setTeacher] = useState({});
    const [listHomeRoom, setListHomeRoom] = useState([]);

    const navigate = useNavigate();

    const getInformation = async (accountId) => {
        const data = await getTeacherByAccount(accountId);
        setTeacher(data);
    };

    const getClassHomeRoom = async (search) => {
        if (teacher.id) {
            const data = await getClassByHeaderTeacher(teacher.id, search);
            if (data) {
                setListHomeRoom(data);
            } else {
                setListHomeRoom([]);
            }
        }
    };

    useEffect(() => {
        const check = handleCheck();
        if (!check) {
            navigate("/");
        } else {
            if (check.Role === "2") {
                getInformation(check.Id);
            } else {
                navigate("/");
                alert("Bạn không có quyền vào trang này");
            }
        }
    }, []);

    useEffect(() => {
        getClassHomeRoom();
    }, [teacher]);

    return (
        <div className={cx("manage-assign")}>
            <div className={cx("manage-assign-header")}>
                <h2 className={cx("manage-assign-title")}>
                    DANH SÁCH CÁC LỚP GIẢNG DẠY
                </h2>
                <div className={cx("manage-user")}>
                    {teacher.avatar ? (
                        <Image
                            src={teacher.avatar}
                            alt="Avatar"
                            className={cx("avatar-image")}
                        />
                    ) : (
                        <FaUserAlt className={cx("avatar-image")} />
                    )}
                    <span className={cx("user-name")}>
                        Xin chào {teacher.fullName}
                    </span>
                </div>
            </div>

            <div className={cx("manage-assign-content")}>
                <div className={cx("manage-assign-container")}>
                    <ListMainResult
                        listHomeRoom={listHomeRoom}
                        getClassHomeRoom={getClassHomeRoom}
                    />
                </div>
            </div>
        </div>
    );
}

export default MainResult;
