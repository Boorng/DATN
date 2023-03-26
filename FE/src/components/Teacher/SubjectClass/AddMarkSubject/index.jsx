import { Button, Form, Modal, Table } from "react-bootstrap";
import * as classNames from "classnames/bind";

import styles from "./AddMarkSubject.module.scss";
import { useEffect, useState } from "react";
import { addListTestAPI } from "../../../../services/testService";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);

function AddMarkSubject({
    markWeight,
    isAdd,
    handleClickAdd,
    listTestStudent,
    semesterId,
    subjectId,
    className,
    subjectName,
    semesterName,
    getListTestClass,
    checkAddMark,
}) {
    const [listTestStudentAdd, setListTestStudentAdd] = useState([]);

    useEffect(() => {
        setListTestStudentAdd(
            listTestStudent.map((item) => {
                return {
                    comment: "",
                    markWeight: markWeight,
                    mark: "",
                    subjectId: +subjectId,
                    semesterId: +semesterId,
                    divisionId: item.divisionId,
                };
            })
        );
    }, [listTestStudent]);

    const handleOnChange = (e, divisionId) => {
        const listCopy = listTestStudentAdd;
        listCopy.forEach((item) => {
            if (item.divisionId === divisionId) {
                // if (e.target.name === "mark") {
                //     item[e.target.name] = e.target.value;
                // } else {
                item[e.target.name] = e.target.value;
                // }
            }
        });

        setListTestStudentAdd(listCopy);
    };

    const handleUpdateMark = async (e) => {
        e.preventDefault();
        const res = await addListTestAPI(listTestStudentAdd);
        if (res.message === "Success") {
            toast.success("Cập nhật dữ liệu thành công");
            await getListTestClass();
            await checkAddMark();
            handleClickAdd();
        } else {
            toast.error("Cập nhật thất bại");
        }
    };

    return (
        <Modal
            show={isAdd}
            onHide={() => handleClickAdd()}
            dialogClassName={cx("modal")}
        >
            <Modal.Header closeButton>
                <Modal.Title className={cx("modal-title")}>
                    NHẬP ĐIỂM HỆ SỐ {markWeight} LỚP {className} MÔN{" "}
                    {subjectName} HỌC KỲ {semesterName}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className={cx("form")} onSubmit={handleUpdateMark}>
                    <Table striped hover>
                        <thead>
                            <tr>
                                <th className={cx("table-head")}>ID</th>
                                <th className={cx("table-head")}>Họ và tên</th>
                                <th className={cx("table-head")}>Điểm</th>
                                <th className={cx("table-head")}>Nhận xét</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listTestStudent.map((stu) => {
                                return (
                                    <tr key={stu.divisionId}>
                                        <td className={cx("table-document")}>
                                            {stu.studentId}
                                        </td>
                                        <td className={cx("table-document")}>
                                            {stu.studentName}
                                        </td>
                                        <td className={cx("table-document")}>
                                            <Form.Control
                                                type="number"
                                                value={stu.mark}
                                                name="mark"
                                                className={cx("form-control")}
                                                required
                                                onChange={(e) =>
                                                    handleOnChange(
                                                        e,
                                                        stu.divisionId
                                                    )
                                                }
                                                min={0}
                                                max={10}
                                            />
                                        </td>
                                        <td className={cx("table-document")}>
                                            <Form.Control
                                                type="text"
                                                value={stu.comment}
                                                name="comment"
                                                className={cx("form-control")}
                                                onChange={(e) =>
                                                    handleOnChange(
                                                        e,
                                                        stu.divisionId
                                                    )
                                                }
                                            />
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                    <Modal.Footer>
                        <Button
                            type="submit"
                            className={cx("button-add")}
                            variant="success"
                        >
                            Cập nhật
                        </Button>
                        <Button
                            className={cx("button-back")}
                            onClick={() => handleClickAdd()}
                        >
                            Quay lại
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default AddMarkSubject;
