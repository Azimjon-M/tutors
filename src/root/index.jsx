import { Navigate, Route, Routes } from "react-router-dom";
import sidebar from "../utils/sidebar";
import Sidebar from "../components/Sidebar";
import Login from "../pages/Login";
import "./style.css";
import ProtectedRoute from "../components/ProtectedRoute";

const Root = () => {
    return (
        <Routes>
            <Route element={<Sidebar />}>
                {sidebar.map((parent) => {
                    const ElementParent = parent.element;
                    if (parent?.children) {
                        return parent.children.map((child) => {
                            const ElementChild = child.element;
                            return (
                                <Route
                                    key={child.id}
                                    path={child.path}
                                    element={
                                        <ProtectedRoute
                                            allowedRoles={child.role}
                                        >
                                            <ElementChild />
                                        </ProtectedRoute>
                                    }
                                />
                            );
                        });
                    } else
                        return (
                            !parent.hidden && (
                                <Route
                                    key={parent.id}
                                    path={parent.path}
                                    element={
                                        <ProtectedRoute
                                            allowedRoles={parent.role}
                                        >
                                            <ElementParent />
                                        </ProtectedRoute>
                                    }
                                />
                            )
                        );
                })}
            </Route>
            <Route path="/" element={<Navigate to={"/login"} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/not-authorized" element={<h1>401 Not Authorized</h1>} />
            <Route path="*" element={<h1>404 not found</h1>} />
        </Routes>
    );
};

export default Root;
