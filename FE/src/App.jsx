import * as classNames from "classnames/bind";
import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "./App.module.scss";
import { AuthContext } from "./context/AuthContext";
import {
    manageRoutes,
    publicRoutes,
    studentRoutes,
    teacherRoutes,
} from "./routes";

const cx = classNames.bind(styles);

function App() {
    const { currentUser } = useContext(AuthContext);
    console.log(currentUser);

    return (
        <div className={cx("App")}>
            <Routes>
                {publicRoutes.map((route) => {
                    const Page = route.component;
                    const Layout = route.layout;

                    return (
                        <Route
                            key={route.id}
                            path={route.path}
                            element={
                                // <Layout>
                                <Page />
                                // </Layout>
                            }
                        />
                    );
                })}

                {manageRoutes.map((route) => {
                    const Page = route.component;
                    const Layout = route.layout;
                    const ChildLayout = route.childLayout;

                    return (
                        <Route
                            key={route.id}
                            path={route.path}
                            element={
                                <Layout>
                                    {route.childLayout ? (
                                        <ChildLayout>
                                            <Page />
                                        </ChildLayout>
                                    ) : (
                                        <Page />
                                    )}
                                </Layout>
                            }
                        />
                    );
                })}

                {studentRoutes.map((route) => {
                    const Page = route.component;
                    const Layout = route.layout;
                    const ChildLayout = route.childLayout;

                    return (
                        <Route
                            key={route.id}
                            path={route.path}
                            element={
                                <Layout>
                                    {route.childLayout ? (
                                        <ChildLayout>
                                            <Page />
                                        </ChildLayout>
                                    ) : (
                                        <Page />
                                    )}
                                </Layout>
                            }
                        />
                    );
                })}

                {teacherRoutes.map((route) => {
                    const Page = route.component;
                    const Layout = route.layout;
                    const ChildLayout = route.childLayout;

                    return (
                        <Route
                            key={route.id}
                            path={route.path}
                            element={
                                <Layout>
                                    {route.childLayout ? (
                                        <ChildLayout>
                                            <Page />
                                        </ChildLayout>
                                    ) : (
                                        <Page />
                                    )}
                                </Layout>
                            }
                        />
                    );
                })}
            </Routes>

            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
}

export default App;
