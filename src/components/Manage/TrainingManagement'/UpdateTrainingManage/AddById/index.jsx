import { Button, Form, Modal, Offcanvas } from "react-bootstrap";
import * as classNames from "classnames/bind";

import styles from "./AddById.module.scss";

const cx = classNames.bind(styles);

function AdđById({ show, showAddById }) {
    return (
        <Modal show={show} onHide={showAddById} dialogClassName={cx("modal")}>
            <Modal.Header closeButton>
                <Modal.Title className={cx("title")}>
                    Nhập ID học sinh:
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Control className={cx("input")} />
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

export default AdđById;
