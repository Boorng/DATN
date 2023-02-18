import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as classNames from "classnames/bind";

import { getTeacherByAccount } from "../../../services/teacherService";
import { handleCheck } from "../../../utils/common";
import styles from "./SubjectClassTeacher.module.scss";
import { Button, Col, Image, Row } from "react-bootstrap";
import { FaUserAlt } from "react-icons/fa";
import ListSubjectClass from "./ListSubjectClass";
import {
    checkAddMarkAPI,
    getListTestClassAPI,
} from "../../../services/testService";
import AddMarkSubject from "./AddMarkSubject";

const cx = classNames.bind(styles);

function SubjectClassTeacher() {
    const {
        classId,
        className,
        semesterName,
        semesterId,
        subjectName,
        subjectId,
    } = useParams();

    const [listTestStudent, setListTestStudent] = useState([]);
    const [teacher, setTeacher] = useState({});
    const [isAdd, setIsAdd] = useState(false);
    const [markWeight, setMarkWeight] = useState("");
    const [checkListAddMark, setCheckListAddMark] = useState([]);

    const getInformation = async (accountId) => {
        const data = await getTeacherByAccount(accountId);
        setTeacher(data);
    };

    const getListTestClass = async () => {
        const dataAPI = await getListTestClassAPI(
            classId,
            subjectId,
            semesterId
        );

        setListTestStudent(dataAPI);
    };

    const checkAddMark = async () => {
        const data = await checkAddMarkAPI(classId, semesterId, subjectId);
        setCheckListAddMark(data);
    };

    const handleClickAdd = (markWeight) => {
        if (markWeight) {
            setIsAdd(true);
            setMarkWeight(markWeight);
        } else {
            setIsAdd(false);
            setMarkWeight("");
        }
    };

    const navigate = useNavigate();

    useEffect(() => {
        const check = handleCheck();
        if (!check) {
            navigate("/");
        } else {
            if (check.Role === "2") {
                getInformation(check.Id);
                getListTestClass();
                checkAddMark();
            } else {
                navigate("/");
                alert("Bạn không có quyền vào trang này");
            }
        }
    }, [classId, subjectId, semesterId]);

    return (
        <div className={cx("manage-list-student")}>
            <div className={cx("manage-list-student-header")}>
                <h2 className={cx("manage-list-student-title")}>
                    KẾT QUẢ HỌC TẬP LỚP {className} MÔN {subjectName} HỌC KÌ{" "}
                    {semesterName}
                </h2>
                <div className={cx("teacher-user")}>
                    {teacher.avatar ? (
                        <Image
                            src={teacher.avatar}
                            alt="Avatar"
                            className={cx("avatar-image")}
                        />
                    ) : (
                        <FaUserAlt className={cx("avatar-image")} />
                    )}
                    <span className={cx("user-name")}>
                        Xin chào {teacher.fullName}
                    </span>
                </div>
            </div>
            <div className={cx("manage-list-student-content")}>
                <div className={cx("list-button")}>
                    <Row className={cx("list-button-content")}>
                        <Col>
                            <Button
                                className={cx("button")}
                                onClick={() => handleClickAdd(1)}
                            >
                                Nhập điểm hệ số 1
                            </Button>
                        </Col>
                        <Col>
                            <Button
                                className={cx("button")}
                                variant="success"
                                disabled={checkListAddMark.includes(2)}
                                onClick={() => handleClickAdd(2)}
                            >
                                Nhập điểm hệ số 2
                            </Button>
                        </Col>
                        <Col>
                            <Button
                                className={cx("button")}
                                variant="info"
                                disabled={checkListAddMark.includes(3)}
                                onClick={() => handleClickAdd(3)}
                            >
                                Nhập điểm hệ số 3
                            </Button>
                        </Col>
                    </Row>
                </div>
                <div className={cx("manage-list-student-container")}>
                    <ListSubjectClass
                        listTestStudent={listTestStudent}
                        getListTestClass={getListTestClass}
                    />
                </div>
            </div>
            {isAdd && markWeight && (
                <AddMarkSubject
                    markWeight={markWeight}
                    isAdd={isAdd}
                    handleClickAdd={handleClickAdd}
                    listTestStudent={listTestStudent}
                    semesterId={semesterId}
                    subjectId={subjectId}
                    className={className}
                    subjectName={subjectName}
                    semesterName={semesterName}
                    getListTestClass={getListTestClass}
                    checkAddMark={checkAddMark}
                />
            )}
        </div>
    );
}

export default SubjectClassTeacher;
