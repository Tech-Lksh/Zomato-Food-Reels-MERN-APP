// UserLogin.jsx
import AuthLayout from "../components/AuthLayout";
import { FormInput } from "../components/FormInput";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function UserLogin() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.elements.email.value;
    const password = form.elements.password.value;

    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/user/login",
        { email, password }
      );

      console.log("LOGIN SUCCESS:", res.data);
      navigate("/"); // redirect to home

    } catch (err) {
      console.error("LOGIN ERROR:", err);
      alert("Invalid email or password");
    }
  };

  return (
    <AuthLayout title="User Login">
      <form className="space-y-4" onSubmit={handleSubmit}>
        
        <FormInput label="Email" type="email" name="email" />
        <FormInput label="Password" type="password" name="password" />

        <button
          type="submit"
          className="w-full py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
        >
          Login
        </button>

        <div className="text-center text-sm mt-3 text-gray-700 dark:text-gray-300">
          <Link to="/user/register" className="underline mr-2">
            Register as User
          </Link>
          |
          <Link to="/foodpartner/register" className="underline ml-2">
            Register as Food Partner
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
