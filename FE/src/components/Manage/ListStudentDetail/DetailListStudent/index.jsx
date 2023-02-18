import * as classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { utils, writeFile } from "xlsx";

import { getClassAPI } from "../../../../services/classService";
import { updateStudentClassAPI } from "../../../../services/studentClassService";
import DetailStudent from "../../Student/DetailStudent";
import FindListStudentDetail from "../FindListStudentDetail";
import styles from "./DetailListStudent.module.scss";

const cx = classNames.bind(styles);

function DetailListStudent({ listStudentClass, getStudentClass, className }) {
    const { gradeName, academicYear, classId } = useParams();

    const [listStudentClassExport, setListStudentClassExport] = useState([]);
    const [isUpdate, setIsUpdate] = useState(false);
    const [idUpdate, setIdUpdate] = useState("");
    const [isDetail, setIsDetail] = useState(false);
    const [studentClassShow, setStudentClassShow] = useState({});
    const [listClass, setListClass] = useState([]);
    const [classSelect, SetClassSelect] = useState(classId);

    const getClassOption = async () => {
        const dataAPI = await getClassAPI(gradeName, academicYear);
        setListClass(dataAPI);
    };

    useEffect(() => {
        const lstExport = listStudentClass.map((item) => {
            return {
                id: item.studentId,
                fullName: item.fullName,
                age: item.age,
                gender: item.gender,
                ethnic: item.ethnic,
                dob: item.birthDay,
                email: item.email,
                address: item.address,
                phone: item.phone,
                fatherName: item.fatherName,
                fatherPhone: item.fatherPhone,
                fatherCareer: item.fatherCareer,
                motherName: item.motherName,
                motherPhone: item.motherPhone,
                motherCareer: item.motherCareer,
                status: item.status === 1 ? "Đang học" : "Nghỉ học",
                schoolYear: item.schoolYear,
            };
        });
        setListStudentClassExport(lstExport);
    }, [listStudentClass]);

    const handleExport = () => {
        const headings = [
            [
                "Id",
                "Họ và tên",
                "Tuổi",
                "Giới tính",
                "Dân tộc",
                "Ngày tháng năm sinh",
                "Email",
                "Địa chỉ",
                "Số điện thoại",
                "Tên bố",
                "Số điện thoại bố",
                "Nghề nghiệp bố",
                "Tên mẹ",
                "Số điện thoại mẹ",
                "Nghề nghiệp mẹ",
                "Tình trạng học tập",
            ],
        ];
        const wb = utils.book_new();
        const ws = utils.json_to_sheet([]);
        utils.sheet_add_aoa(ws, headings);
        utils.sheet_add_json(ws, listStudentClassExport, {
            origin: "A2",
            skipHeader: true,
        });
        utils.book_append_sheet(wb, ws, "Report");
        writeFile(
            wb,
            `Danh sách học sinh lớp ${className} năm học ${academicYear}.xlsx`
        );
    };

    const handleConfirmUpdate = async (id) => {
        await getClassOption();
        setIdUpdate(id);
        setIsUpdate(true);
    };

    const handleOnChange = (e) => {
        SetClassSelect(e.target.value);
    };

    const handleUpdateStudentClass = async () => {
        const response = await updateStudentClassAPI(idUpdate, classSelect);
        if (response.message === "Success") {
            toast.success("Chuyển lớp thành công");
            await getStudentClass();
        } else {
            toast.error("Chuyển lớp thất bại");
        }

        setIdUpdate("");
        SetClassSelect(classId);
        setIsUpdate(false);
    };

    const handleClickDetailInfo = (stu) => {
        if (!isDetail) setStudentClassShow(stu);
        else setStudentClassShow({});
        setIsDetail(!isDetail);
    };

    const handleSearch = async (input) => {
        await getStudentClass(input);
    };

    return (
        <div className={cx("list-student-class")}>
            <FindListStudentDetail handleSearch={handleSearch} />
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
                        <th className={cx("table-head")}>ID</th>
                        <th className={cx("table-head")}>Họ và tên</th>
                        <th className={cx("table-head")}>Số điện thoại</th>
                        <th className={cx("table-head")}>Tình trạng học tập</th>
                        <th className={cx("table-head")}></th>
                    </tr>
                </thead>
                <tbody>
                    {listStudentClass.map((sc, index) => {
                        return (
                            <tr key={sc.id}>
                                <td className={cx("table-document")}>
                                    {index + 1}
                                </td>
                                <td className={cx("table-document")}>
                                    {sc.studentId}
                                </td>
                                <td className={cx("table-document")}>
                                    {sc.fullName}
                                </td>
                                <td className={cx("table-document")}>
                                    {sc.phone}
                                </td>
                                <td className={cx("table-document")}>
                                    {sc.status === 0 ? "Nghỉ học" : "Đang học"}
                                </td>

                                <td className={cx("list-button")}>
                                    <Button
                                        variant="info"
                                        className={cx("button")}
                                        onClick={() =>
                                            handleClickDetailInfo(sc)
                                        }
                                    >
                                        Xem chi tiết
                                    </Button>

                                    {sc.status === 1 && (
                                        <Button
                                            variant="success"
                                            className={cx("button")}
                                            onClick={() =>
                                                handleConfirmUpdate(sc.id)
                                            }
                                        >
                                            Chuyển lớp
                                        </Button>
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>

            {isDetail && (
                <DetailStudent
                    studentShow={studentClassShow}
                    show={isDetail}
                    showDetail={handleClickDetailInfo}
                />
            )}

            {isUpdate && (
                <Modal
                    show={isUpdate}
                    onHide={() => setIsUpdate(false)}
                    dialogClassName={cx("modal")}
                    centered
                >
                    <Modal.Header>
                        <Modal.Title className={cx("modal-title")}>
                            Chọn lớp muốn chuyển
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className={cx("modal-content")}>
                        <Form.Select
                            value={classSelect}
                            onChange={handleOnChange}
                            className={cx("form-select")}
                        >
                            {listClass.map((item) => {
                                return (
                                    <option value={item.id}>{item.name}</option>
                                );
                            })}
                        </Form.Select>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="primary"
                            className={cx("button-confirm")}
                            onClick={handleUpdateStudentClass}
                        >
                            Xác nhận
                        </Button>
                        <Button
                            variant="secondary"
                            className={cx("button-back")}
                            onClick={() => setIsUpdate(false)}
                        >
                            Quay lại
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
}

export default DetailListStudent;
