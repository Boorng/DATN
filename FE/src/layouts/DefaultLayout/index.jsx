import Footer from "../../components/Footer";
import HeaderLogin from "../../components/HeaderLogin/HeaderLogin";
import HeaderNavbar from "../../components/HeaderNavbar/HeaderNavbar";

function DefaultLayout({ children }) {
    return (
        <div>
            <HeaderLogin />
            <HeaderNavbar />
            {children}
            <Footer />
        </div>
    );
}

export default DefaultLayout;
