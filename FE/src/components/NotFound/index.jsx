import * as classNames from "classnames/bind";
import Image from "../../assets/Image";

import styles from "./NotFound.module.scss";

const cx = classNames.bind(styles);

function NotFound() {
    return (
        <div className={cx("not-found")}>
            <img
                src={Image.not_found}
                className={cx("not-found-image")}
                alt="not-found"
            />
        </div>
    );
}

export default NotFound;
