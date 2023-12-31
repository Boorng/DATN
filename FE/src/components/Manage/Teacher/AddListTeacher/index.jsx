import * as classNames from "classnames/bind";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { Button, Modal, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { auth, db } from "../../../../firebase";
import { postListTeacherAPI } from "../../../../services/teacherService";

import styles from "./AddListTeacher.module.scss";

const cx = classNames.bind(styles);

function AddListTeacher({
  show,
  setShow,
  listTeacherAdd,
  fileName,
  getTeacher,
}) {
  const hanelAddList = async () => {
    const status = await postListTeacherAPI(listTeacherAdd);
    if (status.message === "Success") {
      toast.success("Thêm giáo viên thành công");
      await getTeacher();
      setShow(false);
    } else {
      toast.error("Thêm giáo viên thất bại");
    }
  };

  return (
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
              <th className={cx("table-head")}>Tuổi</th>
              <th className={cx("table-head")}>Giới tính</th>
              <th className={cx("table-head")}>Ngày tháng năm sinh</th>
              <th className={cx("table-head")}>Email</th>
              <th className={cx("table-head")}>Địa chỉ</th>
              <th className={cx("table-head")}>Số điện thoại</th>
              <th className={cx("table-head")}>Bằng cấp</th>
            </tr>
          </thead>
          <tbody>
            {listTeacherAdd.map((tc) => {
              return (
                <tr key={tc.id}>
                  <td className={cx("table-document")}>{tc.id}</td>
                  <td className={cx("table-document")}>{tc.fullName}</td>
                  <td className={cx("table-document")}>{tc.age}</td>
                  <td className={cx("table-document")}>{tc.gender}</td>
                  <td className={cx("table-document")}>{tc.birthDay}</td>
                  <td className={cx("table-document")}>{tc.email}</td>
                  <td className={cx("table-document")}>{tc.address}</td>
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
  );
}

export default AddListTeacher;
