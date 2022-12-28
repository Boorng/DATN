import * as classNames from "classnames/bind";
import { Modal, Table } from "react-bootstrap";

import styles from "./DetailTrainingManage.module.scss";

const cx = classNames.bind(styles);

function DetailTrainingManage({ classShow, show, showDetail }) {
    console.log(classShow);
    return (
        <Modal show={show} onHide={showDetail} dialogClassName={cx("modal")}>
            <Modal.Header closeButton>
                <Modal.Title className={cx("modal-title")}>
                    Danh sách học sinh lớp {classShow.Name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table striped hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tên học sinh</th>
                            <th>Ngày tháng năm sinh</th>
                            <th>Tình trạng học tập</th>
                        </tr>
                    </thead>
                    <tbody>
                        {classShow.ListStudent.map((item) => {
                            return (
                                <tr>
                                    <td>{item.Id}</td>
                                    <td>{item.Name}</td>
                                    <td>{item.Dob}</td>
                                    <td>
                                        {item.Status === "1"
                                            ? "Đang học"
                                            : "Nghỉ học"}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </Modal.Body>
        </Modal>
    );
}

export default DetailTrainingManage;
