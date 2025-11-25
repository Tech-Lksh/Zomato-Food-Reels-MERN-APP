export default function AuthLayout({ title, children }) {
return (
<div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-black px-4">
<div className="w-full max-w-md bg-white dark:bg-neutral-900 shadow-xl rounded-2xl p-8 border border-gray-200 dark:border-neutral-800">
<h1 className="text-2xl font-semibold text-gray-900 dark:text-white text-center mb-6">
{title}
</h1>
{children}
</div>
</div>
);
}