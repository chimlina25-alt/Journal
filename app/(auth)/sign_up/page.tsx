import Link from "next/link";

export default function SignUpPage() {
  return (
    <main
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/bg1.jpg')" }}
    >
      <div className="relative w-full max-w-md">

        {/* Title */}
        <h1 className="relative z-10 text-2xl font-semibold text-center">
            Welcome to Your Daily Journal!
          </h1>
           <img
  src="/pi2.png"
  alt="sticker"
  className="w-35 h-35 absolute -top-10 -right-30 opacity-80"
/>
<br />
<br />
        {/* Card */}
        <div className="bg-white/40 backdrop-blur-md rounded-xl p-6 shadow-lg">

          <h2 className="text-sm font-medium mb-1">
            Create your account
          </h2>
          <p className="text-xs text-gray-600 mb-4">
            Enter your email below to create your account
          </p>

          {/* Full Name */}
          <div className="mb-3">
            <label className="block text-xs mb-1">Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full px-3 py-2 rounded-md border border-gray-300 bg-white/70 focus:outline-none"
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="block text-xs mb-1">Email</label>
            <input
              type="email"
              placeholder="m@example.com"
              className="w-full px-3 py-2 rounded-md border border-gray-300 bg-white/70 focus:outline-none"
            />
          </div>

          {/* Passwords */}
          <div className="grid grid-cols-2 gap-3 mb-2">
            <div>
              <label className="block text-xs mb-1">Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 rounded-md border border-gray-300 bg-white/70 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs mb-1">Confirm Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 rounded-md border border-gray-300 bg-white/70 focus:outline-none"
              />
            </div>
          </div>

          <p className="text-xs text-gray-500 mb-4">
            Must be at least 8 characters long.
          </p>

          {/* Create Button */}
          <button className="w-full py-2 rounded-md bg-black text-white mb-3">
            Create Account
          </button>

          {/* Sign in link */}
          <p className="text-xs text-center">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Sign in
            </Link>
          </p>
        </div>

        {/* Footer text */}
        <p className="text-[10px] text-center text-gray-600 mt-4">
          By clicking continue, you agree to our{" "}
          <span className="underline cursor-pointer">Terms of Service</span>{" "}
          and{" "}
          <span className="underline cursor-pointer">Privacy Policy</span>.
        </p>

      </div>
    </main>
  );
}