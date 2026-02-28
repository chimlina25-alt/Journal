import Link from "next/link";

export default function LoginPage() {
  return (
    <main
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/bg1.jpg')" }}
    >
      {/* Container */}
      <div className="relative w-full max-w-md px-4">

        {/* TITLE + LOGO */}
        <div className="relative flex items-center justify-center mb-8">
        

          {/* Title */}
          <h1 className="relative z-10 text-2xl font-semibold text-center">
            Welcome to Your Daily Journal!
          </h1>
           <img
  src="/pi2.png"
  alt="sticker"
  className="w-35 h-35 absolute -top-10 -right-30 opacity-80"
/>
        </div>

       

        {/* Login Card */}
        <div className="bg-white/40 backdrop-blur-md rounded-xl p-6 shadow-lg">

          <h2 className="text-sm font-medium mb-1">
            Login to your account
          </h2>
          <p className="text-xs text-gray-600 mb-4">
            Enter your email below to login to your account
          </p>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-xs mb-1">Email</label>
            <input
              type="email"
              placeholder="m@example.com"
              className="w-full px-3 py-2 rounded-md border border-gray-300 bg-white/70 focus:outline-none"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-xs mb-1">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 rounded-md border border-gray-300 bg-white/70 focus:outline-none"
            />
          </div>

          {/* Login Button */}
          <button className="w-full py-2 rounded-md bg-black text-white mb-3">
            Login
          </button>

          {/* Google Login */}
          <button className="w-full py-2 rounded-md border border-gray-300 bg-white">
            Login with Google
          </button>

          {/* Sign up */}
          <p className="text-xs text-center mt-3">
            Don’t have an account?{" "}
            <Link href="/sign_up" className="underline">
              Sign up
            </Link>
          </p>

        </div>
      </div>
    </main>
  );
}