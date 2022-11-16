import * as classNames from "classnames/bind";

import Footer from "../../components/Footer";
import HeaderDefault from "../../components/HeaderDefault/HeaderDefault";
import NavMenu from "../../components/NavMenu";
import styles from "./ManageLayout.module.scss";

const cx = classNames.bind(styles);

function ManageLayout({ children }) {
    return (
        <div>
            <HeaderDefault />
            <div className={cx("manage")}>
                <NavMenu />
                {children}
            </div>
            <Footer />
        </div>
    );
}

export default ManageLayout;
