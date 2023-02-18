import * as classNames from "classnames/bind";
import {
    collection,
    query,
    where,
    getDocs,
    setDoc,
    doc,
    updateDoc,
    serverTimestamp,
    getDoc,
} from "firebase/firestore";
import { useContext, useState } from "react";

import { db } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";
import styles from "./SearchChat.module.scss";

const cx = classNames.bind(styles);

function SearchChat() {
    const [username, setUsername] = useState("");
    const [user, setUser] = useState([]);
    const [err, setErr] = useState(false);

    const { currentUser } = useContext(AuthContext);

    const handleSearch = async () => {
        const q = query(
            collection(db, "users"),
            where("displayName", "<=", username + "\uf8ff"),
            where("displayName", ">=", username)
        );

        try {
            const querySnapshot = await getDocs(q);
            let listUser = [];
            querySnapshot.forEach((doc) => {
                listUser = [...listUser, doc.data()];
            });
            console.log(listUser);
            setUser(listUser);
        } catch (err) {
            setErr(true);
            console.log(err);
        }
    };

    const handleKey = (e) => {
        if (username) {
            e.code === "Enter" && handleSearch();
        } else {
            setUser();
        }
    };

    const handleSelect = async (item) => {
        //check whether the group(chats in firestore) exists, if not create
        const combinedId =
            currentUser.uid > item.uid
                ? currentUser.uid + item.uid
                : item.uid + currentUser.uid;
        try {
            const res = await getDoc(doc(db, "chats", combinedId));

            if (!res.exists()) {
                //create a chat in chats collection
                await setDoc(doc(db, "chats", combinedId), { messages: [] });

                //create user chats
                await updateDoc(doc(db, "userChats", currentUser.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: item.uid,
                        displayName: item.displayName,
                    },
                    [combinedId + ".date"]: serverTimestamp(),
                });

                await updateDoc(doc(db, "userChats", item.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                    },
                    [combinedId + ".date"]: serverTimestamp(),
                });
            }
        } catch (err) {
            console.log(err);
        }

        setUser(null);
        setUsername("");
    };

    console.log(user);

    return (
        <div className={cx("search")}>
            <div className={cx("searchForm")}>
                <input
                    type="text"
                    placeholder="Tìm kiếm"
                    onKeyDown={handleKey}
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                />
            </div>
            {err && <span>User not found!</span>}
            {user &&
                user.map((item) => {
                    return (
                        <div
                            className={cx("userChat")}
                            onClick={() => handleSelect(item)}
                        >
                            <div className={cx("userChatInfo")}>
                                <span>{item.displayName}</span>
                            </div>
                        </div>
                    );
                })}
        </div>
    );
}

export default SearchChat;
