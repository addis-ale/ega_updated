import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

const RegisterPage = () => {
  return (
    <div className="mt-40">
      <div className="flex items-center justify-center">
        <SignUp
          signInUrl="/login"
          routing="hash"
          appearance={{
            baseTheme: dark,
          }}
        />
      </div>
    </div>
  );
};

export default RegisterPage;
