import * as classNames from "classnames/bind";
import Image from "../../assets/Image";

import styles from "./Footer.module.scss";

const cx = classNames.bind(styles);

function Footer() {
    return (
        <div className={cx("footer")}>
            <img
                src={Image.icon_title_header}
                alt="footer icon"
                className={cx("footer-image")}
            />
            <div className={cx("footer-content")}>
                <h5>TRƯỜNG TRUNG HỌC CƠ SỞ CHU VĂN AN</h5>
                <span className={cx("footer-content-item")}>
                    Địa chỉ: Số 13, đường Âu Cơ, Khu 1, Phường Hiệp Thành, Tp
                    Thủ Dầu Một, Bình Dương
                </span>
                <span className={cx("footer-content-item")}>
                    Điện thoại: (0274)3.870628
                </span>
                <span className={cx("footer-content-item")}>
                    Email: thcs-chuvanan@tptdm.edu.vn
                </span>
            </div>
        </div>
    );
}

export default Footer;
