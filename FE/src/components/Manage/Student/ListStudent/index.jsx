import * as classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import Table from "react-bootstrap/Table";
import { Fragment, useCallback, useState } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";

import { deleteStudent } from "../../../../slices/studentSlice";
import AddEditStudent from "../AddEditStudent";
import Image from "../../../../assets/Image";
import styles from "./ListStudent.module.scss";
import FindStudent from "../FindStudent";

const cx = classNames.bind(styles);

function ListStudent() {
    const listStudent = useSelector((state) => state.student.listStudent);

    const [listShowInfo, setListShowInfo] = useState(listStudent);
    const [searchList, setSearchList] = useState({
        list: [],
        input: "",
    });

    const dispatch = useDispatch();

    const handleDeleteStudent = (id) => {
        setListShowInfo(listShowInfo.filter((idFil) => idFil !== id));
        dispatch(deleteStudent(id));
        toast.success("Xóa học sinh thành công");
    };

    const handleClickShowInfo = (id) => {
        if (listShowInfo.includes(id)) {
            setListShowInfo(listShowInfo.filter((idFil) => idFil !== id));
        } else {
            setListShowInfo([...listShowInfo, id]);
        }
    };

    const handleSearch = useCallback(
        (input) => {
            if (input) {
                const checkList = listStudent.filter(
                    (stu) => stu.id === input || stu.name.includes(input)
                );

                setSearchList({ list: checkList, input });
            } else if (input !== searchList.input) {
                setSearchList({ list: [], input: "" });
            }
        },
        [listStudent, searchList.input]
    );
    console.log("Render List");
    return (
        <div className={cx("list-student")}>
            <FindStudent handleSearch={handleSearch} />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên học sinh</th>
                        <th>Tuổi</th>
                        <th>Giới tính</th>
                        <th>Email</th>
                        <th>Số điện thoại</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {(searchList.input ? searchList.list : listStudent).map(
                        (stu, index) => {
                            return (
                                <Fragment key={stu.id}>
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{stu.name}</td>
                                        <td>{stu.age}</td>
                                        <td>{stu.gender}</td>
                                        <td>{stu.email}</td>
                                        <td>{stu.phoneNum}</td>
                                        <td className={cx("list-button")}>
                                            <Button
                                                onClick={() =>
                                                    handleDeleteStudent(stu.id)
                                                }
                                                variant="danger"
                                                className="me-3"
                                            >
                                                Xóa
                                            </Button>

                                            <div
                                                className={cx("show-list")}
                                                onClick={() =>
                                                    handleClickShowInfo(stu.id)
                                                }
                                            >
                                                <img
                                                    src={Image.icon_collapse}
                                                    alt="icon"
                                                    className={cx(
                                                        "icon-show",
                                                        listShowInfo.includes(
                                                            stu.id
                                                        )
                                                            ? "rotate-down"
                                                            : ""
                                                    )}
                                                />
                                                <button
                                                    className={cx(
                                                        "button-show-list"
                                                    )}
                                                >
                                                    Xem chi tiết
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    {listShowInfo.includes(stu.id) && (
                                        <tr>
                                            <td colSpan={7}>
                                                <AddEditStudent
                                                    studentShow={stu}
                                                />
                                            </td>
                                        </tr>
                                    )}
                                </Fragment>
                            );
                        }
                    )}
                </tbody>
            </Table>
        </div>
    );
}

export default ListStudent;
