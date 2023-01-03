import * as classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import Table from "react-bootstrap/Table";
import { Fragment, useCallback, useEffect, useState } from "react";
import { Button, Modal, NavLink } from "react-bootstrap";
import { toast } from "react-toastify";
import { read, utils, writeFile } from "xlsx";

import styles from "./ListClass.module.scss";
import FindClass from "../FindClass";
import AddEditClass from "../AddEditClass";
import { deleteClass, resetClass } from "../../../../slices/classSlice";
import { deleteClassAPI, getClassAPI } from "../../../../services/classService";
import { Link, Route } from "react-router-dom";

const cx = classNames.bind(styles);

function ListClass({ gradeName }) {
    const data = useSelector((state) => state.class.listClass);

    const [listClass, setListClass] = useState([]);
    const [listClassExport, setListClassExport] = useState([]);
    const [isShow, setIsShow] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [idDelete, setIdDelete] = useState("");
    const [classShow, setClassShow] = useState({});

    const dispatch = useDispatch();

    const getClass = async (search) => {
        const dataAPI = await getClassAPI(gradeName, search);
        dispatch(resetClass(dataAPI));
    };

    useEffect(() => {
        getClass();
    }, [gradeName]);

    useEffect(() => {
        const lstExport = data.map((item) => {
            return {
                id: item.id,
                name: item.name,
                grade: item.grade,
                academicYear: item.academicYear,
                headerTeacherName: item.headerTeacherName,
            };
        });
        setListClass(data);
        setListClassExport(lstExport);
    }, [data]);

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
        setIdDelete(id);
        setIsDelete(true);
    };

    const handleDeleteClass = async () => {
        const response = await deleteClassAPI(idDelete);
        if (response.message === "Success") {
            dispatch(deleteClass(idDelete));
            toast.success("Xóa lớp thành công");
        } else {
            toast.error("Xóa lớp thất bại do lớp có chứa học sinh");
        }

        setIdDelete("");
        setIsDelete(false);
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
                        <th className={cx("table-head")}>STT</th>
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
                    {listClass.map((cls, index) => {
                        return (
                            <tr key={cls.id}>
                                <td className={cx("table-document")}>
                                    {index + 1}
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
                />
            )}
            <Modal
                show={isDelete}
                onHide={() => setIsDelete(false)}
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
                        onClick={handleDeleteClass}
                    >
                        Xác nhận
                    </Button>
                    <Button
                        variant="secondary"
                        className={cx("button-back")}
                        onClick={() => setIsDelete(false)}
                    >
                        Quay lại
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ListClass;
