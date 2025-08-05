import { useForm } from "react-hook-form";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";

export default function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  //   console.log(watch("example"))

  return (
    <Card className="mt-19">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email to login to your account
        </CardDescription>
        <CardAction>Signup</CardAction>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
            
          <input defaultValue="test" {...register("example")} />
          <input {...register("exampleRequired", { required: true })} />
          {errors.exampleRequired && <span>This field is required</span>}
          <input type="submit" />
        </form>
      </CardContent>
       <CardFooter>
     login with facebook , github
  </CardFooter>
    </Card>
  );
}
