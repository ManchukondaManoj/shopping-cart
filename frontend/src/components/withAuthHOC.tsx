// components/withAuth.tsx
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function withAuth(Component) {
  return function AuthenticatedComponent(props) {
    const { user } = useSelector((state) => state.auth);

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

    return <Component {...props} />;
  };
}
