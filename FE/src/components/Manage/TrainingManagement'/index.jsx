import * as classNames from "classnames/bind";
import { Fragment, useEffect, useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getSubjectAPI } from "../../../services/subjectService";
import DetailTrainingManage from "./DetailTrainingManage";

import styles from "./TrainingManagement.module.scss";
import UpdateTrainingManage from "./UpdateTrainingManage";

const cx = classNames.bind(styles);

function TrainingManageMent() {
    const { gradeName } = useParams();

    const [listSubject, setListSubject] = useState([]);

    const getSubject = async () => {
        const dataAPI = await getSubjectAPI(gradeName);
        setListSubject(dataAPI);
    };

    useEffect(() => {
        getSubject();
    }, [gradeName]);

    return (
        <div className={cx("manage-training-management")}>
            <h2 className={cx("manage-training-management-title")}>
                QUẢN LÝ ĐÀO TẠO KHỐI {gradeName}
            </h2>
            <div className={cx("manage-training-management-content")}>
                <Table striped hover>
                    <thead>
                        <th className={cx("table-head")}>STT</th>
                        <th className={cx("table-head")}>Môn học</th>
                        <th className={cx("table-head")}>Khối</th>
                        <th className={cx("table-head")}></th>
                    </thead>
                    <tbody>
                        {listSubject.map((sb, index) => {
                            return (
                                <tr key={sb.id}>
                                    <td className={cx("table-body")}>
                                        {index + 1}
                                    </td>
                                    <td className={cx("table-body")}>
                                        {sb.name}
                                    </td>
                                    <td className={cx("table-body")}>
                                        {sb.grade}
                                    </td>
                                    <td className={cx("table-body")}>
                                        <Button
                                            variant="info"
                                            className={cx("button")}
                                        >
                                            Danh sách học sinh
                                        </Button>
                                        <Button
                                            variant="success"
                                            className={cx("button")}
                                        >
                                            Cập nhật
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
                {/* {isDetail && (
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
                )} */}
            </div>
        </div>
    );
}

export default TrainingManageMent;
