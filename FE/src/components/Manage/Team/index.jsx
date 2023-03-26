import * as classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getTeamAPI } from "../../../services/teamService";
import { handleCheck } from "../../../utils/common";
import AddEditTeam from "./AddEditTeam";
import ListTeam from "./ListTeam";

import styles from "./Team.module.scss";

const cx = classNames.bind(styles);

function Team() {
    const [listTeam, setListTeam] = useState([]);
    const [isShow, setIsShow] = useState(false);

    const getTeam = async () => {
        const dataAPI = await getTeamAPI();
        setListTeam(dataAPI);
    };

    const navigate = useNavigate();

    useEffect(() => {
        const check = handleCheck();
        if (!check) {
            navigate("/");
        } else {
            if (check.Role === "3") getTeam();
            else {
                navigate("/");
                alert("Bạn không có quyền vào trang này");
            }
        }
    }, []);

    const handleClickShowAddForm = () => {
        setIsShow(!isShow);
    };

    return (
        <div className={cx("manage-team")}>
            <div className={cx("manage-team-header")}>
                <h2 className={cx("manage-team-title")}>
                    QUẢN LÝ TỔ CHUYÊN MÔN
                </h2>
                <div className={cx("manage-user")}>
                    <FaUserAlt className={cx("avatar-image")} />
                    <span className={cx("user-name")}> Xin chào Admin</span>
                </div>
            </div>
            <div className={cx("manage-team-content")}>
                <div className={cx("show-add")}>
                    <button
                        className={cx("button-show-add")}
                        onClick={handleClickShowAddForm}
                    >
                        Thêm tổ
                    </button>
                </div>
                <ListTeam listTeam={listTeam} getTeam={getTeam} />
            </div>
            {isShow && (
                <AddEditTeam
                    action="add"
                    show={isShow}
                    showAdd={handleClickShowAddForm}
                    getTeam={getTeam}
                />
            )}
        </div>
    );
}

export default Team;
