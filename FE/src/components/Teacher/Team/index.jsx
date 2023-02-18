import * as classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Button, Image } from "react-bootstrap";
import { FaUserAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import {
    getTeacherAPI,
    getTeacherByAccount,
    getTeamTeacherAPI,
} from "../../../services/teacherService";
import { handleCheck } from "../../../utils/common";
import ListTeamTeacher from "./ListTeamTeacher";
import Notification from "./Notification";
import styles from "./TeamTeacher.module.scss";

const cx = classNames.bind(styles);

function TeamTeacher() {
    const [team, setTeam] = useState({});
    const [teacher, setTeacher] = useState({});
    const [listTeacher, setListTeacher] = useState([]);
    const [showNotification, setShowNotification] = useState(false);

    const navigate = useNavigate();

    const getTeacherByTeam = async (teamId) => {
        const dataAPI = await getTeacherAPI("", teamId);
        setListTeacher(dataAPI);
    };

    const getTeamTeacher = async (teamId) => {
        const dataAPI = await getTeamTeacherAPI(teamId);
        setTeam(dataAPI);
    };

    const getInformation = async (accountId) => {
        const data = await getTeacherByAccount(accountId);
        if (data.teamId) {
            await getTeacherByTeam(data.teamId);
            await getTeamTeacher(data.teamId);
        }
        setTeacher(data);
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

    return (
        <div className={cx("teacher-team")}>
            <div className={cx("teacher-team-header")}>
                <h2 className={cx("teacher-team-title")}>TỔ CHUYÊN MÔN</h2>
                <div className={cx("teacher-user")}>
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
            <div className={cx("teacher-team-content")}>
                {teacher.teamId ? (
                    <div className={cx("teacher-team-container")}>
                        <div className={cx("teacher-team-container-header")}>
                            <h3 className={cx("teacher-team-name")}>
                                {team.name}
                            </h3>
                            <div className={cx("notification-wrap")}>
                                <Button
                                    className={cx("button-show-notification")}
                                    variant="success"
                                    onClick={() => setShowNotification(true)}
                                >
                                    Thông báo
                                </Button>
                                {!teacher.isSeenNotification && (
                                    <div className={cx("notification")}>
                                        Mới
                                    </div>
                                )}
                            </div>
                        </div>
                        <ListTeamTeacher
                            listTeacher={listTeacher}
                            teacher={teacher}
                        />
                    </div>
                ) : (
                    <div>Bạn chưa thuộc tổ chuyên môn nào</div>
                )}
            </div>
            {showNotification && (
                <Notification
                    teacher={teacher}
                    show={showNotification}
                    setShow={setShowNotification}
                    team={team}
                    getTeamTeacher={getTeamTeacher}
                    getInformation={getInformation}
                />
            )}
        </div>
    );
}

export default TeamTeacher;
