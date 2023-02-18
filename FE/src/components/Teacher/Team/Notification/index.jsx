import { Button, Form, Modal } from "react-bootstrap";
import * as classNames from "classnames/bind";
import { useEffect, useState } from "react";

import styles from "./Notification.module.scss";
import { updateTeamAPI } from "../../../../services/teamService";
import { toast } from "react-toastify";
import { UpdateSeenNotify } from "../../../../services/teacherService";

const cx = classNames.bind(styles);

function Notification({
    teacher,
    show,
    setShow,
    team,
    getTeamTeacher,
    getInformation,
}) {
    const [teamNoti, setTeamNoti] = useState({});

    const handleOnChange = (e) => {
        setTeamNoti({ ...teamNoti, notification: e.target.value });
    };

    const UpdateSeen = async () => {
        if (!teacher.isSeenNotification) {
            await UpdateSeenNotify(teacher.id);
            await getInformation(teacher.accountId);
        }
    };

    const handleUpdateNotify = async () => {
        const res = await updateTeamAPI(teamNoti);
        if (res.message === "Success") {
            await getTeamTeacher(teamNoti.id);
            toast.success("Cập nhật thông báo thành công");
            getInformation(teacher.accountId);
        } else {
            toast.error("Cập nhật thông báo thất bại");
        }
    };

    useEffect(() => {
        setTeamNoti({
            ...team,
            notification: team.notification ? team.notification : "Không có",
        });
        UpdateSeen();
    }, []);

    return (
        <Modal
            show={show}
            onHide={() => setShow(false)}
            dialogClassName={cx("modal")}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    <h3 className={cx("form-title")}>Thông báo</h3>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className={cx("form")}>
                    <Form.Control
                        as="textarea"
                        rows={7}
                        className={cx("form-control")}
                        type="text"
                        placeholder="Nhập thông báo nhóm"
                        required
                        onChange={handleOnChange}
                        value={teamNoti.notification}
                        name="notification"
                        disabled={
                            teacher.leader || teacher.viceLeader ? false : true
                        }
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                {(teacher.leader || teacher.viceLeader) && (
                    <Button
                        variant="primary"
                        className={cx("button-update")}
                        onClick={handleUpdateNotify}
                    >
                        Cập nhật
                    </Button>
                )}

                <Button
                    variant="secondary"
                    className={cx("button-back")}
                    onClick={() => setShow(false)}
                >
                    Quay lại
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default Notification;
