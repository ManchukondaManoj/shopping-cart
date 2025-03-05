// components/withAuth.tsx
import { useRouter } from "next/navigation";
import { useEffect } from "react";
// import { useSession } from "next-auth/react"; // Or your custom auth hook
import { useSelector } from "react-redux";

export default function withAuth(Component) {
  return function AuthenticatedComponent(props) {
    const { user } = useSelector((state) => state.auth);
    const router = useRouter();

    useEffect(() => {
      //   if (status === "loading") return; // Optionally, show a loading indicator
      if (!user) {
        router.push("/login");
      }
    }, [user, router]);

    if (!user) {
      return <p>Loading...</p>;
    }

    return <Component {...props} />;
  };
}
