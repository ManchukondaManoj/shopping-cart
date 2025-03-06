import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/authActions";

export default function withAdminAccess(Component) {
  return function AdminComponent(props) {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const handleLogout = () => {
      console.log("logging out user");
      dispatch(logout());
    };

    if (!user) {
      return (
        <p className="mt-4 text-center text-sm text-gray-600">
          You need to login to access this page?{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      );
    }

    if (!user.isAdmin) {
      return (
        <p className="mt-4 text-center text-sm text-gray-600">
          You need to have admin access to view this page?{" "}
          <Link
            href="/login"
            onClick={handleLogout}
            className="text-blue-500 hover:underline"
          >
            Logout & Login with admin details
          </Link>
        </p>
      );
    }

    return <Component {...props} />;
  };
}
