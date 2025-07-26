import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
const LoginPage = () => {
  return (
    <div className="mt-40">
      <div className="flex items-center justify-center">
        <SignIn
          signUpUrl="/register"
          routing="hash"
          appearance={{ baseTheme: dark }}
        />
      </div>
    </div>
  );
};

export default LoginPage;
