import * as classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import Table from "react-bootstrap/Table";
import { Fragment, useCallback, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { utils, writeFile } from "xlsx";

import styles from "./ListTeacher.module.scss";
import { deleteTeacher } from "../../../../slices/teacherSlice";
import FindTeacher from "../FindTeacher";
import DetailTeacher from "../DetailTeacher";
import AddEditTeacher from "../AddEditTeacher";

const cx = classNames.bind(styles);

function ListTeacher() {
    const data = useSelector((state) => state.teacher.listTeacher);

    const [listTeacher, setListTeacher] = useState([]);

    const [isShow, setIsShow] = useState(false);

    const [isDetail, setIsDetail] = useState(false);

    const [teacherShow, setTeacherShow] = useState({});

    const [searchList, setSearchList] = useState({
        list: [],
        input: "",
    });

    const dispatch = useDispatch();

    useEffect(() => {
        setListTeacher(data);
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
                "Status",
                "Level",
                "Leader",
                "ViceLeader",
                "TeamId",
            ],
        ];
        const wb = utils.book_new();
        const ws = utils.json_to_sheet([]);
        utils.sheet_add_aoa(ws, headings);
        utils.sheet_add_json(ws, listTeacher, {
            origin: "A2",
            skipHeader: true,
        });
        utils.book_append_sheet(wb, ws, "Report");
        writeFile(wb, "TeacherReport.xlsx");
    };

    const handleDeleteTeacher = (id) => {
        dispatch(deleteTeacher(id));
        toast.success("Xóa giáo viên thành công");
    };

    const handleClickEditInfo = (stu) => {
        if (!isShow) setTeacherShow(stu);
        else setTeacherShow({});
        setIsShow(!isShow);
    };

    const handleClickDetailInfo = (stu) => {
        if (!isDetail) setTeacherShow(stu);
        else setTeacherShow({});
        setIsDetail(!isDetail);
    };

    const handleSearch = useCallback(
        (input) => {
            if (input) {
                const checkList = listTeacher.filter(
                    (stu) => stu.id === input || stu.name.includes(input)
                );

                setSearchList({ list: checkList, input });
            } else if (input !== searchList.input) {
                setSearchList({ list: [], input: "" });
            }
        },
        [listTeacher, searchList.input]
    );

    return (
        <div className={cx("list-teacher")}>
            <FindTeacher handleSearch={handleSearch} />
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
                        <th className={cx("table-head")}>Tên giáo viên</th>
                        <th className={cx("table-head")}>Tuổi</th>
                        <th className={cx("table-head")}>Email</th>
                        <th className={cx("table-head")}>Số điện thoại</th>
                        <th className={cx("table-head")}>Chức danh</th>
                        <th className={cx("table-head")}></th>
                    </tr>
                </thead>
                <tbody>
                    {(searchList.input ? searchList.list : listTeacher).map(
                        (tea, index) => {
                            return (
                                <Fragment key={tea.id}>
                                    <tr>
                                        <td className={cx("table-document")}>
                                            {index + 1}
                                        </td>
                                        <td className={cx("table-document")}>
                                            {tea.Name}
                                        </td>
                                        <td className={cx("table-document")}>
                                            {tea.Age}
                                        </td>
                                        <td className={cx("table-document")}>
                                            {tea.Email}
                                        </td>
                                        <td className={cx("table-document")}>
                                            {tea.PhoneNum}
                                        </td>
                                        <td className={cx("table-document")}>
                                            {tea.Level === "1"
                                                ? "Cử nhân"
                                                : tea.level === "2"
                                                ? "Thạc sĩ"
                                                : tea.level === "2"
                                                ? "Tiến sĩ"
                                                : tea.level === "4"
                                                ? "Phó giáo sư"
                                                : "Giáo sư"}
                                        </td>
                                        <td className={cx("list-button")}>
                                            <Button
                                                onClick={() =>
                                                    handleDeleteTeacher(tea.id)
                                                }
                                                variant="danger"
                                                className={cx("button")}
                                            >
                                                Xóa
                                            </Button>

                                            <Button
                                                variant="success"
                                                onClick={() =>
                                                    handleClickEditInfo(tea)
                                                }
                                                className={cx("button")}
                                            >
                                                Sửa
                                            </Button>
                                            <Button
                                                variant="info"
                                                onClick={() =>
                                                    handleClickDetailInfo(tea)
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
                <AddEditTeacher
                    teacherShow={teacherShow}
                    show={isShow}
                    showAdd={handleClickEditInfo}
                />
            )}
            {isDetail && (
                <DetailTeacher
                    teacherShow={teacherShow}
                    show={isDetail}
                    showDetail={handleClickDetailInfo}
                />
            )}
        </div>
    );
}

export default ListTeacher;
