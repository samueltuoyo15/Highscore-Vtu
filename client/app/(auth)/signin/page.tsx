"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Mail, Lock } from "lucide-react";
import { SIGN_IN_FORM_FIELDS } from "@/constants/constants";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const signInSchema = z.object({
  email: z.string().email("Email is required").min(1, "Email is required"),
  password: z.string().min(8, "Password must be at least 6 characters"),
});

type SignInFormData = z.infer<typeof signInSchema>;

export default function SignIn() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });
  const { error, login } = useAuth();

  const onSubmit = async (data: SignInFormData) => {
    try {
      console.log("Form submitted with data:", data);
      // const success = await login(data.email, data.password);
      // if (success) {
      //   reset();
      //   router.push("/");
      // }
      // router.push("/")
      console.error("error:", error);
    } catch (err) {
      console.error("Submission error:", err, error);
    }
  };

  return (
    <section className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Welcome Back
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        {SIGN_IN_FORM_FIELDS.map((field) => (
          <div key={field.name} className="space-y-1">
            <label
              htmlFor={field.name}
              className="block text-sm font-medium text-gray-700"
            >
              {field.label}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                {field.name === "email" ? (
                  <Mail size={20} />
                ) : (
                  <Lock size={20} />
                )}
              </div>
              <input
                id={field.name}
                type={field.type}
                placeholder={field.placeholder}
                className={`w-full pl-10 p-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                  errors[field.name as keyof SignInFormData]
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                {...register(field.name as keyof SignInFormData)}
              />
            </div>
            {errors[field.name as keyof SignInFormData] && (
              <p className="text-red-500 text-xs mt-1">
                {errors[
                  field.name as keyof SignInFormData
                ]?.message?.toString()}
              </p>
            )}
          </div>
        ))}

        <button
          type="submit"
          className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        >
          Sign In
        </button>
      </form>
    </section>
  );
}
