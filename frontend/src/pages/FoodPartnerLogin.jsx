// FoodPartnerLogin.jsx
import AuthLayout from "../components/AuthLayout";
import { FormInput } from "../components/FormInput";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function FoodPartnerLogin() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Stop reload
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    const response = await axios.post('http://localhost:3000/api/auth/foodpartner/login', {
      email,
      password
    }, { withCredentials: true });
    console.log(response.data);
    navigate('/createfood');
  };

  return (
    <AuthLayout title="Food Partner Login">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <FormInput label="Email" type="email" name="email" />
        <FormInput label="Password" type="password" name="password" />

        <button type="submit" className="w-full py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition">
          Login as Partner
        </button>

        <div className="text-center text-sm mt-3 text-gray-700 dark:text-gray-300">
          <Link to="/foodpartner/register" className="underline mr-2">
            Register as Food Partner
          </Link>
          |
          <Link to="/user/register" className="underline ml-2">
            Register as User
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
