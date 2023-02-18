import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as classNames from "classnames/bind";
import { Button, Form, Modal, Table } from "react-bootstrap";

import styles from "./EditMarkResult.module.scss";
import {
    getStudentResult,
    updateTestAPI,
} from "../../../../../services/testService";
import { toast } from "react-toastify";
import { handleCheck } from "../../../../../utils/common";

const cx = classNames.bind(styles);

function EditMarkResult() {
    const { divisionId, semesterId, gradeName } = useParams();
    const [result, setResult] = useState([]);
    const [markEdit, setMarkEdit] = useState({});
    const [showEdit, setShowEdit] = useState(false);
    const [subjectEdit, setSubjectEdit] = useState("");

    const getResult = async () => {
        const dataAPI = await getStudentResult(
            divisionId,
            gradeName,
            semesterId
        );

        setResult(dataAPI);
    };

    const handleEditClick = (testEdit, subjectName) => {
        setMarkEdit(testEdit);
        setSubjectEdit(subjectName);
        setShowEdit(true);
    };

    const handleOnChange = (e) => {
        setMarkEdit({ ...markEdit, mark: e.target.value });
    };

    const handleEditMark = async () => {
        const res = await updateTestAPI(markEdit);
        if (res.message === "Success") {
            await getResult();
            toast.success("Cập nhật điểm thành công");
        } else {
            toast.error("Cập nhật điểm thất bại");
        }
        setMarkEdit({});
        setSubjectEdit("");
        setShowEdit(false);
    };

    const navigate = useNavigate();

    useEffect(() => {
        const check = handleCheck();
        if (!check) {
            navigate("/");
        } else {
            if (check.Role === "3") getResult();
            else {
                navigate("/");
                alert("Bạn không có quyền vào trang này");
            }
        }
    }, [divisionId, semesterId]);

    return (
        <div className={cx("manage-list-student")}>
            <div className={cx("manage-list-student-content")}>
                <Table striped>
                    <thead>
                        <tr>
                            <th className={cx("table-head", "subject")}>
                                Môn học
                            </th>
                            <th className={cx("table-head")}>Hệ số 1</th>
                            <th className={cx("table-head")}>Hệ số 2</th>
                            <th className={cx("table-head")}>Hệ số 3</th>
                        </tr>
                    </thead>
                    <tbody>
                        {result.map((res) => {
                            return (
                                <tr key={res.subjectId}>
                                    <td className={cx("table-document")}>
                                        {res.subjectName}
                                    </td>
                                    <td
                                        className={cx(
                                            "table-document",
                                            res.factorOne.length
                                                ? "column-divide"
                                                : "table-element"
                                        )}
                                    >
                                        {res.factorOne.map((item) => {
                                            return (
                                                <td
                                                    className={cx(
                                                        "table-document",
                                                        "table-element"
                                                    )}
                                                    key={item.id}
                                                    onClick={() =>
                                                        handleEditClick(
                                                            item,
                                                            res.subjectName
                                                        )
                                                    }
                                                >
                                                    {item.mark}
                                                </td>
                                            );
                                        })}
                                    </td>
                                    <td
                                        className={cx(
                                            "table-document",
                                            "table-element"
                                        )}
                                        onClick={() =>
                                            handleEditClick(
                                                res.factorTwo,
                                                res.subjectName
                                            )
                                        }
                                    >
                                        {res.factorTwo &&
                                            res.factorTwo.hasOwnProperty(
                                                "mark"
                                            ) &&
                                            res.factorTwo.mark}
                                    </td>
                                    <td
                                        className={cx(
                                            "table-document",
                                            "table-element"
                                        )}
                                        onClick={() =>
                                            handleEditClick(
                                                res.factorThree,
                                                res.subjectName
                                            )
                                        }
                                    >
                                        {res.factorThree &&
                                            res.factorThree.hasOwnProperty(
                                                "mark"
                                            ) &&
                                            res.factorThree.mark}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>

                {markEdit.hasOwnProperty("mark") && (
                    <Modal
                        show={showEdit}
                        onHide={() => setShowEdit(false)}
                        dialogClassName={cx("modal")}
                    >
                        <Modal.Header>
                            <Modal.Title>
                                <h3 className={cx("form-title")}>
                                    Cập nhật điểm bài kiểm tra hệ số{" "}
                                    {markEdit.markWeight} môn {subjectEdit}
                                </h3>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Control
                                className={cx("form-control")}
                                type="text"
                                placeholder="Nhập điểm"
                                required
                                onChange={handleOnChange}
                                value={markEdit.mark}
                                name="mark"
                            />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                className={cx("button-update")}
                                onClick={handleEditMark}
                            >
                                Cập nhật
                            </Button>
                            <Button
                                variant="secondary"
                                className={cx("button-back")}
                                onClick={() => setShowEdit(false)}
                            >
                                Quay lại
                            </Button>
                        </Modal.Footer>
                    </Modal>
                )}
            </div>
        </div>
    );
}

export default EditMarkResult;
