import NavBar from "../components/NavBar/NavBar";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { data: session, status } = useSession();
  const router = useRouter();

  console.log("logging session", session);
  console.log("logging status", status);

  const isInvalid = password === "" || email === "";

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("handleSubmit fired");

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    console.log("result at login page", result);
    // setEmail("");
    // setPassword("");

    if (result.ok) {
      router.push("/");
    }

    if (status === "unauthenticated") {
      setError("Wrong Email or Password");
    }
  };

  return (
    <>
      <NavBar />
      <main className="flex flex-col items-center justify-center h-screen m-auto">
        <div className="flex flex-col items-center mb-5 space-y-5">
          <h1 className="text-4xl font-bold">Log in to continue</h1>
          <div className="flex flex-col space-y-1">
            <p className="text-center">Welcome Back!</p>
            <p>
              Don't have an account yet?{" "}
              <span className="text-red-600 cursor-pointer hover:underline">
                <Link href="/signup">
                  <a>Sign up</a>
                </Link>
              </span>
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col p-6 bg-gray-100 rounded-lg space-y-7 w-80"
        >
          <div className="flex flex-col space-y-3">
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full px-5 py-2 mx-auto bg-gray-200"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 bg-gray-200"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            {error && (
              <p className="text-sm text-center text-red-600">{error}</p>
            )}
          </div>
          <div className="flex flex-col space-y-3">
            <button
              disabled={isInvalid}
              className={`w-full px-4 py-2.5 text-lg text-white bg-red-600 rounded-full font-semibold ${
                !isInvalid && "hover:bg-red-800"
              } transition duration-300 ease-out active:scale-90 transform ${
                isInvalid && "opacity-50 cursor-not-allowed"
              }`}
            >
              submit
            </button>
            <p className="text-center">
              New to DishTable?{" "}
              <span className="text-red-600 cursor-pointer hover:underline">
                <Link href="/signup">
                  <a>Create an account</a>
                </Link>
              </span>
            </p>
          </div>
        </form>
      </main>
    </>
  );
};

export default Login;
