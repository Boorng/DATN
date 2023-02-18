import * as classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import { FaUserAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
    getStudentByAccount,
    uploadImageAPI,
} from "../../../services/studentService";
import { handleCheck } from "../../../utils/common";
import styles from "./StudentInformation.module.scss";

const cx = classNames.bind(styles);

function StudentInformation() {
    const [student, setStudent] = useState({});

    const navigate = useNavigate();

    const getInformation = async (accountId) => {
        const data = await getStudentByAccount(accountId);
        setStudent(data);
    };

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("formFile", file);
        formData.append("fileName", file.name);
        const res = await uploadImageAPI(student.id, formData);
        if (res.message === "Success") {
            toast.success("Cập nhật ảnh đại diện thành công");
            await getInformation(student.accountId);
        } else {
            toast.error("Cập nhật ảnh đại đại diện thất bại");
        }
    };

    useEffect(() => {
        const check = handleCheck();
        if (!check) {
            navigate("/");
        } else {
            if (check.Role === "1") {
                getInformation(check.Id);
            } else {
                navigate("/");
                alert("Bạn không có quyền vào trang này");
            }
        }
    }, []);

    return (
        <div className={cx("student-info")}>
            <div className={cx("student-info-header")}>
                <h2 className={cx("student-info-title")}>THÔNG TIN CÁ NHÂN</h2>
                <div className={cx("student-user")}>
                    {student.avatar ? (
                        <Image
                            src={student.avatar}
                            alt="Avatar"
                            className={cx("avatar-image")}
                        />
                    ) : (
                        <FaUserAlt className={cx("avatar-image")} />
                    )}

                    <span className={cx("user-name")}>
                        Xin chào {student.fullName}
                    </span>
                </div>
            </div>
            <div className={cx("student-info-content")}>
                <div className={cx("student-info-content-wrap")}>
                    <h3 className={cx("student-info-content-title")}>
                        Thông tin sinh viên
                    </h3>
                    <Row className={cx("student-info-detail")}>
                        <Col xs={3} className={cx("student-info-image")}>
                            <div className={cx("student-info-image-detail")}>
                                {student.avatar ? (
                                    <Image
                                        src={student.avatar}
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
                                <Col className={cx("student-info-column")}>
                                    <div
                                        className={cx(
                                            "student-info-detail-content"
                                        )}
                                    >
                                        <span
                                            className={cx(
                                                "student-info-detail-content-title"
                                            )}
                                        >
                                            ID học sinh:
                                        </span>
                                        <span
                                            className={cx(
                                                "student-info-detail-content-child"
                                            )}
                                        ></span>
                                        {student.id}
                                    </div>
                                    <div
                                        className={cx(
                                            "student-info-detail-content"
                                        )}
                                    >
                                        <span
                                            className={cx(
                                                "student-info-detail-content-title"
                                            )}
                                        >
                                            Họ và tên:
                                        </span>
                                        <span
                                            className={cx(
                                                "student-info-detail-content-child"
                                            )}
                                        ></span>
                                        {student.fullName}
                                    </div>
                                    <div
                                        className={cx(
                                            "student-info-detail-content"
                                        )}
                                    >
                                        <span
                                            className={cx(
                                                "student-info-detail-content-title"
                                            )}
                                        >
                                            Niên khóa:
                                        </span>
                                        <span
                                            className={cx(
                                                "student-info-detail-content-child"
                                            )}
                                        >
                                            {student.schoolYear}
                                        </span>
                                    </div>
                                    <div
                                        className={cx(
                                            "student-info-detail-content"
                                        )}
                                    >
                                        <span
                                            className={cx(
                                                "student-info-detail-content-title"
                                            )}
                                        >
                                            Dân tộc:
                                        </span>
                                        <span
                                            className={cx(
                                                "student-info-detail-content-child"
                                            )}
                                        >
                                            {student.ethnic}
                                        </span>
                                    </div>
                                    <div
                                        className={cx(
                                            "student-info-detail-content"
                                        )}
                                    >
                                        <span
                                            className={cx(
                                                "student-info-detail-content-title"
                                            )}
                                        >
                                            Tình trạng học tập:
                                        </span>
                                        <span
                                            className={cx(
                                                "student-info-detail-content-child"
                                            )}
                                        >
                                            {student.status === 1
                                                ? "Đang học"
                                                : "Nghỉ học"}
                                        </span>
                                    </div>
                                </Col>
                                <Col className={cx("student-info-column")}>
                                    <div
                                        className={cx(
                                            "student-info-detail-content"
                                        )}
                                    >
                                        <span
                                            className={cx(
                                                "student-info-detail-content-title"
                                            )}
                                        >
                                            Ngày tháng năm sinh:
                                        </span>
                                        <span
                                            className={cx(
                                                "student-info-detail-content-child"
                                            )}
                                        >
                                            {student.birthDay}
                                        </span>
                                    </div>
                                    <div
                                        className={cx(
                                            "student-info-detail-content"
                                        )}
                                    >
                                        <span
                                            className={cx(
                                                "student-info-detail-content-title"
                                            )}
                                        >
                                            Giới tính:
                                        </span>
                                        <span
                                            className={cx(
                                                "student-info-detail-content-child"
                                            )}
                                        >
                                            {student.gender}
                                        </span>
                                    </div>
                                    <div
                                        className={cx(
                                            "student-info-detail-content"
                                        )}
                                    >
                                        <span
                                            className={cx(
                                                "student-info-detail-content-title"
                                            )}
                                        >
                                            Số điện thoai:
                                        </span>
                                        <span
                                            className={cx(
                                                "student-info-detail-content-child"
                                            )}
                                        >
                                            {student.phone}
                                        </span>
                                    </div>
                                    <div
                                        className={cx(
                                            "student-info-detail-content"
                                        )}
                                    >
                                        <span
                                            className={cx(
                                                "student-info-detail-content-title"
                                            )}
                                        >
                                            Email:
                                        </span>
                                        <span
                                            className={cx(
                                                "student-info-detail-content-child"
                                            )}
                                        >
                                            {student.email}
                                        </span>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>

                <hr className={cx("custom-line")} />

                <div className={cx("student-info-content-wrap")}>
                    <h3 className={cx("student-info-content-title")}>
                        Thông tin cá nhân
                    </h3>
                    <Row className={cx("student-info-detail")}>
                        <Col className={cx("student-info-column")}>
                            <div className={cx("student-info-detail-content")}>
                                <span
                                    className={cx(
                                        "student-info-detail-content-title"
                                    )}
                                >
                                    Họ và tên bố:
                                </span>
                                <span
                                    className={cx(
                                        "student-info-detail-content-child"
                                    )}
                                ></span>
                                {student.fatherName}
                            </div>
                            <div className={cx("student-info-detail-content")}>
                                <span
                                    className={cx(
                                        "student-info-detail-content-title"
                                    )}
                                >
                                    Nghề nghiệp:
                                </span>
                                <span
                                    className={cx(
                                        "student-info-detail-content-child"
                                    )}
                                >
                                    {student.fatherCareer}
                                </span>
                            </div>
                            <div className={cx("student-info-detail-content")}>
                                <span
                                    className={cx(
                                        "student-info-detail-content-title"
                                    )}
                                >
                                    Số điện thoại:
                                </span>
                                <span
                                    className={cx(
                                        "student-info-detail-content-child"
                                    )}
                                >
                                    {student.fatherPhone}
                                </span>
                            </div>
                        </Col>
                        <Col className={cx("student-info-column")}>
                            <div className={cx("student-info-detail-content")}>
                                <span
                                    className={cx(
                                        "student-info-detail-content-title"
                                    )}
                                >
                                    Họ và tên mẹ:
                                </span>
                                <span
                                    className={cx(
                                        "student-info-detail-content-child"
                                    )}
                                >
                                    {student.motherName}
                                </span>
                            </div>
                            <div className={cx("student-info-detail-content")}>
                                <span
                                    className={cx(
                                        "student-info-detail-content-title"
                                    )}
                                >
                                    Nghề nghiệp:
                                </span>
                                <span
                                    className={cx(
                                        "student-info-detail-content-child"
                                    )}
                                >
                                    {student.motherCareer}
                                </span>
                            </div>
                            <div className={cx("student-info-detail-content")}>
                                <span
                                    className={cx(
                                        "student-info-detail-content-title"
                                    )}
                                >
                                    Số điện thoai:
                                </span>
                                <span
                                    className={cx(
                                        "student-info-detail-content-child"
                                    )}
                                >
                                    {student.motherPhone}
                                </span>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    );
}

export default StudentInformation;
