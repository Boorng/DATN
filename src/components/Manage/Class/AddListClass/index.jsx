import * as classNames from "classnames/bind";
import { Fragment } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addListStudent } from "../../../../slices/studentSlice";

import styles from "./AddListClass.module.scss";

const cx = classNames.bind(styles);

function AddListClass({ show, setShow, listClass, fileName }) {
    const dispatch = useDispatch();

    const hanelAddList = () => {
        dispatch(addListStudent(listClass));
        toast.success("Thêm lớp thành công");
        setShow(false);
    };
    return (
        <>
            <Modal
                show={show}
                onHide={() => setShow(false)}
                dialogClassName={cx("modal")}
            >
                <Modal.Header closeButton>
                    <Modal.Title className={cx("modal-title")}>
                        Thêm danh sách thông tin lớp
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h2 className={cx("file-name")}>{fileName}</h2>
                    <Table striped hover>
                        <thead>
                            <tr>
                                <th className={cx("table-head")}>ID</th>
                                <th className={cx("table-head")}>Tên lớp</th>
                                <th className={cx("table-head")}>Khối</th>
                                <th className={cx("table-head")}>Khóa</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listClass.map((cls) => {
                                return (
                                    <Fragment key={cls.Id}>
                                        <tr>
                                            <td
                                                className={cx("table-document")}
                                            >
                                                {cls.Id}
                                            </td>
                                            <td
                                                className={cx("table-document")}
                                            >
                                                {cls.Name}
                                            </td>
                                            <td
                                                className={cx("table-document")}
                                            >
                                                {cls.Grade}
                                            </td>
                                            <td
                                                className={cx("table-document")}
                                            >
                                                {cls.SchoolYear}
                                            </td>
                                        </tr>
                                    </Fragment>
                                );
                            })}
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="primary"
                        className={cx("button-add")}
                        onClick={hanelAddList}
                    >
                        Thêm
                    </Button>
                    <Button
                        variant="secondary"
                        className={cx("button-back")}
                        onClick={() => setShow(false)}
                    >
                        Quay lại
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddListClass;
