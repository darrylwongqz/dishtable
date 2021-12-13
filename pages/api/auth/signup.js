import axios from "axios";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return;
  }
  console.log("server side received request at /api/auth/signup");

  try {
    const data = req.body;

    const { email, first_name, last_name, password } = data;
    // console.log(email, first_name, last_name, password);
    const response = await axios.post(
      "https://api-dishtable-supa.herokuapp.com/api/auth/register",
      {
        email,
        first_name,
        last_name,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // console.log(response.data.message);
    return res.status(200).json({ message: response.data.message });
  } catch (error) {
    console.log("Something went wrong!");
    // console.log(error);
    return res.json(error.response.data);
  }
};

export default handler;

//
