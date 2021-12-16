import { useRouter } from "next/router";
import { useSession, getSession } from "next-auth/react";
import NavBar from "../../../components/NavBar/NavBar";
import Sidebar from "../../../components/UserDashboard/Sidebar";
import { CameraIcon, PencilIcon } from "@heroicons/react/outline";
import Footer from "../../../components/Footer";
import { useRef, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { signOut } from "next-auth/react";

const UserDetailPage = () => {
  const router = useRouter();
  const { data: session } = useSession();

  console.log("current user logged in", session);
  const { id, email, first_name, last_name, profile_picture } = session?.user;
  const [newProfilePic, setNewProfilePic] = useState(profile_picture);
  const [firstName, setFirstName] = useState(first_name);
  const [lastName, setLastName] = useState(last_name);
  const [newPassword, setNewPassword] = useState("");
  // const [email, setNewEmail] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [profilePicUrl, setProfilePicUrl] = useState(undefined);
  const isInvalid = firstName.trim() === "" || lastName.trim() === "";

  // const filePickerRef = useRef();
  // console.log(router);

  const addImageAsSelectedFile = (e) => {
    console.log("handleFileUpload fired");
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      console.log(readerEvent.target.result);
      setSelectedFile(readerEvent.target.result);
    };
  };

  const uploadProfilePic = async () => {
    if (isInvalid) {
      return;
    }
    console.log("uploadProfilePic fired");
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", "dishtable");
    formData.append("cloud_name", "darrylwongqz");
    try {
      const response = await axios({
        method: "POST",
        url: "https://api.cloudinary.com/v1_1/darrylwongqz/image/upload",
        data: formData,
      });
      console.log(response.data);
      setProfilePicUrl(response.data.secure_url);
      uploadFields();
    } catch (err) {
      console.log(err.response.data.err);
    }
  };

  const uploadFields = async () => {
    console.log("uploadFields Fired");
    console.log(firstName, lastName, profilePicUrl, newPassword);
    const response = await axios.patch(
      "https://api-dishtable-supa.herokuapp.com/api/auth",
      {
        first_name: firstName,
        last_name: lastName,
        profile_picture: profilePicUrl,
        password: newPassword,
      },
      {
        headers: {
          Authorization: "Bearer " + session.token,
        },
      }
    );

    if (response.status === 200 || response.statusText === "OK") {
      signOut();
    }
  };

  const handleEditSave = (event) => {
    event.preventDefault();
    console.log("handleEditSave Fired");
    if (selectedFile) {
      uploadProfilePic();
    } else {
      uploadFields();
    }
  };

  return (
    <>
      <NavBar />
      <main className="grid h-screen grid-cols-4 ">
        <Sidebar
          profilePic={profile_picture}
          firstName={first_name}
          lastName={last_name}
          id={id}
        />

        <section className="flex flex-col items-center justify-center col-span-3 mt-72 h-1/4 ">
          <form
            onSubmit={handleEditSave}
            className="flex flex-col items-center w-1/2 p-5 mb-5 border rounded-lg shadow-md bg-red-50"
          >
            <div className="w-full">
              <div className="relative flex flex-col items-center justify-center">
                <div className="relative mx-auto overflow-hidden border border-gray-300 rounded-full md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-36 xl:h-36 2xl:w-56 2xl:h-56">
                  <Image
                    src={selectedFile ? selectedFile : newProfilePic}
                    layout="fill"
                    objectFit="cover"
                  />
                  {/* <div className="">
                  <div
                    onClick={() => filePickerRef.current.click()}
                    className="absolute "
                  >
                    <div className="flex items-center justify-center text-red-600 transition duration-150 ease-out bg-red-100 rounded-full opacity-90 md:w-6 md:h-6 lg:w-8 lg:h-8 xl:w-10 xl:h-10 2xl:w-12 2xl:h-12 hover:text-white hover:bg-red-600">
                      <CameraIcon className="md:w-4 md:h-4 lg:w-5 lg:h-5 xl:w-5 2xl:w-6 2xl:h-6 " />
                    </div>
                  </div>
                </div> */}
                </div>
              </div>
              <div className="w-full p-5 rounded-lg">
                <input
                  aria-label="Enter your first name"
                  type="text"
                  placeholder="First Name"
                  className="w-full h-2 px-4 py-5 mb-2 mr-3 text-sm text-gray-500 border border-gray-300 rounded"
                  onChange={({ target }) => setFirstName(target.value)}
                  value={firstName}
                />
                <input
                  aria-label="Enter your last name"
                  type="text"
                  placeholder="Last Name"
                  className="w-full h-2 px-4 py-5 mb-2 mr-3 text-sm text-gray-500 border border-gray-300 rounded"
                  onChange={({ target }) => setLastName(target.value)}
                  value={lastName}
                />
                <input
                  aria-label="Enter your new password"
                  type="password"
                  placeholder="New Password"
                  className="w-full h-2 px-4 py-5 mb-2 mr-3 text-sm text-gray-500 border border-gray-300 rounded"
                  onChange={({ target }) => setNewPassword(target.value)}
                  value={newPassword}
                />
                <div className="flex items-center justify-between w-full space-x-2 overflow-hidden bg-white rounded-md">
                  <label
                    for="profilepic"
                    className="h-full px-4 py-2 text-white bg-black min-w-min"
                  >
                    Profile Picture
                  </label>
                  <input
                    // ref={filePickerRef}
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={addImageAsSelectedFile}
                    id="profilepic"
                    className="flex-grow p-2 rounded-md "
                  />
                </div>
              </div>
            </div>
            <button className="px-3 py-2 text-white bg-black rounded-lg">
              Save Profile
            </button>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default UserDetailPage;

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  console.log("serversideprops edit profile", session);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};
