import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { verifyUser } from "../services/auth";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    setLoading(true);
    try {
      const res = await verifyUser();
      console.log(res.data.name);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="h-screen flex justify-center items-center bg-primary-100">
        <Loader className="border-secondary-200" />
      </div>
    );

  return (
    <main className="bg-primary-100 h-screen text-secondary-100">Home</main>
  );
}
