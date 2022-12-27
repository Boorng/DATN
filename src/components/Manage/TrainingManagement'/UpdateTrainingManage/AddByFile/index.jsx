import { Button, Modal, Table } from "react-bootstrap";
import * as classNames from "classnames/bind";

import styles from "./AddByFile.module.scss";

const cx = classNames.bind(styles);

function AddByFile({ show, showAddByFile, listAdd, fileName }) {
    return (
        <Modal show={show} onHide={showAddByFile} dialogClassName={cx("modal")}>
            <Modal.Header closeButton>
                <Modal.Title className={cx("modal-title")}>
                    Thêm sinh viên vào lớp bằng file
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h2 className={cx("file-name")}>{fileName}</h2>
                <Table striped hover>
                    <thead>
                        <tr>
                            <th className={cx("table-head")}>STT</th>
                            <th className={cx("table-head")}>ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listAdd.map((cls, index) => {
                            return (
                                <tr key={cls.Id}>
                                    <td>{index + 1}</td>
                                    <td>{cls}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" className={cx("button")}>
                    Thêm
                </Button>
                <Button className={cx("button")}>Quay lại</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddByFile;
