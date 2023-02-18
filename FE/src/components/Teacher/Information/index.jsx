import * as classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import { FaUserAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
    getTeacherByAccount,
    UploadImageTeacherAPI,
} from "../../../services/teacherService";
import { handleCheck } from "../../../utils/common";
import styles from "./TeacherInformation.module.scss";

const cx = classNames.bind(styles);

function TeacherInformation() {
    const [teacher, setTeacher] = useState({});

    const navigate = useNavigate();

    const getInformation = async (accountId) => {
        const data = await getTeacherByAccount(accountId);
        setTeacher(data);
    };

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("formFile", file);
        formData.append("fileName", file.name);
        const res = await UploadImageTeacherAPI(teacher.id, formData);
        if (res.message === "Success") {
            await getInformation(teacher.accountId);
            toast.success("Cập nhật ảnh đại diện thành công");
        } else {
            toast.error("Cập nhật ảnh đại đại diện thất bại");
        }
    };

    useEffect(() => {
        const check = handleCheck();
        if (!check) {
            navigate("/");
        } else {
            if (check.Role === "2") {
                getInformation(check.Id);
            } else {
                navigate("/");
                alert("Bạn không có quyền vào trang này");
            }
        }
    }, []);

    return (
        <div className={cx("teacher-info")}>
            <div className={cx("teacher-info-header")}>
                <h2 className={cx("teacher-info-title")}>THÔNG TIN CÁ NHÂN</h2>
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
            <div className={cx("teacher-info-content")}>
                <div className={cx("teacher-info-content-wrap")}>
                    <h3 className={cx("teacher-info-content-title")}>
                        Thông tin giáo viên
                    </h3>
                    <Row className={cx("teacher-info-detail")}>
                        <Col xs={3} className={cx("teacher-info-image")}>
                            <div className={cx("teacher-info-image-detail")}>
                                {teacher.avatar ? (
                                    <Image
                                        src={teacher.avatar}
                                        alt="Avatar"
                                        className={cx("avatar-image-detail")}
                                    />
                                ) : (
                                    <FaUserAlt
                                        className={cx("avatar-image-detail")}
                                    />
                                )}
                            </div>
                            <div>
                                <input
                                    id="file"
                                    type="file"
                                    onChange={handleUpload}
                                    hidden
                                />
                                <label
                                    htmlFor="file"
                                    className={cx("button-upload-image")}
                                >
                                    Cập nhật ảnh đại diện
                                </label>
                            </div>
                        </Col>
                        <Col xs={9}>
                            <Row>
                                <Col className={cx("teacher-info-column")}>
                                    <div
                                        className={cx(
                                            "teacher-info-detail-content"
                                        )}
                                    >
                                        <span
                                            className={cx(
                                                "teacher-info-detail-content-title"
                                            )}
                                        >
                                            ID giáo viên:
                                        </span>
                                        <span
                                            className={cx(
                                                "teacher-info-detail-content-child"
                                            )}
                                        ></span>
                                        {teacher.id}
                                    </div>
                                    <div
                                        className={cx(
                                            "teacher-info-detail-content"
                                        )}
                                    >
                                        <span
                                            className={cx(
                                                "teacher-info-detail-content-title"
                                            )}
                                        >
                                            Họ và tên:
                                        </span>
                                        <span
                                            className={cx(
                                                "teacher-info-detail-content-child"
                                            )}
                                        ></span>
                                        {teacher.fullName}
                                    </div>

                                    <div
                                        className={cx(
                                            "teacher-info-detail-content"
                                        )}
                                    >
                                        <span
                                            className={cx(
                                                "teacher-info-detail-content-title"
                                            )}
                                        >
                                            Dân tộc:
                                        </span>
                                        <span
                                            className={cx(
                                                "teacher-info-detail-content-child"
                                            )}
                                        >
                                            {teacher.ethnic}
                                        </span>
                                    </div>
                                    <div
                                        className={cx(
                                            "teacher-info-detail-content"
                                        )}
                                    >
                                        <span
                                            className={cx(
                                                "teacher-info-detail-content-title"
                                            )}
                                        >
                                            Tình trạng làm việc:
                                        </span>
                                        <span
                                            className={cx(
                                                "teacher-info-detail-content-child"
                                            )}
                                        >
                                            {teacher.status === 1
                                                ? "Đang làm"
                                                : "Nghỉ việc"}
                                        </span>
                                    </div>
                                    <div
                                        className={cx(
                                            "teacher-info-detail-content"
                                        )}
                                    >
                                        <span
                                            className={cx(
                                                "teacher-info-detail-content-title"
                                            )}
                                        >
                                            Bằng cấp:
                                        </span>
                                        <span
                                            className={cx(
                                                "teacher-info-detail-content-child"
                                            )}
                                        >
                                            {teacher.level === 1
                                                ? "Cử nhân"
                                                : teacher.level === 2
                                                ? "Thạc sĩ"
                                                : teacher.level === 3
                                                ? "Tiến sĩ"
                                                : teacher.level === 4
                                                ? "Phó giáo sư"
                                                : "Giáo sư"}
                                        </span>
                                    </div>
                                </Col>
                                <Col className={cx("teacher-info-column")}>
                                    <div
                                        className={cx(
                                            "teacher-info-detail-content"
                                        )}
                                    >
                                        <span
                                            className={cx(
                                                "teacher-info-detail-content-title"
                                            )}
                                        >
                                            Ngày tháng năm sinh:
                                        </span>
                                        <span
                                            className={cx(
                                                "teacher-info-detail-content-child"
                                            )}
                                        >
                                            {teacher.birthDay}
                                        </span>
                                    </div>
                                    <div
                                        className={cx(
                                            "teacher-info-detail-content"
                                        )}
                                    >
                                        <span
                                            className={cx(
                                                "teacher-info-detail-content-title"
                                            )}
                                        >
                                            Giới tính:
                                        </span>
                                        <span
                                            className={cx(
                                                "teacher-info-detail-content-child"
                                            )}
                                        >
                                            {teacher.gender}
                                        </span>
                                    </div>
                                    <div
                                        className={cx(
                                            "teacher-info-detail-content"
                                        )}
                                    >
                                        <span
                                            className={cx(
                                                "teacher-info-detail-content-title"
                                            )}
                                        >
                                            Số điện thoai:
                                        </span>
                                        <span
                                            className={cx(
                                                "teacher-info-detail-content-child"
                                            )}
                                        >
                                            {teacher.phone}
                                        </span>
                                    </div>
                                    <div
                                        className={cx(
                                            "teacher-info-detail-content"
                                        )}
                                    >
                                        <span
                                            className={cx(
                                                "teacher-info-detail-content-title"
                                            )}
                                        >
                                            Email:
                                        </span>
                                        <span
                                            className={cx(
                                                "teacher-info-detail-content-child"
                                            )}
                                        >
                                            {teacher.email}
                                        </span>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>

                {/* <hr className={cx("custom-line")} /> */}
            </div>
        </div>
    );
}

export default TeacherInformation;
