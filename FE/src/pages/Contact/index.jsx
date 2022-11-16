import * as classNames from "classnames/bind";
import { ImLocation } from "react-icons/im";
import { HiPhone } from "react-icons/hi";
import { MdEmail } from "react-icons/md";
import { BsFillFileEarmarkTextFill } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import styles from "./Contact.module.scss";

const cx = classNames.bind(styles);

function Contact() {
    console.log("Contact");
    return (
        <div className={cx("header-nav-contact")}>
            <div className={cx("header-nav-left")}>
                <h3 className={cx("header-nav-left-title")}>
                    Trường THCS Chu Văn An
                </h3>
                <iframe
                    title="map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.7228262964645!2d106.6612142144421!3d10.984281458327127!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d1bb7c7ce997%3A0x9290aa06fc0ca978!2zMTMgw4J1IEPGoSwgSGnhu4dwIFRow6BuaCwgVGjhu6cgROG6p3UgTeG7mXQsIELDrG5oIETGsMahbmcsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1667549693022!5m2!1svi!2s"
                    width="600"
                    height="450"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className={cx("header-nav-map")}
                ></iframe>
                <div className={cx("header-nav-contact-list")}>
                    <div className={cx("header-nav-contact-item")}>
                        <ImLocation className={cx("header-nav-contact-icon")} />
                        <span className={cx("header-nav-contact-content")}>
                            Địa chỉ: Số 13, đường Âu Cơ, Khu 1, Phường Hiệp
                            Thành, Thành phố Thủ Dầu Một, Tỉnh Bình Dương
                        </span>
                    </div>
                    <div className={cx("header-nav-contact-item")}>
                        <HiPhone className={cx("header-nav-contact-icon")} />
                        <span className={cx("header-nav-contact-content")}>
                            Điện thoại: (0274).3870628
                        </span>
                    </div>
                    <div className={cx("header-nav-contact-item")}>
                        <MdEmail className={cx("header-nav-contact-icon")} />
                        <span className={cx("header-nav-contact-content")}>
                            Email: thcs-chuvanan@tptdm.edu.vn
                        </span>
                    </div>
                </div>
            </div>
            <div className={cx("header-nav-right")}>
                <div className={cx("header-nav-response-title")}>
                    GỬI PHẢN HỒI
                </div>
                <Form className={cx("header-nav-response-list")}>
                    <InputGroup className={cx("header-nav-response-item")}>
                        <InputGroup.Text>
                            <BsFillFileEarmarkTextFill
                                className={cx("header-nav-response-icon")}
                            />
                        </InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder="Tiêu đề"
                            required
                        />
                    </InputGroup>

                    <InputGroup className={cx("header-nav-response-item")}>
                        <InputGroup.Text>
                            <FaUserAlt
                                className={cx("header-nav-response-icon")}
                            />
                        </InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder="Họ và tên"
                            required
                        />
                    </InputGroup>
                    <InputGroup className={cx("header-nav-response-item")}>
                        <InputGroup.Text>
                            <MdEmail
                                className={cx("header-nav-response-icon")}
                            />
                        </InputGroup.Text>
                        <Form.Control
                            type="email"
                            placeholder="Email"
                            required
                        />
                    </InputGroup>
                    <InputGroup className={cx("header-nav-response-item")}>
                        <InputGroup.Text>
                            <HiPhone
                                className={cx("header-nav-response-icon")}
                            />
                        </InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder="Điện thoại"
                            required
                        />
                    </InputGroup>
                    <InputGroup className={cx("header-nav-response-item")}>
                        <InputGroup.Text>
                            <IoHome
                                className={cx("header-nav-response-icon")}
                            />
                        </InputGroup.Text>
                        <Form.Control type="text" placeholder="Địa chỉ" />
                    </InputGroup>
                    <InputGroup className={cx("header-nav-response-item")}>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Nội dung"
                            required
                        />
                    </InputGroup>

                    <Button variant="primary" type="submit">
                        Xác nhận
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default Contact;
