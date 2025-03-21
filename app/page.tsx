"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import axios from "axios";
// import { useRouter } from "next/navigation";
import { useActionState, useState } from "react";
import { signup } from "./action";

const defaultUser: User = {
  username: "",
  email: "",
};

export default function Home() {
  // const router = useRouter();
  const [user, setUser] = useState<User>(defaultUser);

  // proper backend handling machi b node
  const [state, action, pending] = useActionState(signup, undefined);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  //example on how to call next api from frontend
  /*
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    axios
      .post("/api/user", user)
      .then((res) => console.log(res))
      .catch((error) => console.log(error))
      .finally(() => router.push("/success"));
  }
*/
  // too lazy to seperate into diffrent components split em ur selfs
  return (
    <div className="flex items-center justify-center h-dvh">
      <Tabs defaultValue="team" className="w-[400px]">
        <TabsList className="w-full">
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="solo">Solo</TabsTrigger>
        </TabsList>
        <TabsContent value="solo">
          <Card>
            <CardHeader>
              <CardTitle className="text-center font-bold text-2xl">
                Event name
              </CardTitle>
              <CardDescription>
                Solo form: add apropriate fields
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form action={action}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      name="username"
                      placeholder="JohnDoe"
                      value={user.username}
                      onChange={handleChange}
                    />
                  </div>
                  {state?.errors?.username && (
                    <p className="text-sm text-red-500">
                      {state.errors.username}
                    </p>
                  )}
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email">E-mail</Label>
                    <div className="relative">
                      <Input
                        id="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        className=""
                        placeholder="example@example.com"
                      />
                    </div>
                    {state?.errors?.email && (
                      <div className="text-sm text-red-500">
                        {state?.errors?.email && (
                          <p className="text-sm text-red-500">
                            {state.errors.email}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <Button
                  className="flex-1 w-full mt-3"
                  disabled={pending}
                  type="submit"
                >
                  {pending ? "Signing in..." : "Sign in"}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="text-sm">Made by Club name</CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="team">
          <Card>
            <CardHeader>
              <CardTitle className="text-center font-bold text-2xl">
                Event name
              </CardTitle>
              <CardDescription>
                Team form: add apropriate fields
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form action={action}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      name="username"
                      placeholder="JohnDoe"
                      value={user.username}
                      onChange={handleChange}
                    />
                  </div>
                  {state?.errors?.username && (
                    <p className="text-sm text-red-500">
                      {state.errors.username}
                    </p>
                  )}
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email">E-mail</Label>
                    <div className="relative">
                      <Input
                        id="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        className=""
                        placeholder="example@example.com"
                      />
                    </div>
                    {state?.errors?.email && (
                      <div className="text-sm text-red-500">
                        {state?.errors?.email && (
                          <p className="text-sm text-red-500">
                            {state.errors.email}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <Button
                  className="flex-1 w-full mt-3"
                  disabled={pending}
                  type="submit"
                >
                  {pending ? "Signing in..." : "Sign in"}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="text-sm">Made by Club name</CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
