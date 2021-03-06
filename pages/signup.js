import NavBar from "../components/NavBar/NavBar";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import MobileMenuModal from "../components/NavBar/MobileMenuModal";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const isInvalid =
    password === "" || email === "" || password !== confirmPassword;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    // console.log("handleSubmit fired");
    const response = await axios.post(
      "/api/auth/signup",
      {
        email: email,
        first_name: firstName,
        last_name: lastName,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // console.log("signup page response in handleSubmit", response);

    if (response.data.message !== "User successfully created!") {
      setError(response.data.error);
      console.log(response.data.message);
    } else {
      console.log(response.data.message);
    }

    if (!error) {
      setEmail("");
      setFirstName("");
      setLastName("");
      setPassword("");
      setConfirmPassword("");
      router.push("/login");
    }
  };

  return (
    <>
      <NavBar />
      <main className="flex flex-col items-center justify-center h-screen m-auto">
        <div className="flex flex-col items-center mb-10 space-y-5">
          <h1 className="text-4xl font-bold">Sign up to continue</h1>
          <p className="text-center">
            Create a free account to book and manage your culinary experiences.
            <br />
            Already have an account?{" "}
            <span className="text-red-600 cursor-pointer hover:underline">
              <Link href="/login">
                <a>Log in</a>
              </Link>
            </span>
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col p-6 bg-gray-100 rounded-lg space-y-7 w-80"
        >
          <div className="flex flex-col space-y-3">
            {error && (
              <p className="mx-auto text-sm text-center text-red-600">
                {error}
              </p>
            )}
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full px-5 py-2 mx-auto bg-gray-200"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <input
              type="text"
              placeholder="First Name"
              className="w-full px-4 py-2 bg-gray-200"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-full px-4 py-2 bg-gray-200"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 bg-gray-200"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full px-4 py-2 bg-gray-200"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
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
              Already have an account?{" "}
              <span className="text-red-600 cursor-pointer hover:underline">
                <Link href="/login">
                  <a>Log in</a>
                </Link>
              </span>
            </p>
          </div>
        </form>
      </main>
      <MobileMenuModal />
    </>
  );
};

export default SignUp;
