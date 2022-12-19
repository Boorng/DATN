import * as classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import Table from "react-bootstrap/Table";
import { Fragment, useCallback, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { read, utils, writeFile } from "xlsx";

import styles from "./ListClass.module.scss";
import FindClass from "../FindClass";
import AddEditClass from "../AddEditClass";
import DetailClass from "../DetailClass";
import { deleteClass } from "../../../../slices/classSlice";

const cx = classNames.bind(styles);

function ListClass() {
    const data = useSelector((state) => state.class.listClass);

    const [listClass, setListClass] = useState([]);

    const [isShow, setIsShow] = useState(false);

    const [isDetail, setIsDetail] = useState(false);

    const [classShow, setClassShow] = useState({});

    const [searchList, setSearchList] = useState({
        list: [],
        input: "",
    });

    const dispatch = useDispatch();

    useEffect(() => {
        setListClass(data);
    }, [data]);

    const handleExport = () => {
        const headings = [["Id", "Name", "Grade", "SchoolYear"]];
        const wb = utils.book_new();
        const ws = utils.json_to_sheet([]);
        utils.sheet_add_aoa(ws, headings);
        utils.sheet_add_json(ws, listClass, { origin: "A2", skipHeader: true });
        utils.book_append_sheet(wb, ws, "Report");
        writeFile(wb, "Class Report.xlsx");
    };

    const handleImport = ($event) => {
        const files = $event.target.files;
        if (files.length) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                const wb = read(event.target.result);
                const sheets = wb.SheetNames;

                if (sheets.length) {
                    const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
                    setListClass(rows);
                }
            };
            reader.readAsArrayBuffer(file);
        }
    };

    const handleDeleteClass = (id) => {
        dispatch(deleteClass(id));
        toast.success("Xóa lớp thành công");
    };

    const handleClickEditInfo = (cls) => {
        if (!isShow) setClassShow(cls);
        else setClassShow({});
        setIsShow(!isShow);
    };

    const handleClickDetailInfo = (stu) => {
        if (!isDetail) setClassShow(stu);
        else setClassShow({});
        setIsDetail(!isDetail);
    };

    const handleSearch = useCallback(
        (input) => {
            if (input) {
                const checkList = listClass.filter(
                    (stu) => stu.id === input || stu.name.includes(input)
                );

                setSearchList({ list: checkList, input });
            } else if (input !== searchList.input) {
                setSearchList({ list: [], input: "" });
            }
        },
        [listClass, searchList.input]
    );

    return (
        <div className={cx("list-class")}>
            <FindClass handleSearch={handleSearch} />
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
                        <th className={cx("table-head")}>ID</th>
                        <th className={cx("table-head")}>Tên lớp</th>
                        <th className={cx("table-head")}>Khối</th>
                        <th className={cx("table-head")}>Khóa</th>
                        <th className={cx("table-head")}></th>
                    </tr>
                </thead>
                <tbody>
                    {(searchList.input ? searchList.list : listClass).map(
                        (cls, index) => {
                            return (
                                <Fragment key={cls.Id}>
                                    <tr>
                                        <td className={cx("table-document")}>
                                            {index + 1}
                                        </td>
                                        <td className={cx("table-document")}>
                                            {cls.Name}
                                        </td>
                                        <td className={cx("table-document")}>
                                            {cls.Grade}
                                        </td>
                                        <td className={cx("table-document")}>
                                            {cls.SchoolYear}
                                        </td>

                                        <td className={cx("list-button")}>
                                            <Button
                                                onClick={() =>
                                                    handleDeleteClass(cls.Id)
                                                }
                                                variant="danger"
                                                className={cx("button")}
                                            >
                                                Xóa
                                            </Button>

                                            <Button
                                                variant="success"
                                                onClick={() =>
                                                    handleClickEditInfo(cls)
                                                }
                                                className={cx("button")}
                                            >
                                                Sửa
                                            </Button>

                                            <Button
                                                variant="info"
                                                className={cx("button")}
                                                onClick={() =>
                                                    handleClickDetailInfo(cls)
                                                }
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
                <AddEditClass
                    classShow={classShow}
                    show={isShow}
                    showAdd={handleClickEditInfo}
                />
            )}
            {isDetail && (
                <DetailClass
                    classShow={classShow}
                    show={isDetail}
                    showDetail={handleClickDetailInfo}
                />
            )}
        </div>
    );
}

export default ListClass;
