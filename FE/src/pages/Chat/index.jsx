import * as classNames from "classnames/bind";

import Chat from "../../components/Chat";
import SidebarChat from "../../components/SidebarChat";
import styles from "./ChatApp.module.scss";

const cx = classNames.bind(styles);

function ChatApp() {
    return (
        <div className={cx("home")}>
            <div className={cx("container")}>
                <SidebarChat />
                <Chat />
            </div>
        </div>
    );
}

export default ChatApp;
