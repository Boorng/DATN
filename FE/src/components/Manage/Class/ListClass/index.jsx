import * as classNames from "classnames/bind";
import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { utils, writeFile } from "xlsx";
import { Link } from "react-router-dom";

import styles from "./ListClass.module.scss";
import FindClass from "../FindClass";
import AddEditClass from "../AddEditClass";
import {
    checkDataClassAPI,
    deleteClassAPI,
} from "../../../../services/classService";
import { deleteListAssignAPI } from "../../../../services/assignService";
import { deleteListTestAPI } from "../../../../services/testService";
import { deleteListStudentClassAPI } from "../../../../services/studentClassService";

const cx = classNames.bind(styles);

function ListClass({ gradeName, listClass, getClass }) {
    const [listClassExport, setListClassExport] = useState([]);
    const [isShow, setIsShow] = useState(false);
    const [isClsDelete, setIsClsDelete] = useState(false);
    const [idClsDelete, setIdClsDelete] = useState("");
    const [isStudentClassDelete, setIsStudentClassDelete] = useState(false);
    const [listIdStuClassDelete, setListIdStuClassDelete] = useState([]);
    const [isAssignDelete, setIsAssignDelete] = useState(false);
    const [isTestDelete, setIsTestDelete] = useState(false);
    const [isSure, setIsSure] = useState(false);
    const [classShow, setClassShow] = useState({});

    useEffect(() => {
        const lstExport = listClass.map((item) => {
            return {
                id: item.id,
                name: item.name,
                grade: item.grade,
                academicYear: item.academicYear,
                headerTeacherName: item.headerTeacherName,
            };
        });
        setListClassExport(lstExport);
    }, [listClass]);

    const handleExport = () => {
        const headings = [
            ["Id", "Tên lớp", "Khối", "Năm học", "Giáo viên chủ nhiệm"],
        ];
        const wb = utils.book_new();
        const ws = utils.json_to_sheet([]);
        utils.sheet_add_aoa(ws, headings);
        utils.sheet_add_json(ws, listClassExport, {
            origin: "A2",
            skipHeader: true,
        });
        utils.book_append_sheet(wb, ws, "Report");
        writeFile(wb, "ClassReport.xlsx");
    };

    const handleConfirmDelete = (id) => {
        setIdClsDelete(id);
        setIsClsDelete(true);
    };

    const handleCheckData = async () => {
        const res = await checkDataClassAPI(idClsDelete);
        if (res.haveAssign) {
            setIsAssignDelete(true);
        }

        if (res.haveStudentClass) {
            if (res.haveTest) {
                setListIdStuClassDelete(res.studentClassIds);
                setIsTestDelete(true);
            }
            setIsStudentClassDelete(true);
        }
        setIsSure(true);
        setIsClsDelete(false);
    };

    const handleDeleteAll = async () => {
        let check = true;
        if (isAssignDelete) {
            const res = await deleteListAssignAPI("", idClsDelete);
            if (res.message == "Fail") check = false;
        }

        if (isStudentClassDelete) {
            if (isTestDelete) {
                listIdStuClassDelete.forEach(async (item) => {
                    const response = await deleteListTestAPI(item);
                    if (response.message === "Fail") check = false;
                });

                setListIdStuClassDelete([]);
            }
            const response = await deleteListStudentClassAPI("", idClsDelete);
            if (response.message === "Fail") check = false;
            setIsStudentClassDelete(false);
        }

        const response = await deleteClassAPI(idClsDelete);
        if (response.message === "Fail") {
            check = false;
        }
        setIdClsDelete("");

        if (check) {
            toast.success("Xóa lớp thành công");
        } else {
            toast.error("Xóa lớp thất bại");
        }

        setIsSure(false);
        await getClass();
    };

    const handleClickEditInfo = (cls) => {
        if (!isShow) setClassShow(cls);
        else setClassShow({});
        setIsShow(!isShow);
    };

    const handleSearch = async (input) => {
        await getClass(input);
    };

    return (
        <div className={cx("list-class")}>
            <FindClass handleSearch={handleSearch} />
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
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
                        <th className={cx("table-head")}>Tên lớp</th>
                        <th className={cx("table-head")}>Khối</th>
                        <th className={cx("table-head")}>Năm học</th>
                        <th className={cx("table-head")}>Sĩ số</th>
                        <th className={cx("table-head")}>
                            Giáo viên chủ nhiệm
                        </th>
                        <th className={cx("table-head")}></th>
                    </tr>
                </thead>
                <tbody>
                    {listClass.map((cls) => {
                        return (
                            <tr key={cls.id}>
                                <td className={cx("table-document")}>
                                    {cls.id}
                                </td>
                                <td className={cx("table-document")}>
                                    {cls.name}
                                </td>
                                <td className={cx("table-document")}>
                                    {cls.grade}
                                </td>
                                <td className={cx("table-document")}>
                                    {cls.academicYear}
                                </td>
                                <td className={cx("table-document")}>
                                    {cls.countStudent}
                                </td>
                                <td className={cx("table-document")}>
                                    {cls.headerTeacherName}
                                </td>

                                <td className={cx("list-button")}>
                                    <Button
                                        onClick={() =>
                                            handleConfirmDelete(cls.id)
                                        }
                                        variant="danger"
                                        className={cx("button")}
                                    >
                                        Xóa
                                    </Button>

                                    <Button
                                        variant="success"
                                        onClick={() => handleClickEditInfo(cls)}
                                        className={cx("button")}
                                    >
                                        Sửa
                                    </Button>

                                    <Link
                                        className={cx("button-link")}
                                        to={`/manage/class/grade/${gradeName}/class/${cls.name}/academicYear/${cls.academicYear}/${cls.id}`}
                                    >
                                        Danh sách học sinh
                                    </Link>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>

            {isShow && (
                <AddEditClass
                    classShow={classShow}
                    show={isShow}
                    showAdd={handleClickEditInfo}
                    getClass={getClass}
                />
            )}

            {isClsDelete && (
                <Modal
                    show={isClsDelete}
                    onHide={() => setIsClsDelete(false)}
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
                            onClick={() => setIsClsDelete(false)}
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
                        Bạn sẽ xóa tất cả những dữ liệu liên quan đến học sinh,
                        giáo viên, bài kiểm tra của học sinh trong lớp. Bạn chắc
                        chắn không?
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

export default ListClass;
