import * as classNames from "classnames/bind";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { GoSearch } from "react-icons/go";
import { useState, memo } from "react";
import { Button, Col, Row } from "react-bootstrap";

import styles from "./FindStudent.module.scss";

const cx = classNames.bind(styles);

function FindStudent({ handleSearch }) {
    const [search, setSearch] = useState("");

    const handleOnChangeSearch = (e) => {
        if (e.target.value.trim()) {
            setSearch(e.target.value);
        } else {
            setSearch("");
        }
    };

    const handleOnClickSearch = async () => {
        setSearch("");
        await handleSearch(search);
    };

    return (
        <Row>
            <Col>
                <InputGroup className="mb-3">
                    <InputGroup.Text>
                        <GoSearch className={cx("find-icon")} />
                    </InputGroup.Text>
                    <Form.Control
                        placeholder="Nhập tên/ID học sinh cần tìm kiếm"
                        value={search}
                        onChange={handleOnChangeSearch}
                        className={cx("input-search")}
                    />
                </InputGroup>
            </Col>
            <Col>
                <Button
                    variant="success"
                    className={cx("find-student-button")}
                    onClick={handleOnClickSearch}
                >
                    Tìm kiếm
                </Button>
            </Col>
        </Row>
    );
}

export default memo(FindStudent);
