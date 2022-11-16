import * as classNames from "classnames/bind";

import styles from "./Information.module.scss";

const cx = classNames.bind(styles);

function Information() {
    const infor = {
        id: 1,
        name: "Nguyễn Văn A",
        gender: "Nam",
        start: 2018,
        class: "6A5",
        course: "K63",
        status: "Đang học",
        email: "nva@gmail.com",
        img: "https://vnn-imgs-a1.vgcloud.vn/icdn.dantri.com.vn/2021/05/26/ngo-ngang-voi-ve-dep-cua-hot-girl-anh-the-chua-tron-18-docx-1622043349706.jpeg",
    };

    const person = Object.entries(infor);
    const showPersom = person.filter(
        (per) => per[0] !== "id" && per[0] !== "img"
    );

    return (
        <div className={cx("information")}>
            <h3 className={cx("information-title")}>Thông tin cá nhân</h3>
            <div className={cx("information-content")}>
                <img
                    src={infor.img}
                    alt="Thông tin cá nhân"
                    className={cx("information-content-image")}
                />
                <div className={cx("information-content-detail")}>
                    {showPersom.map((item, index) => (
                        <div key={index}>{`${item[0]}: ${item[1]}`}</div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Information;
