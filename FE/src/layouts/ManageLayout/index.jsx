import * as classNames from "classnames/bind";

import Footer from "../../components/Footer";
import NavMenu from "../../components/NavMenu";
import styles from "./ManageLayout.module.scss";

const cx = classNames.bind(styles);

function ManageLayout({ children }) {
    return (
        <div className={cx("manage-layout")}>
            <NavMenu />
            <div className={cx("manage")}>
                {children}
                <Footer />
            </div>
        </div>
    );
}

export default ManageLayout;
