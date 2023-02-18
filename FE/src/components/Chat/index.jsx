import * as classNames from "classnames/bind";
import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";

import InputChat from "../Input";
import MessageChat from "../Message";
import styles from "./Chat.module.scss";

const cx = classNames.bind(styles);

function Chat() {
    const { data } = useContext(ChatContext);

    return (
        <div className={cx("chat")}>
            <div className={cx("chatInfo")}>
                <span>{data.user?.displayName}</span>
            </div>
            <MessageChat />
            <InputChat />
        </div>
    );
}

export default Chat;
