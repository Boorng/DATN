import * as classNames from "classnames/bind";
import { useState } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { GoSearch } from "react-icons/go";

import styles from "./FindAssign.module.scss";

const cx = classNames.bind(styles);

function FindAssign({ handleSearch }) {
    const [search, setSearch] = useState("");

    const handleOnChangeSearch = (e) => {
        if (e.target.value.trim()) {
            setSearch(e.target.value);
        } else {
            setSearch("");
        }
    };

    const handleOnClickSearch = async () => {
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
                        placeholder="Nhập ID/tên giáo viên cần tìm kiếm"
                        value={search}
                        onChange={handleOnChangeSearch}
                        className={cx("input-search")}
                    />
                </InputGroup>
            </Col>
            <Col>
                <Button
                    variant="success"
                    className={cx("find-class-button")}
                    onClick={handleOnClickSearch}
                >
                    Tìm kiếm
                </Button>
            </Col>
        </Row>
    );
}

export default FindAssign;
