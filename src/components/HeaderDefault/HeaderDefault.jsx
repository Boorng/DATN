import * as classNames from "classnames/bind";

import Image from "../../assets/Image";
import styles from "./HeaderDefault.module.scss";

const cx = classNames.bind(styles);

function HeaderDefault() {
    return (
        <div className={cx("header")}>
            <div className={cx("header-page")}>
                <div className={cx("header-left")}>
                    <a href="/" className="header-left-link">
                        <img
                            src={Image.icon_title_header}
                            alt="Icon title header"
                            className={cx("header-left-icon")}
                        />
                    </a>
                    <div className={cx("header-left-title")}>
                        <h2>TRƯỜNG TRUNG HỌC CƠ SỞ CHU VĂN AN</h2>
                        <h1>CỔNG THÔNG TIN ĐIỆN TỬ</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeaderDefault;
