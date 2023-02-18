import * as classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import {
    getManageTeamTeacherAPI,
    getTeacherNoLeaveAPI,
    updateManageTeamTeacherAPI,
} from "../../../../../services/teacherService";

import styles from "./ManageTeamTeacher.module.scss";

const cx = classNames.bind(styles);

function ManageTeamTeacher({ show, showManage, teamId, getTeacherByTeam }) {
    const [idManage, setIdManage] = useState({
        idLeader: "",
        idViceLeader1: "",
        idViceLeader2: "",
    });
    const [listTeacher, setListTeacher] = useState([]);

    const handleOnChange = (e) => {
        if (e.target.value.trim() !== "") {
            setIdManage({
                ...idManage,
                [e.target.name]: e.target.value,
            });
        } else {
            setIdManage({
                ...idManage,
                [e.target.name]: "",
            });
        }
    };

    const getTeacherManageTeam = async () => {
        const dataAPI = await getManageTeamTeacherAPI(teamId);
        setIdManage({
            idLeader: dataAPI.idLeader,
            idViceLeader1: dataAPI.idViceLeaders[0],
            idViceLeader2: dataAPI.idViceLeaders[1],
        });
    };

    const getTeacher = async () => {
        const dataAPI = await getTeacherNoLeaveAPI("", teamId);
        setListTeacher(dataAPI);
    };

    const handleUpdateManageTeam = async () => {
        const res = await updateManageTeamTeacherAPI({
            idLeader: idManage.idLeader,
            idViceLeaders: [idManage.idViceLeader1, idManage.idViceLeader2],
        });

        if (res.message === "Success") {
            await getTeacherByTeam();

            toast.success("Cập nhật quản lý tổ thành công");
        } else {
            toast.error("Cập nhật quản lý tổ thất bại");
        }
        showManage();
    };

    useEffect(() => {
        getTeacherManageTeam();
        getTeacher();
    }, []);

    return (
        <Modal show={show} onHide={showManage} dialogClassName={cx("modal")}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <h3 className={cx("form-title")}>QUẢN LÝ TỔ</h3>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form className={cx("form")}>
                    <Row className="mb-3">
                        <Col xs={6}>
                            <Form.Group>
                                <Form.Label className={cx("form-label")}>
                                    Tổ trưởng
                                </Form.Label>
                                <Form.Select
                                    className={cx("form-select")}
                                    onChange={handleOnChange}
                                    name="idLeader"
                                    value={idManage.idLeader}
                                >
                                    <option value="">
                                        ---Chọn tổ trưởng --
                                    </option>
                                    {listTeacher.map((item) => {
                                        return (
                                            <option
                                                value={item.id}
                                                key={item.id}
                                            >
                                                {item.id} - {item.fullName}
                                            </option>
                                        );
                                    })}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col>
                            <Form.Group>
                                <Form.Label className={cx("form-label")}>
                                    Tổ phó 1:
                                </Form.Label>
                                <Form.Select
                                    className={cx("form-select")}
                                    onChange={handleOnChange}
                                    name="idViceLeader1"
                                    value={idManage.idViceLeader1}
                                >
                                    <option value="">
                                        ---Chọn tổ phó 1 --
                                    </option>
                                    {listTeacher.map((item) => {
                                        return (
                                            <option
                                                value={item.id}
                                                key={item.id}
                                            >
                                                {item.id} - {item.fullName}
                                            </option>
                                        );
                                    })}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label className={cx("form-label")}>
                                    Tổ phó 2:
                                </Form.Label>
                                <Form.Select
                                    className={cx("form-select")}
                                    onChange={handleOnChange}
                                    name="idViceLeader2"
                                    value={idManage.idViceLeader2}
                                >
                                    <option value="">
                                        ---Chọn tổ phó 2 --
                                    </option>
                                    {listTeacher.map((item) => {
                                        return (
                                            <option
                                                value={item.id}
                                                key={item.id}
                                            >
                                                {item.id} - {item.fullName}
                                            </option>
                                        );
                                    })}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="primary"
                    className={cx("button-update-team")}
                    onClick={handleUpdateManageTeam}
                >
                    Cập nhật
                </Button>
                <Button
                    variant="secondary"
                    className={cx("button-back")}
                    onClick={showManage}
                >
                    Quay lại
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ManageTeamTeacher;
