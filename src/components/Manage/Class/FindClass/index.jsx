import * as classNames from "classnames/bind";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { GoSearch } from "react-icons/go";
import { useEffect, useState, memo } from "react";

import styles from "./FindClass.module.scss";
import useDebounce from "../../../../hook/useDebounce";

const cx = classNames.bind(styles);

function FindClass({ handleSearch }) {
    const [search, setSearch] = useState("");

    const debounce = useDebounce(search, 700);

    useEffect(() => {
        handleSearch(debounce);
    }, [debounce, handleSearch]);

    const handleOnChangeSearch = (e) => {
        if (e.target.value.trim()) {
            setSearch(e.target.value);
        } else {
            setSearch("");
        }
    };
    console.log("Render Search");
    return (
        <div className={cx("find-class")}>
            <InputGroup className="mb-3">
                <InputGroup.Text>
                    <GoSearch className={cx("find-icon")} />
                </InputGroup.Text>
                <Form.Control
                    placeholder="Nhập tên lớp cần tìm kiếm"
                    value={search}
                    onChange={handleOnChangeSearch}
                    className={cx("input-search")}
                />
            </InputGroup>
        </div>
    );
}

export default memo(FindClass);
