import * as classNames from "classnames/bind";

import Footer from "../../components/Footer";
import NavStudent from "../../components/NavStudent";
import styles from "./StudentLayout.module.scss";

const cx = classNames.bind(styles);

function StudentLayout({ children }) {
  return (
    <div className={cx("student-layout")}>
      <NavStudent />
      <div className={cx("content")}>
        {children}
        <Footer />
      </div>
    </div>
  );
}

export default StudentLayout;
