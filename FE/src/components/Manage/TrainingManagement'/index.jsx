import * as classNames from "classnames/bind";
import { Fragment, useEffect, useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import DetailTrainingManage from "./DetailTrainingManage";

import styles from "./TrainingManagement.module.scss";
import UpdateTrainingManage from "./UpdateTrainingManage";

const cx = classNames.bind(styles);

function TrainingManageMent() {
    const { gradeName } = useParams();

    const [semester, setSemester] = useState("");

    const [classShow, setClassShow] = useState({});

    const [isShow, setIsShow] = useState(false);

    const [isDetail, setIsDetail] = useState(false);

    const listSemester = ["20221", "20222"];

    const listClass = [
        {
            Id: 1,
            Name: "6A1",
            HeadTeacher: "Nguyễn Quang Thu Phương",
            NumberStudent: 3,
            ListStudent: [
                {
                    Id: 1,
                    Name: "Trần Đức Trung 1",
                    Dob: "12/12/2000",
                    Status: "1",
                },
                {
                    Id: 2,
                    Name: "Trần Đức Trung 2",
                    Dob: "12/12/2000",
                    Status: "1",
                },
                {
                    Id: 3,
                    Name: "Trần Đức Trung 3",
                    Dob: "12/12/2000",
                    Status: "1",
                },
            ],
        },
        {
            Id: 2,
            Name: "6A2",
            HeadTeacher: "Nguyễn Quang Thu Phương 2",
            NumberStudent: 3,
            ListStudent: [
                {
                    Id: 1,
                    Name: "Trần Đức Trung 1",
                    Dob: "12/12/2000",
                    Status: "1",
                },
                {
                    Id: 2,
                    Name: "Trần Đức Trung 2",
                    Dob: "12/12/2000",
                    Status: "1",
                },
                {
                    Id: 3,
                    Name: "Trần Đức Trung 3",
                    Dob: "12/12/2000",
                    Status: "1",
                },
            ],
        },
        {
            Id: 3,
            Name: "6A3",
            HeadTeacher: "Nguyễn Quang Thu Phương 3",
            NumberStudent: 3,
            ListStudent: [
                {
                    Id: 1,
                    Name: "Trần Đức Trung 1",
                    Dob: "12/12/2000",
                    Status: "1",
                },
                {
                    Id: 2,
                    Name: "Trần Đức Trung 2",
                    Dob: "12/12/2000",
                    Status: "1",
                },
                {
                    Id: 3,
                    Name: "Trần Đức Trung 3",
                    Dob: "12/12/2000",
                    Status: "1",
                },
            ],
        },
    ];

    useEffect(() => {}, [semester]);

    const handleSelect = (e) => {
        setSemester(e.target.value);
    };

    const handleClickDetail = (cls) => {
        if (!isDetail) setClassShow(cls);
        else setClassShow({});
        setIsDetail(!isDetail);
    };

    const handleClickEdit = (cls) => {
        if (!isShow) setClassShow(cls);
        else setClassShow({});
        setIsShow(!isShow);
    };

    return (
        <div className={cx("manage-training-management")}>
            <h2 className={cx("manage-training-management-title")}>
                QUẢN LÝ ĐÀO TẠO KHỐI {gradeName}
            </h2>
            <div className={cx("manage-training-management-content")}>
                <Row className={cx("manage-training-management-semester")}>
                    <Col xs={1}>
                        <Form.Label className={cx("form-label")}>
                            Học kỳ:
                        </Form.Label>
                    </Col>
                    <Col xs={2}>
                        <Form.Select
                            className={cx("form-select")}
                            onChange={handleSelect}
                        >
                            {listSemester.map((item) => {
                                return <option value={item}>{item}</option>;
                            })}
                        </Form.Select>
                    </Col>
                </Row>
                <Table striped hover>
                    <thead>
                        <th className={cx("table-head")}>Lớp</th>
                        <th className={cx("table-head")}>
                            Giáo viên chủ nhiệm
                        </th>
                        <th className={cx("table-head")}>Sĩ số</th>
                        <th className={cx("table-head")}></th>
                    </thead>
                    <tbody>
                        {listClass.map((cls) => {
                            return (
                                <tr key={cls.Id}>
                                    <td className={cx("table-body")}>
                                        {cls.Name}
                                    </td>
                                    <td className={cx("table-body")}>
                                        {cls.HeadTeacher}
                                    </td>
                                    <td className={cx("table-body")}>
                                        {cls.NumberStudent}
                                    </td>
                                    <td className={cx("table-body")}>
                                        <Button
                                            variant="info"
                                            className={cx("button")}
                                            onClick={() =>
                                                handleClickDetail(cls)
                                            }
                                        >
                                            Danh sách học sinh
                                        </Button>
                                        <Button
                                            variant="success"
                                            className={cx("button")}
                                            onClick={() => handleClickEdit(cls)}
                                        >
                                            Cập nhật
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
                {isDetail && (
                    <DetailTrainingManage
                        classShow={classShow}
                        show={isDetail}
                        showDetail={handleClickDetail}
                    />
                )}
                {isShow && (
                    <UpdateTrainingManage
                        classShow={classShow}
                        show={isShow}
                        showEdit={handleClickEdit}
                    />
                )}
            </div>
        </div>
    );
}

export default TrainingManageMent;
