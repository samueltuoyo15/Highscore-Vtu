"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { Phone } from "lucide-react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { useRouter } from "next/navigation";
import { SIGN_UP_FORM_FIELDS } from "@/constants/constants";

const signUpSchema = z.object({
  fullName: z.string().min(1, "Full Name is required"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().refine(
    (val) => {
      const phoneNumber = parsePhoneNumberFromString(val || "");
      return phoneNumber?.isValid();
    },
    {
      message:
        "Please enter a valid phone number in international format (e.g. +1234567890)",
    },
  ),
});

type SignupSchemaType = z.infer<typeof signUpSchema>;

export default function SignUp() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<SignupSchemaType>({
    resolver: zodResolver(signUpSchema),
  });
  const router = useRouter();

  const onSubmit = async (data: SignupSchemaType) => {
    try {
      // const response = await axios.post(
      //   `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/v1/auth/signup`,
      //   data,
      //   {
      //     headers: { "Content-Type": "application/json" },
      //   },
      // );
      console.log(data);
      router.push("/");
      reset({ fullName: "", username: "", email: "", password: "", phone: "" });
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <section className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Create Account
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {SIGN_UP_FORM_FIELDS.map((field) => (
          <div key={field.name} className="space-y-1">
            <label
              htmlFor={field.name}
              className="block text-sm font-medium text-gray-700"
            >
              {field.label}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                {field.icon}
              </div>
              <input
                id={field.name}
                type={field.type}
                placeholder={field.placeholder}
                className={`w-full pl-10 p-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                  errors[field.name] ? "border-red-500" : "border-gray-300"
                }`}
                {...register(field.name as keyof SignupSchemaType)}
              />
            </div>
            {errors[field.name] && (
              <p className="text-red-500 text-xs mt-1">
                {errors[field.name]?.message?.toString()}
              </p>
            )}
          </div>
        ))}

        <div className="space-y-1">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Phone Number
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Phone className="w-5 h-5 text-gray-400" />
            </div>
            <Controller
              control={control}
              name="phone"
              render={({ field }) => (
                <PhoneInput
                  {...field}
                  international
                  defaultCountry="NG"
                  placeholder="+2348012345678"
                  className={`w-full pl-10 p-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  }`}
                />
              )}
            />
          </div>
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">
              {errors.phone.message?.toString()}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        >
          Sign Up
        </button>
      </form>
    </section>
  );
}
