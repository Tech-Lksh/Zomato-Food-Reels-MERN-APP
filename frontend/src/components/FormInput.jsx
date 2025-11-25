// export function FormInput({ label, type = "text", ...rest }) {
//   return (
//     <div className="mb-4">
//       <label className="block mb-1 text-gray-700 dark:text-gray-300">
//         {label}
//       </label>
//       <input
//         type={type}
//         className="w-full px-3 py-2 border rounded-lg bg-gray-50 dark:bg-neutral-800 border-gray-300 dark:border-neutral-700 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-red-500"
//         {...rest}
//       />
//     </div>
//   );
// }



export const FormInput = ({ label, type = "text", name }) => {
  return (
    <div>
      <label className="block mb-1 text-gray-700 dark:text-gray-300">{label}</label>
      <input
        type={type}
        name={name}
        className="w-full px-3 py-2 border rounded-lg bg-gray-50 dark:bg-neutral-800 border-gray-300 dark:border-neutral-700 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-red-500"
        required
      />
    </div>
  );
};
