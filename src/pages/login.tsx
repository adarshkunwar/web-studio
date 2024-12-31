import LoginInForm from "../components/pageComponents/LogInForm";
const Login = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="w-96 border px-5 py-1">
        <LoginInForm />
      </div>
      <p className="text-sm">
        Don't have an account?
        <a href="/signUp" className="text-blue-500">
          Sign Up
        </a>
      </p>
    </div>
  );
};

export default Login;
