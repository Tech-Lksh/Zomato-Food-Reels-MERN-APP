// UserRegister.jsx
import AuthLayout from "../components/AuthLayout";
import { FormInput } from "../components/FormInput";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UserRegister() {

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const fullName = form.fullName.value;
    const email = form.email.value;
    const password = form.password.value;

    const response = await axios.post('http://localhost:3000/api/auth/user/register', {
      fullName,
      email,
      password
    },{ withCredentials: true });

    console.log(response.data);
    navigate('/user/login');
  };

  return (
    <AuthLayout title="Create User Account">
      <form className="space-y-4" onSubmit={handleSubmit}>

        <FormInput label="Full Name" name="fullName" />
        <FormInput label="Email" type="email" name="email" />
        <FormInput label="Password" type="password" name="password" />

        <button
          type="submit"
          className="w-full py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
        >
          Register
        </button>

        <div className="text-center text-sm mt-3 text-gray-700 dark:text-gray-300">
          <Link to="/user/login" className="underline mr-2">
            Already a User? Login
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
