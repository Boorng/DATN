import * as classNames from "classnames/bind";

import ChatChild from "../ChatChild";
import NavbarChat from "../NavbarChat";
import SearchChat from "../SearchChat";
import styles from "./SidebarChat.module.scss";

const cx = classNames.bind(styles);

function SidebarChat() {
    return (
        <div className={cx("sidebar")}>
            <NavbarChat />
            <SearchChat />
            <ChatChild />
        </div>
    );
}

export default SidebarChat;
