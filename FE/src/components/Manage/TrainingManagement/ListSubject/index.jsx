import * as classNames from "classnames/bind";
import { useState } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteListAssignAPI } from "../../../../services/assignService";
import {
    checkDataSubjectAPI,
    deleteSubjectAPI,
} from "../../../../services/subjectService";
import { deleteListTestAPI } from "../../../../services/testService";
import AddEditSubject from "../AddEditSubject";

import styles from "./ListSubject.module.scss";

const cx = classNames.bind(styles);

function ListSubject({ gradeName, listSubject, getSubject }) {
    const [subjectShow, setSubjectShow] = useState({});
    const [isShow, setIsShow] = useState(false);
    const [isSubDelete, setIsSubDelete] = useState(false);
    const [idSubDelete, setIdSubDelete] = useState("");
    const [isAssignDelete, setIsAssignDelete] = useState(false);
    const [isTestDelete, setIsTestDelete] = useState(false);
    const [isSure, setIsSure] = useState(false);

    const handleClickEditInfo = (sub) => {
        if (!isShow) setSubjectShow(sub);
        else setSubjectShow({});
        setIsShow(!isShow);
    };

    const handleConfirmDelete = (id) => {
        setIdSubDelete(id);
        setIsSubDelete(true);
    };

    const handleCheckData = async () => {
        const res = await checkDataSubjectAPI(idSubDelete);
        if (res.haveAssign) {
            setIsAssignDelete(true);
        }

        if (res.haveTest) {
            if (res.haveTest) {
                setIsTestDelete(true);
            }
        }
        setIsSure(true);
        setIsSubDelete(false);
    };

    const handleDeleteAll = async () => {
        let check = true;
        if (isAssignDelete) {
            const res = await deleteListAssignAPI("", "", idSubDelete);
            if (res.message == "Fail") check = false;
        }

        if (isTestDelete) {
            const response = await deleteListTestAPI("", "", idSubDelete);
            if (response.message === "Fail") check = false;
        }

        const response = await deleteSubjectAPI(idSubDelete);
        if (response.message === "Fail") {
            check = false;
        }
        setIdSubDelete("");

        if (check) {
            toast.success("Xóa môn học thành công");
        } else {
            toast.error("Xóa môn học thất bại");
        }

        setIsSure(false);
        await getSubject();
    };

    return (
        <div className={cx("list-subject")}>
            <Table striped hover>
                <thead>
                    <th className={cx("table-head-index")}>STT</th>
                    <th className={cx("table-head-subject")}>Môn học</th>
                    <th className={cx("table-head-grade")}>Khối</th>
                    <th className={cx("table-head")}></th>
                </thead>
                <tbody>
                    {listSubject.map((sb, index) => {
                        return (
                            <tr key={sb.id}>
                                <td className={cx("table-body")}>
                                    {index + 1}
                                </td>
                                <td className={cx("table-body")}>{sb.name}</td>
                                <td className={cx("table-body")}>{sb.grade}</td>
                                <td className={cx("list-button")}>
                                    <Button
                                        variant="success"
                                        className={cx("button")}
                                        onClick={() => handleClickEditInfo(sb)}
                                    >
                                        Sửa
                                    </Button>

                                    <Button
                                        variant="danger"
                                        className={cx("button")}
                                        onClick={() =>
                                            handleConfirmDelete(sb.id)
                                        }
                                    >
                                        Xóa
                                    </Button>

                                    <Link
                                        className={cx("button-link")}
                                        to={`/manage/training-management/grade/${gradeName}/subject/${sb.name}/${sb.id}`}
                                    >
                                        Danh sách giáo viên
                                    </Link>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>

            {isShow && (
                <AddEditSubject
                    subjectShow={subjectShow}
                    show={isShow}
                    showAdd={handleClickEditInfo}
                    getSubject={getSubject}
                />
            )}

            {isSubDelete && (
                <Modal
                    show={isSubDelete}
                    onHide={() => setIsSubDelete(false)}
                    dialogClassName={cx("modal")}
                    centered
                >
                    <Modal.Header>
                        <Modal.Title className={cx("modal-title")}>
                            Cảnh báo
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className={cx("modal-content")}>
                        Bạn có chắc chắn muốn xóa lớp không?
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
                            onClick={() => setIsSubDelete(false)}
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
                        Bạn sẽ xóa tất cả những dữ liệu liên quan đến bài kiểm
                        tra, lớp học, giáo viên dạy của môn học. Bạn chắc chắn
                        không?
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

export default ListSubject;
