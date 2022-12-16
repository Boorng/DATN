import Footer from "../../components/Footer";
import HeaderDefault from "../../components/HeaderDefault/HeaderDefault";

function HeadFootLayout({ children }) {
    return (
        <div>
            {/* <HeaderDefault /> */}
            {children}
            {/* <Footer /> */}
        </div>
    );
}

export default HeadFootLayout;
