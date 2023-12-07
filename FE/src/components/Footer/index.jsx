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
        <h5>TRƯỜNG TRUNG HỌC CƠ SỞ TAM ĐẢO</h5>
        <span className={cx("footer-content-item")}>
          Địa chỉ: Xã Tam Quan - Huyện Tam Đảo - Tỉnh Vĩnh Phúc
        </span>
        <span className={cx("footer-content-item")}>
          Điện thoại: (0211)3.583186
        </span>
        <span className={cx("footer-content-item")}>
          Email: c2tamdao@vinhphuc.edu.vn
        </span>
      </div>
    </div>
  );
}

export default Footer;
