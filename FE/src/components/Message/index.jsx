import * as classNames from "classnames/bind";
import { doc, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../context/ChatContext";
import { db } from "../../firebase";
import MessageChild from "../MessageChild";

import styles from "./MessageChat.module.scss";

const cx = classNames.bind(styles);

function MessageChat() {
    const [messages, setMessages] = useState([]);
    const { data } = useContext(ChatContext);

    useEffect(() => {
        const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messages);
        });

        return () => {
            unSub();
        };
    }, [data.chatId]);

    console.log(messages);

    return (
        <div className={cx("messages")}>
            {messages.map((m) => (
                <MessageChild message={m} key={m.id} />
            ))}
        </div>
    );
}

export default MessageChat;
