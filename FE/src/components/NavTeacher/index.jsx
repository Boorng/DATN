import * as classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { FcCollapse } from "react-icons/fc";
import { NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";

import Image from "../../assets/Image";
import { auth } from "../../firebase";
import styles from "./NavTeacher.module.scss";

const cx = classNames.bind(styles);

function NavTeacher() {
  const [data, setData] = useState([]);
  const [showList, setShowList] = useState([]);

  const handleShowList = (id) => {
    if (showList.includes(id)) {
      setShowList(showList.filter((item) => item !== id));
    } else {
      setShowList([...showList, id]);
    }
  };

  const activeNavbar = {
    color: "#9e100e",
    fontWeight: "600",
  };

  const getClass = async () => {
    const dataAPI = [
      {
        id: 1,
        name: "/teacher/information",
        title: "Thông tin cá nhân",
      },
      {
        id: 2,
        name: "/teacher/team",
        title: "Tổ chuyên môn",
      },
      {
        id: 3,
        name: "/teacher/homeroom-class",
        title: "Lớp chủ nhiệm",
        content: [
          {
            id: 31,
            name: "Kết quả học tập",
            to: "/teacher/homeroom-class/result",
          },
          {
            id: 32,
            name: "Báo cáo tổng kết",
            to: "/teacher/homeroom-class/conduct",
          },
        ],
      },
      {
        id: 4,
        name: "/teacher/subject-class",
        title: "Lớp giảng dạy",
      },
      {
        id: 5,
        name: "/teacher/changePassword",
        title: "Đổi mật khẩu",
      },
      // {
      //     id: 6,
      //     name: "/teacher/chat-app",
      //     title: "Giải đáp thắc mắc",
      // },
    ];

    setData(dataAPI);
  };

  useEffect(() => {
    getClass();
  }, []);

  const handleLogOut = () => {
    signOut(auth);
    localStorage.setItem("authenticated", false);
    localStorage.setItem("token", "");
  };

  return (
    <div className={cx("nav-teacher")}>
      <div className={cx("nav-image")}>
        <img src={Image.icon_title_header} alt="icon" className={cx("image")} />
      </div>
      <div className={cx("nav-content")}>
        {data.map((item) => {
          return (
            <div className={cx("nav-teacher-item")} key={item.id}>
              {item.content ? (
                <div className={cx("nav-teacher-item-accordion")}>
                  <div
                    className={cx("nav-teacher-item-accordion-header")}
                    onClick={() => handleShowList(item.id)}
                  >
                    <span>{item.title}</span>
                    <FcCollapse
                      className={
                        !showList.includes(item.id) &&
                        cx("nav-teacher-item-icon")
                      }
                    />
                  </div>
                  {showList.includes(item.id) && (
                    <div className={cx("nav-teacher-item-accordion-body")}>
                      {item.content.map((itemChild) => {
                        return (
                          <NavLink
                            key={itemChild.id}
                            className={cx("nav-teacher-item-body-child")}
                            to={itemChild.to}
                            style={({ isActive }) =>
                              isActive ? activeNavbar : undefined
                            }
                          >
                            {itemChild.name}
                          </NavLink>
                        );
                      })}
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  to={`${item.name}`}
                  key={item.id}
                  style={({ isActive }) =>
                    isActive ? activeNavbar : undefined
                  }
                  className={cx("nav-teacher-item-link")}
                >
                  {item.title}
                </NavLink>
              )}
            </div>
          );
        })}
      </div>
      <a
        href="/"
        className={cx("nav-teacher-item-href")}
        onClick={handleLogOut}
      >
        Đăng xuất
      </a>
    </div>
  );
}

export default NavTeacher;
