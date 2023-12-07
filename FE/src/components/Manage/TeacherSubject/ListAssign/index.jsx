import * as classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import { utils, writeFile } from "xlsx";
import {
  deleteAssignAPI,
  updateAssignTeacherAPI,
} from "../../../../services/assignService";
import { getClassAPI } from "../../../../services/classService";
import { getAcademicYearAPI } from "../../../../services/semesterService";
import DetailTeacher from "../../Teacher/DetailTeacher";
import FindAssign from "../FindAssign";

import styles from "./ListAssign.module.scss";

const cx = classNames.bind(styles);

function ListAssign({
  listTeacher,
  getAssign,
  subjectName,
  gradeName,
  semesterId,
  semesterName,
}) {
  const [listAssignExport, setListAssignExport] = useState([]);
  const [isDetail, setIsDetail] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [idDelete, setIdDelete] = useState("");
  const [assignShow, setAssignShow] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [idEdit, setIdEdit] = useState();
  const [listClass, setListClass] = useState([]);
  const [classSelect, SetClassSelect] = useState("");
  const [isSelect, setIsSelect] = useState(false);
  const [academicYear, setAcademicYear] = useState("");

  //#region Paging
  const [itemOffset, setItemOffset] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const itemPerPage = 8;
  //#endregion

  const getClassOption = async () => {
    const dataAPI = await getClassAPI(gradeName, academicYear);
    setListClass(dataAPI);
  };

  const getAcademicYear = async () => {
    if (semesterId) {
      const academicYearAPI = await getAcademicYearAPI(semesterId);
      setAcademicYear(academicYearAPI);
    }
  };

  const handleUpdateAssign = async () => {
    if (!isSelect) {
      // toast.error("Chưa chọn lớp chuyển");
    } else {
      const response = await updateAssignTeacherAPI(idEdit, classSelect);
      if (response.message === "Success") {
        toast.success("Chuyển lớp dạy thành công");
        await getAssign();
      } else {
        toast.error("Chuyển lớp dạy thất bại");
      }

      setIdEdit("");
      SetClassSelect("");
      setIsEdit(false);
    }
  };

  useEffect(() => {
    const lstExport = listTeacher.map((item) => {
      return {
        id: item.teacherId,
        fullName: item.fullName,
        age: item.age,
        gender: item.gender,
        ethnic: item.ethnic,
        dob: item.birthDay,
        email: item.email,
        address: item.address,
        phone: item.phone,
        status: item.status === 1 ? "Đang làm" : "Nghỉ việc",
        level:
          item.level === 1
            ? "Cử nhân"
            : item.level === 2
            ? "Thạc sĩ"
            : item.level === 3
            ? "Tiến sĩ"
            : item.level === 4
            ? "Phó giáo sư"
            : "Giáo sư",
        classId: item.classId,
        className: item.className,
      };
    });

    const endOffset = itemOffset + itemPerPage;

    if (listTeacher.length > 8) {
      setCurrentItems(listTeacher.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(listTeacher.length / itemPerPage));
    } else {
      setItemOffset(0);
      setPageCount(1);
      setCurrentItems(listTeacher.slice(0, endOffset));
    }

    setListAssignExport(lstExport);
    getAcademicYear();
  }, [listTeacher]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemPerPage) % listTeacher.length;
    const endOffset = newOffset + itemPerPage;
    setItemOffset(newOffset);
    setCurrentItems(endOffset.slice(newOffset, endOffset));
  };

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
        "Số điên thoại",
        "Tình trạng làm việc",
        "Bằng cấp",
        "ID Lớp",
        "Lớp dạy",
      ],
    ];
    const wb = utils.book_new();
    const ws = utils.json_to_sheet([]);
    utils.sheet_add_aoa(ws, headings);
    utils.sheet_add_json(ws, listAssignExport, {
      origin: "A2",
      skipHeader: true,
    });
    utils.book_append_sheet(wb, ws, "Report");
    writeFile(
      wb,
      `Danh sách giáo viên dạy môn ${subjectName} khối ${gradeName} học kỳ ${semesterName}.xlsx`
    );
  };

  const handleOnChange = (e) => {
    SetClassSelect(e.target.value);
    setIsSelect(true);
  };

  const handleClickDetailInfo = (tc) => {
    if (!isDetail) setAssignShow(tc);
    else setAssignShow({});
    setIsDetail(!isDetail);
  };

  const handleConfirmUpdate = async (tea) => {
    await getClassOption();
    setIdEdit(tea.id);
    SetClassSelect(tea.classId);
    setIsEdit(true);
  };

  const handleConfirmDelete = (id) => {
    setIdDelete(id);
    setIsDelete(true);
  };

  const handleDeleteAll = async () => {
    const res = await deleteAssignAPI(idDelete);
    if (res.message === "Success") {
      await getAssign();
      toast.success("Xóa giáo viên thành công");
    } else {
      toast.error("Xóa giáo viên thất bại");
    }
    setIsDelete(false);
  };

  const handleSearch = async (input) => {
    await getAssign(input);
  };

  return (
    <div className={cx("list-assign")}>
      <FindAssign handleSearch={handleSearch} />
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
            <th className={cx("table-head")}>ID</th>
            <th className={cx("table-head")}>Tên giáo viên</th>

            <th className={cx("table-head")}>Email</th>
            <th className={cx("table-head")}>Số điện thoại</th>

            <th className={cx("table-head")}>ID lớp</th>
            <th className={cx("table-head")}>Lớp dạy</th>
            <th className={cx("table-head")}>Học kì</th>

            <th className={cx("table-head")}></th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((tea) => {
            return (
              <tr key={tea.id}>
                <td className={cx("table-document")}>{tea.teacherId}</td>
                <td className={cx("table-document")}>{tea.fullName}</td>

                <td className={cx("table-document")}>{tea.email}</td>
                <td className={cx("table-document")}>{tea.phone}</td>

                <td className={cx("table-document")}>{tea.classId}</td>

                <td className={cx("table-document")}>{tea.className}</td>

                <td className={cx("table-document")}>{tea.semesterName}</td>

                <td className={cx("list-button")}>
                  <Button
                    variant="info"
                    onClick={() => handleClickDetailInfo(tea)}
                    className={cx("button")}
                  >
                    Xem chi tiết
                  </Button>

                  <Button
                    variant="success"
                    className={cx("button")}
                    onClick={() => handleConfirmUpdate(tea)}
                  >
                    Chuyển lớp dạy
                  </Button>

                  <Button
                    variant="danger"
                    className={cx("button")}
                    onClick={() => handleConfirmDelete(tea.id)}
                  >
                    Xóa
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      {listTeacher.length > 8 && (
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName={cx("pagination", "pagination-wrap")}
          activeClassName="active"
        />
      )}

      {isDetail && (
        <DetailTeacher
          teacherShow={assignShow}
          show={isDetail}
          showDetail={handleClickDetailInfo}
        />
      )}

      {isEdit && (
        <Modal
          show={isEdit}
          onHide={() => setIsEdit(false)}
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
                return <option value={item.id}>{item.name}</option>;
              })}
            </Form.Select>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              className={cx("button-confirm")}
              onClick={handleUpdateAssign}
            >
              Xác nhận
            </Button>
            <Button
              variant="secondary"
              className={cx("button-back")}
              onClick={() => setIsEdit(false)}
            >
              Quay lại
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {isDelete && (
        <Modal
          show={isDelete}
          onHide={() => setIsDelete(false)}
          dialogClassName={cx("modal")}
          centered
        >
          <Modal.Header>
            <Modal.Title className={cx("modal-title")}>Cảnh báo</Modal.Title>
          </Modal.Header>
          <Modal.Body className={cx("modal-content")}>
            Bạn có chắc chắn muốn xóa giáo viên dạy môn này không?
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              className={cx("button-confirm")}
              onClick={handleDeleteAll}
            >
              Xác nhận
            </Button>
            <Button
              variant="secondary"
              className={cx("button-back")}
              onClick={() => setIsDelete(false)}
            >
              Quay lại
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

export default ListAssign;
