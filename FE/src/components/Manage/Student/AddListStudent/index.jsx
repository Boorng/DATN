import * as classNames from "classnames/bind";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { Button, Modal, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { auth, db } from "../../../../firebase";
import { postListStudentAPI } from "../../../../services/studentService";

import styles from "./AddListStudent.module.scss";

const cx = classNames.bind(styles);

function AddListStudent({
    show,
    setShow,
    listStudentAdd,
    fileName,
    getStudent,
    currentUser,
}) {
    const hanelAddList = async () => {
        const status = await postListStudentAPI(listStudentAdd);
        if (status.message === "Success") {
            try {
                status.dataContent.forEach(async (item) => {
                    const res = await createUserWithEmailAndPassword(
                        auth,
                        item.email,
                        item.password
                    );

                    auth.updateCurrentUser(currentUser);

                    await updateProfile(res.user, {
                        displayName: `${item.fullName} - ${item.id}`,
                    });

                    //create user on firestore
                    await setDoc(doc(db, "users", res.user.uid), {
                        uid: res.user.uid,
                        displayName: `${item.fullName} - ${item.id}`,
                        email: item.email,
                    });

                    //create empty user chats on firestore
                    await setDoc(doc(db, "userChats", res.user.uid), {});
                });
                toast.success("Thêm học sinh thành công");
                await getStudent();
                setShow(false);
            } catch (err) {
                console.log(err);
                toast.error("Thêm học sinh thất bại do lỗi server");
            }
        } else {
            toast.error("Thêm học sinh thất bại");
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
                    Thêm danh sách thông tin học sinh
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h2 className={cx("file-name")}>{fileName}</h2>
                <Table striped hover>
                    <thead>
                        <tr>
                            <th className={cx("table-head")}>ID</th>
                            <th className={cx("table-head")}>Tên học sinh</th>
                            <th className={cx("table-head")}>Tuổi</th>
                            <th className={cx("table-head")}>Giới tính</th>
                            <th className={cx("table-head")}>Dân tộc</th>
                            <th className={cx("table-head")}>
                                Ngày tháng năm sinh
                            </th>
                            <th className={cx("table-head")}>Email</th>
                            <th className={cx("table-head")}>Địa chỉ</th>
                            <th className={cx("table-head")}>Số điện thoại</th>
                            <th className={cx("table-head")}>Tên bố</th>
                            <th className={cx("table-head")}>
                                Số điện thoại bố
                            </th>
                            <th className={cx("table-head")}>Nghề nghiệp bố</th>
                            <th className={cx("table-head")}>Tên mẹ</th>
                            <th className={cx("table-head")}>
                                Số điện thoại mẹ
                            </th>
                            <th className={cx("table-head")}>Nghề nghiệp mẹ</th>
                            <th className={cx("table-head")}>Niên khóa</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listStudentAdd.map((stu) => {
                            return (
                                <tr key={stu.id}>
                                    <td className={cx("table-document")}>
                                        {stu.id}
                                    </td>
                                    <td className={cx("table-document")}>
                                        {stu.fullName}
                                    </td>
                                    <td className={cx("table-document")}>
                                        {stu.age}
                                    </td>
                                    <td className={cx("table-document")}>
                                        {stu.gender}
                                    </td>
                                    <td className={cx("table-document")}>
                                        {stu.ethnic}
                                    </td>
                                    <td className={cx("table-document")}>
                                        {stu.birthDay}
                                    </td>
                                    <td className={cx("table-document")}>
                                        {stu.email}
                                    </td>
                                    <td className={cx("table-document")}>
                                        {stu.address}
                                    </td>
                                    <td className={cx("table-document")}>
                                        {stu.phone}
                                    </td>
                                    <td className={cx("table-document")}>
                                        {stu.fatherName}
                                    </td>
                                    <td className={cx("table-document")}>
                                        {stu.fatherPhone}
                                    </td>
                                    <td className={cx("table-document")}>
                                        {stu.fatherCareer}
                                    </td>
                                    <td className={cx("table-document")}>
                                        {stu.motherName}
                                    </td>
                                    <td className={cx("table-document")}>
                                        {stu.motherPhone}
                                    </td>
                                    <td className={cx("table-document")}>
                                        {stu.motherCareer}
                                    </td>
                                    <td className={cx("table-document")}>
                                        {stu.schoolYear}
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

export default AddListStudent;
