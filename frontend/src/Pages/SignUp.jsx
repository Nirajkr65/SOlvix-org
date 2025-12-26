import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router";
import { useEffect, useState } from "react";
import { registerUser } from "../authSlice";
import { Eye, EyeOff } from "lucide-react";

/* =======================
   ZOD SCHEMA (UNCHANGED)
======================= */
const signUpSchema = z.object({
  firstName: z.string().min(3, "Name should contain atleast 3 characters"),
  emailId: z.string().email("Invalid Email"),
  password: z
    .string()
    .min(8, "Password should be atleast 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must include uppercase, lowercase, number, and special character"
    ),
});

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, loading } = useSelector(
    (state) => state.auth
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/problems");
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = (data) => {
    dispatch(registerUser(data));
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black px-4 overflow-hidden font-sans">
      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-500/20 blur-[150px] rounded-full" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-500/20 blur-[150px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
      </div>

      {/* CARD */}
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_0_80px_-15px_rgba(0,0,0,0.9)] p-8">
          {/* HEADER */}
          <div className="text-center space-y-2 mb-6">
            <div className="mx-auto h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-400 to-indigo-500 flex items-center justify-center text-black font-bold text-xl">
              SX
            </div>
            <h1 className="text-2xl font-bold text-white">
              Create your account
            </h1>
            <p className="text-sm text-zinc-400">
              Sign up to get started
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* NAME */}
            <div>
              <label className="text-sm text-zinc-300 mb-1 block">
                Name
              </label>
              <input
                {...register("firstName")}
                placeholder="Niraj"
                className="w-full h-11 rounded-lg bg-zinc-950 border border-zinc-800 px-4 text-sm text-white placeholder:text-zinc-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 transition"
              />
              {errors.firstName && (
                <p className="text-xs text-red-400 mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            {/* EMAIL */}
            <div>
              <label className="text-sm text-zinc-300 mb-1 block">
                Email
              </label>
              <input
                {...register("emailId")}
                type="email"
                placeholder="name@example.com"
                className="w-full h-11 rounded-lg bg-zinc-950 border border-zinc-800 px-4 text-sm text-white placeholder:text-zinc-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 transition"
              />
              {errors.emailId && (
                <p className="text-xs text-red-400 mt-1">
                  {errors.emailId.message}
                </p>
              )}
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-sm text-zinc-300 mb-1 block">
                Password
              </label>
              <div className="relative">
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  className="w-full h-11 rounded-lg bg-zinc-950 border border-zinc-800 px-4 pr-12 text-sm text-white placeholder:text-zinc-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-400 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-lg bg-gradient-to-r from-emerald-400 to-indigo-500 text-black font-semibold text-sm shadow-lg hover:opacity-90 hover:scale-[1.02] transition disabled:opacity-50 disabled:scale-100"
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
                  Creating account...
                </span>
              ) : (
                "Create Account"
              )}
            </button>
          </form>
        </div>

        {/* FOOTER */}
        <p className="mt-6 text-center text-sm text-zinc-400">
          Already have an account?{" "}
          <NavLink
            to="/login"
            className="text-white font-medium hover:underline underline-offset-4"
          >
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
