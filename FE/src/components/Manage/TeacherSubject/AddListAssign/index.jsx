import { Button, Modal, Table } from "react-bootstrap";
import * as classNames from "classnames/bind";
import { toast } from "react-toastify";

import styles from "./AddListAssign.module.scss";
import { postListAssignAPI } from "../../../../services/assignService";
import { useEffect, useState } from "react";

const cx = classNames.bind(styles);

function AddListAssign({ show, setShow, listAssignAdd, fileName, getAssign }) {
  const [listAdd, setListAdd] = useState([]);

  const hanelAddList = async () => {
    const status = await postListAssignAPI(listAdd);
    if (status.message === "Success") {
      toast.success("Thêm giáo viên dạy thành công");
      await getAssign();
      setShow(false);
    } else {
      toast.error("Thêm thất bại");
    }
  };

  useEffect(() => {
    setListAdd(
      listAssignAdd.map((item) => {
        return {
          semesterId: item.semesterId,
          subjectId: item.subjectId,
          classId: item.classId,
          teacherId: item.teacherId,
        };
      })
    );
  }, [listAssignAdd]);

  return (
    // <>
    <Modal
      show={show}
      onHide={() => setShow(false)}
      dialogClassName={cx("modal")}
    >
      <Modal.Header closeButton>
        <Modal.Title className={cx("modal-title")}>
          Thêm danh sách thông tin giáo viên
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h2 className={cx("file-name")}>{fileName}</h2>
        <Table striped hover>
          <thead>
            <tr>
              <th className={cx("table-head")}>ID</th>
              <th className={cx("table-head")}>Tên giáo viên</th>

              <th className={cx("table-head")}>Email</th>
              <th className={cx("table-head")}>Số điện thoại</th>
              <th className={cx("table-head")}>Bằng cấp</th>
              <th className={cx("table-head")}>ID lớp</th>
              <th className={cx("table-head")}>Lớp dạy</th>
            </tr>
          </thead>
          <tbody>
            {listAssignAdd.map((tc) => {
              return (
                <tr key={tc.id}>
                  <td className={cx("table-document")}>{tc.teacherId}</td>
                  <td className={cx("table-document")}>{tc.fullName}</td>

                  <td className={cx("table-document")}>{tc.email}</td>

                  <td className={cx("table-document")}>{tc.phone}</td>

                  <td className={cx("table-document")}>
                    {tc.level === 1
                      ? "Cử nhân"
                      : tc.level === 2
                      ? "Thạc sĩ"
                      : tc.level === 3
                      ? "Tiến sĩ"
                      : tc.level === 4
                      ? "Phó giáo sư"
                      : "Giáo sư"}
                  </td>
                  <td className={cx("table-document")}>{tc.classId}</td>
                  <td className={cx("table-document")}>{tc.className}</td>
                </tr>
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
    // </>
  );
}

export default AddListAssign;
