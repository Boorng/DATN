import * as classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import Table from "react-bootstrap/Table";
import { Fragment, useCallback, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { utils, writeFile } from "xlsx";

import { deleteStudent, getStudent } from "../../../../slices/studentSlice";
import AddEditStudent from "../AddEditStudent";
import styles from "./ListStudent.module.scss";
import FindStudent from "../FindStudent";
import DetailStudent from "../DetailStudent";

const cx = classNames.bind(styles);

function ListStudent() {
    const data = useSelector((state) => state.student.listStudent);

    const [listStudent, setListStudent] = useState([]);

    const [isShow, setIsShow] = useState(false);

    const [isDetail, setIsDetail] = useState(false);

    const [studentShow, setStudentShow] = useState({});

    const [searchList, setSearchList] = useState({
        list: [],
        input: "",
    });

    const dispatch = useDispatch();

    useEffect(() => {
        setListStudent(data);
    }, [data]);

    const handleExport = () => {
        const headings = [
            [
                "Id",
                "Name",
                "Age",
                "Gender",
                "Ethnic",
                "Dob",
                "Email",
                "Address",
                "PhoneNum",
                "FatherName",
                "FatherPhone",
                "FatherCareer",
                "MotherName",
                "MotherPhone",
                "MotherCareer",
                "Status",
                "GraduationDate",
            ],
        ];
        const wb = utils.book_new();
        const ws = utils.json_to_sheet([]);
        utils.sheet_add_aoa(ws, headings);
        utils.sheet_add_json(ws, listStudent, {
            origin: "A2",
            skipHeader: true,
        });
        utils.book_append_sheet(wb, ws, "Report");
        writeFile(wb, "Student Report.xlsx");
    };

    const handleDeleteStudent = (id) => {
        dispatch(deleteStudent(id));
        toast.success("Xóa học sinh thành công");
    };

    const handleClickEditInfo = (stu) => {
        if (!isShow) setStudentShow(stu);
        else setStudentShow({});
        setIsShow(!isShow);
    };

    const handleClickDetailInfo = (stu) => {
        if (!isDetail) setStudentShow(stu);
        else setStudentShow({});
        setIsDetail(!isDetail);
    };

    const handleSearch = useCallback(
        (input) => {
            if (input) {
                const checkList = listStudent.filter(
                    (stu) => stu.Id === input || stu.Name.includes(input)
                );

                setSearchList({ list: checkList, input });
            } else if (input !== searchList.input) {
                setSearchList({ list: [], input: "" });
            }
        },
        [listStudent, searchList.input]
    );

    return (
        <div className={cx("list-student")}>
            <FindStudent handleSearch={handleSearch} />
            <Button
                variant="warning"
                onClick={handleExport}
                className={cx("button-export")}
            >
                Xuất file
            </Button>
            <Table striped hover>
                <thead>
                    <tr>
                        <th className={cx("table-head")}>STT</th>
                        <th className={cx("table-head")}>Tên học sinh</th>
                        <th className={cx("table-head")}>Tuổi</th>
                        <th className={cx("table-head")}>Email</th>
                        <th className={cx("table-head")}>Số điện thoại</th>
                        <th className={cx("table-head")}>Tình trạng học tập</th>
                        <th className={cx("table-head")}></th>
                    </tr>
                </thead>
                <tbody>
                    {(searchList.input ? searchList.list : listStudent).map(
                        (stu, index) => {
                            return (
                                <Fragment key={stu.id}>
                                    <tr>
                                        <td className={cx("table-document")}>
                                            {index + 1}
                                        </td>
                                        <td className={cx("table-document")}>
                                            {stu.Name}
                                        </td>
                                        <td className={cx("table-document")}>
                                            {stu.Age}
                                        </td>
                                        <td className={cx("table-document")}>
                                            {stu.Email}
                                        </td>
                                        <td className={cx("table-document")}>
                                            {stu.PhoneNum}
                                        </td>
                                        <td className={cx("table-document")}>
                                            {stu.Status === "1"
                                                ? "Đang học"
                                                : stu.Status === "2"
                                                ? "Nghỉ học"
                                                : "Đã tốt nghiệp"}
                                        </td>
                                        <td className={cx("list-button")}>
                                            <Button
                                                onClick={() =>
                                                    handleDeleteStudent(stu.id)
                                                }
                                                variant="danger"
                                                className={cx("button")}
                                            >
                                                Xóa
                                            </Button>

                                            <Button
                                                variant="success"
                                                onClick={() =>
                                                    handleClickEditInfo(stu)
                                                }
                                                className={cx("button")}
                                            >
                                                Sửa
                                            </Button>
                                            <Button
                                                variant="info"
                                                onClick={() =>
                                                    handleClickDetailInfo(stu)
                                                }
                                                className={cx("button")}
                                            >
                                                Xem chi tiết
                                            </Button>
                                        </td>
                                    </tr>
                                </Fragment>
                            );
                        }
                    )}
                </tbody>
            </Table>
            {isShow && (
                <AddEditStudent
                    studentShow={studentShow}
                    show={isShow}
                    showAdd={handleClickEditInfo}
                />
            )}
            {isDetail && (
                <DetailStudent
                    studentShow={studentShow}
                    show={isDetail}
                    showDetail={handleClickDetailInfo}
                />
            )}
        </div>
    );
}

export default ListStudent;
