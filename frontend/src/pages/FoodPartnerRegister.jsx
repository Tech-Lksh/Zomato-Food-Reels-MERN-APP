// FoodPartnerRegister.jsx
import AuthLayout from "../components/AuthLayout";
import { FormInput } from "../components/FormInput";
import { Form, Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function FoodPartnerRegister() {

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const contactName = form.contactName.value;
    const email = form.email.value;
    const password = form.password.value;
    const address = form.address.value;
    const phone = form.phone.value;

      const response = await axios.post("http://localhost:3000/api/auth/foodpartner/register", {
        name,
        contactName,
        email,
        password,
        address,
        phone
      });

      console.log(response.data); 
      navigate('/foodpartner/login');
  };

  return (
    <AuthLayout title="Food Partner Registration">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <FormInput label="Name" name="name" />
        <FormInput label="Contact Name" name="contactName" />
        <FormInput label="Email" type="email" name="email" />
        <FormInput label="Password" type="password" name="password" />
        <FormInput label="Address" name="address" />
        <FormInput label="Phone Number" name="phone" />

        <button type="submit" className="w-full py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition">
          Register as Partner
        </button>

        <div className="text-center text-sm mt-3 text-gray-700 dark:text-gray-300">
          <Link to="/foodpartner/login" className="underline mr-2">
            Already a Partner? Login
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
