import * as classNames from "classnames/bind";
import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";

import styles from "./MessageChild.module.scss";

const cx = classNames.bind(styles);

function MessageChild({ message }) {
    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);

    const ref = useRef();

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);

    return (
        <div
            ref={ref}
            className={cx(
                "message",
                message.senderId === currentUser.uid && "owner"
            )}
        >
            <div className={cx("messageContent")}>
                <p>{message.text}</p>
                {message.img && <img src={message.img} alt="" />}
            </div>
        </div>
    );
}

export default MessageChild;
