import * as classNames from "classnames/bind";

import styles from "./NavbarChat.module.scss";

const cx = classNames.bind(styles);

function NavbarChat() {
    return (
        <div className={cx("navbar")}>
            <span className={cx("logo")}>Ứng dụng chat</span>
        </div>
    );
}

export default NavbarChat;
