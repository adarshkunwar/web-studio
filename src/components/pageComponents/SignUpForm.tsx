import { useState } from "react";
// type Props = {}

import { useForm } from "react-hook-form";
import {
  registerFormDefaultValue,
  registerFormField,
  registerFormSchema,
  TRegisterFormSchema,
} from "../../model/signup.model";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";

import axios from "../axios/axios";
import { toast } from "sonner";

const UserRegistration = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const form = useForm<TRegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: registerFormDefaultValue,
  });

  //post data to backend
  const postData = async (val: TRegisterFormSchema) => {
    try {
      await axios
        .post("api/v1/en/user/signup", val)
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          toast.success("Successfully logged in");
          navigate("/");
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    } catch (error) {
      console.log(error);
      toast.error("failed to register");
    } finally {
      setLoading(false);
    }
  };

  async function onSubmit(values: TRegisterFormSchema) {
    postData(values);

    form.reset();
    console.log(values);
  }

  return (
    <section className="py-10 w-8/12 mx-auto">
      <div>
        <Form {...form}>
          <h2 className="text-2xl font-semibold text-center leading-10">
            Register your account
          </h2>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full  grid grid-cols-1 sm:grid-cols-4 gap-4 mx-auto py-4"
          >
            {registerFormField.map((field) => {
              return (
                <div>
                  <div className="bg-black text-white py-2 px-5 text-2xl">
                    {field.title}
                  </div>
                  {field.fields.map((formField) => {
                    return (
                      <FormField
                        key={formField.name}
                        control={form.control}
                        name={formField.name}
                        render={({ field }) => (
                          <FormItem
                            className={`${formField.grid === 1 ? "col-span-1" : formField.grid === 2 ? "col-span-2" : formField.grid === 3 ? "col-span-3" : "col-span-4"} `}
                          >
                            <FormLabel className="capitalize">
                              {formField.label}
                            </FormLabel>
                            <FormControl>
                              {formField.type === "select" ? (
                                <select
                                  {...field}
                                  required={formField.required}
                                  className="border rounded px-2 py-1 w-full focus:outline-none"
                                >
                                  <option value="" disabled>
                                    Select {formField.label.toLowerCase()}
                                  </option>
                                  {formField.option?.map((option) => (
                                    <option
                                      key={option.value}
                                      value={option.value}
                                    >
                                      {option.label}
                                    </option>
                                  ))}
                                </select>
                              ) : (
                                <Input
                                  placeholder={formField.placeholder}
                                  required={formField.required}
                                  type={formField.type}
                                  {...field}
                                  className="focus:outline-none"
                                />
                              )}
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    );
                  })}
                </div>
              );
            })}
            <div className="sm:col-span-2 flex justify-center">
              <Button type="submit" variant="default" disabled={loading}>
                {loading ? "loaidng..." : "Register"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default UserRegistration;
