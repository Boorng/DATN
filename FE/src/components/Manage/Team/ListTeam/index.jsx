import * as classNames from "classnames/bind";
import { useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { updateTeamTeacherAPI } from "../../../../services/teacherService";
import { deleteTeamAPI } from "../../../../services/teamService";
import AddEditTeam from "../AddEditTeam";
import styles from "./ListTeam.module.scss";

const cx = classNames.bind(styles);

function ListTeam({ listTeam, getTeam }) {
    const [isShow, setIsShow] = useState(false);
    const [teamShow, setTeamShow] = useState({});
    const [isTeamDelete, setIsTeamDelete] = useState(false);
    const [idTeamDelete, setIdTeamDelete] = useState("");
    const [isSure, setIsSure] = useState(false);

    const handleClickEditInfo = (team) => {
        if (!isShow) setTeamShow(team);
        else setTeamShow({});
        setIsShow(!isShow);
    };

    const handleConfirmDelete = (id) => {
        setIdTeamDelete(id);
        setIsTeamDelete(true);
    };

    const handleCheckData = () => {
        setIsTeamDelete(false);
        setIsSure(true);
    };

    const handleDeleteAll = async () => {
        const res = await updateTeamTeacherAPI(idTeamDelete);
        if (res.message === "Success") {
            const response = await deleteTeamAPI(idTeamDelete);
            if (response.message === "Success") {
                await getTeam();
                toast.success("Xóa nhóm thành công");
            } else {
                toast.error("Xóa nhóm thất bại");
            }
        } else {
            toast.error("Xóa nhóm thất bại");
        }
        setIsSure(false);
    };

    return (
        <div className={cx("list-team")}>
            <Table striped hover className={cx("list-team")}>
                <thead>
                    <th className={cx("table-head-index")}>STT</th>
                    <th className={cx("table-head-team")}>Tổ chuyên môn</th>
                </thead>
                <tbody>
                    {listTeam.map((t, index) => {
                        return (
                            <tr key={t.id}>
                                <td className={cx("table-body")}>
                                    {index + 1}
                                </td>
                                <td className={cx("table-body")}>{t.name}</td>

                                <td className={cx("table-body-button")}>
                                    <Link
                                        className={cx("button-link")}
                                        to={`/manage/team/teacher-team/${t.name}/${t.id}/`}
                                    >
                                        Danh sách giáo viên
                                    </Link>

                                    <Button
                                        variant="success"
                                        className={cx("button")}
                                        onClick={() => handleClickEditInfo(t)}
                                    >
                                        Sửa
                                    </Button>
                                    <Button
                                        variant="danger"
                                        className={cx("button")}
                                        onClick={() =>
                                            handleConfirmDelete(t.id)
                                        }
                                    >
                                        Xóa
                                    </Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            {isShow && (
                <AddEditTeam
                    teamShow={teamShow}
                    show={isShow}
                    showAdd={handleClickEditInfo}
                    getTeam={getTeam}
                />
            )}

            {isTeamDelete && (
                <Modal
                    show={isTeamDelete}
                    onHide={() => setIsTeamDelete(false)}
                    dialogClassName={cx("modal")}
                    centered
                >
                    <Modal.Header>
                        <Modal.Title className={cx("modal-title")}>
                            Cảnh báo
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className={cx("modal-content")}>
                        Bạn có chắc chắn muốn xóa tổ chuyên môn không?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="primary"
                            className={cx("button-confirm")}
                            onClick={handleCheckData}
                        >
                            Xác nhận
                        </Button>
                        <Button
                            variant="secondary"
                            className={cx("button-back")}
                            onClick={() => setIsTeamDelete(false)}
                        >
                            Quay lại
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}

            {isSure && (
                <Modal
                    show={isSure}
                    onHide={() => setIsSure(false)}
                    dialogClassName={cx("modal")}
                    centered
                >
                    <Modal.Header>
                        <Modal.Title className={cx("modal-title")}>
                            Cảnh báo
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className={cx("modal-content")}>
                        Bạn sẽ xóa tất cả những dữ liệu liên quan đến nhóm
                        chuyên môn. Bạn chắc chắn không?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="primary"
                            className={cx("button-confirm")}
                            onClick={handleDeleteAll}
                        >
                            Xác nhận
                        </Button>
                        <Button
                            variant="secondary"
                            className={cx("button-back")}
                            onClick={() => setIsSure(false)}
                        >
                            Quay lại
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
}

export default ListTeam;
