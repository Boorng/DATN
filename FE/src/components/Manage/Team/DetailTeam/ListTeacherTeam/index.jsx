import * as classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { utils, writeFile } from "xlsx";

import { deleteTeacherTeamAPI } from "../../../../../services/teacherService";
import DetailTeacher from "../../../Teacher/DetailTeacher";
import FindTeacher from "../../../Teacher/FindTeacher";
import ManageTeamTeacher from "../ManageTeamTeacher";
import styles from "./ListTeacherTeam.module.scss";

const cx = classNames.bind(styles);

function ListTeacherTeam({ listTeacher, getTeacherByTeam, teamId, teamName }) {
    const [listTeacherExport, setListTeacherExport] = useState([]);
    const [teacherShow, setTeacherShow] = useState({});
    const [isDetail, setIsDetail] = useState(false);
    const [isShowManage, setIsShowManage] = useState(false);
    const [isTeaDelete, setIsTeaDelete] = useState(false);
    const [idTeaDelete, setIdTeaDelete] = useState("");

    useEffect(() => {
        const lstExport = listTeacher.map((item) => {
            return {
                id: item.id,
                fullName: item.fullName,
                age: item.age,
                gender: item.gender,
                ethnic: item.ethnic,
                dob: item.birthDay,
                email: item.email,
                address: item.address,
                phone: item.phone,
                status: item.status === 1 ? "Đang làm" : "Nghỉ việc",
                level:
                    item.level === 1
                        ? "Cử nhân"
                        : item.level === 2
                        ? "Thạc sĩ"
                        : item.level === 3
                        ? "Tiến sĩ"
                        : item.level === 4
                        ? "Phó giáo sư"
                        : "Giáo sư",
                teamName: teamName,
                levelTeam: item.leader
                    ? "Tổ trưởng"
                    : item.viceLeader
                    ? "Tổ phó"
                    : "Thành viên",
            };
        });
        setListTeacherExport(lstExport);
    }, [listTeacher]);

    const handleExport = () => {
        const headings = [
            [
                "Id",
                "Họ và tên",
                "Tuổi",
                "Giới tính",
                "Dân tộc",
                "Ngày tháng năm sinh",
                "Email",
                "Địa chỉ",
                "Số điên thoại",
                "Tình trạng làm việc",
                "Bằng cấp",
                "Tổ chuyên môn",
                "Chức vụ",
            ],
        ];
        const wb = utils.book_new();
        const ws = utils.json_to_sheet([]);
        utils.sheet_add_aoa(ws, headings);
        utils.sheet_add_json(ws, listTeacherExport, {
            origin: "A2",
            skipHeader: true,
        });
        utils.book_append_sheet(wb, ws, "Report");
        writeFile(wb, `Danh sách giáo viên ${teamName}.xlsx`);
    };

    const handleClickDetailInfo = (tc) => {
        if (!isDetail) setTeacherShow(tc);
        else setTeacherShow({});
        setIsDetail(!isDetail);
    };

    const handleConfirmDelete = (id) => {
        setIdTeaDelete(id);
        setIsTeaDelete(true);
    };

    const handleDeleteAll = async () => {
        const res = await deleteTeacherTeamAPI(idTeaDelete);
        if (res.message === "Success") {
            toast.success("Xóa giáo viên khỏi tổ thành công");

            await getTeacherByTeam();
        } else {
            toast.error("Xóa giáo viên khỏi tổ thất bại");
        }
        setIsTeaDelete(false);
        setIdTeaDelete("");
    };

    const handleShowMange = () => {
        setIsShowManage(!isShowManage);
    };

    const handleSearch = async (input) => {
        await getTeacherByTeam(input);
    };

    return (
        <div className={cx("list-teacher")}>
            <FindTeacher handleSearch={handleSearch} />

            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button
                    variant="success"
                    className={cx("button-manage")}
                    onClick={handleShowMange}
                >
                    Quản lý tổ
                </Button>

                <Button
                    variant="warning"
                    onClick={handleExport}
                    className={cx("button-export")}
                >
                    Xuất file
                </Button>
            </div>
            <Table striped hover>
                <thead>
                    <tr>
                        <th className={cx("table-head")}>ID</th>
                        <th className={cx("table-head")}>Tên giáo viên</th>
                        <th className={cx("table-head")}>Email</th>
                        <th className={cx("table-head")}>Số điện thoại</th>
                        <th className={cx("table-head")}>Chức danh</th>
                        <th className={cx("table-head")}>
                            Tình trạng làm việc
                        </th>
                        <th className={cx("table-head")}></th>
                    </tr>
                </thead>
                <tbody>
                    {listTeacher.map((tea) => {
                        return (
                            <tr key={tea.id}>
                                <td className={cx("table-document")}>
                                    {tea.id}
                                </td>
                                <td className={cx("table-document")}>
                                    {tea.fullName}{" "}
                                    {tea.leader
                                        ? "(Tổ trưởng)"
                                        : tea.viceLeader && "(Tổ phó)"}
                                </td>

                                <td className={cx("table-document")}>
                                    {tea.email}
                                </td>
                                <td className={cx("table-document")}>
                                    {tea.phone}
                                </td>

                                <td className={cx("table-document")}>
                                    {tea.level === 1
                                        ? "Cử nhân"
                                        : tea.level === 2
                                        ? "Thạc sĩ"
                                        : tea.level === 3
                                        ? "Tiến sĩ"
                                        : tea.level === 4
                                        ? "Phó giáo sư"
                                        : "Giáo sư"}
                                </td>
                                <td className={cx("table-document")}>
                                    {tea.status === 1
                                        ? "Đang làm"
                                        : "Nghỉ việc"}
                                </td>
                                <td className={cx("list-button")}>
                                    <Button
                                        variant="info"
                                        onClick={() =>
                                            handleClickDetailInfo(tea)
                                        }
                                        className={cx("button")}
                                    >
                                        Xem chi tiết
                                    </Button>

                                    <Button
                                        onClick={() =>
                                            handleConfirmDelete(tea.id)
                                        }
                                        variant="danger"
                                        className={cx("button")}
                                    >
                                        Xóa
                                    </Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>

            {isDetail && (
                <DetailTeacher
                    teacherShow={teacherShow}
                    show={isDetail}
                    showDetail={handleClickDetailInfo}
                />
            )}

            {isShowManage && (
                <ManageTeamTeacher
                    show={isShowManage}
                    showManage={handleShowMange}
                    teamId={teamId}
                    getTeacherByTeam={getTeacherByTeam}
                />
            )}

            {isTeaDelete && (
                <Modal
                    show={isTeaDelete}
                    onHide={() => setIsTeaDelete(false)}
                    dialogClassName={cx("modal")}
                    centered
                >
                    <Modal.Header>
                        <Modal.Title className={cx("modal-title")}>
                            Cảnh báo
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className={cx("modal-content")}>
                        Bạn có chắc chắn muốn xóa giáo viên khỏi nhóm không?
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
                            onClick={() => setIsTeaDelete(false)}
                        >
                            Quay lại
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
}

export default ListTeacherTeam;
