"use client";

import useNotification from "@/lib/hooks/useNotification";
import {
  Box,
  Button,
  Container,
  Flex,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { z } from "zod";

const Login = () => {
  const { handleError, handleSuccess } = useNotification();
  const [visible, setVisible] = useState(false);
  const { push } = useRouter();

  //   const User = z.object({
  //     email: z
  //       .string()
  //       .email({ message: "Invalid email address" })
  //       .min(1, "Email is required"),
  //     password: z.string().min(1, {
  //       message:
  //         "Your password should be: 8+ characters, with uppercase and lowercase letters, numbers, and special characters.",
  //     }),
  //   });

  //   type UserType = z.infer<typeof User>;

  //   const form = useForm<UserType>({
  //     initialValues: {
  //       email: "",
  //       password: "",
  //     },

  //     validate: zodResolver(User),
  //   });

  //  const handleSubmit = async () => {
  //    setVisible(true);
  //    try {
  //      const { email, password } = form.values;
  //      const { data: res } = await axios.post(`${auth}/auth/login`, {
  //        email,
  //        password,
  //      });

  //      Cookies.set("logToken", res.data.token);
  //      console.log(res.data.token);
  //      push("/");
  //      handleSuccess("Login successful", "Admin has successfully signed in");
  //    } catch (error) {
  //      if (isAxiosError(error))
  //        return handleError("Login failed", error.response?.data.message);
  //      return handleError("Login failed", "An error occurred");
  //    } finally {
  //      setVisible(false);
  //    }
  //  };

  return (
    <Container size={1500}>
      <Flex align={"center"} justify={"center"} bg={"#F3F5F7"} h={"100vh"}>
        <Flex align={"center"} justify={"center"} bg={"#F3F5F7"} h={"100vh"}>
          <Stack p={"40px 32px"} bg={"#fff"} w={"520px"} gap={"32px"}>
            <Flex align={"center"} justify={"center"}>
              <Stack gap={"xs"}>
                <Text fw={500} fz={24} ta={"center"}>
                  Log In
                </Text>
                <Text fw={500} fz={12} c={"#807F7F"} ta={"center"}>
                  Input your details to have access to your account.
                </Text>
              </Stack>
            </Flex>
            <Box
              component="form"
              //   onSubmit={form.onSubmit(() => handleSubmit())}
            >
              <Stack>
                <TextInput
                  size="md"
                  placeholder="Enter email address"
                  radius={"xs"}
                  mt={"8px"}
                  label="Email address"
                />
                <PasswordInput
                  size="md"
                  radius="xs"
                  label="Password"
                  placeholder="Enter password"
                  fz={1}
                  fw={500}
                />
                <Text fw={500} fz={12} c={"#133D51"}>
                  Forgotten your password? Reset now
                </Text>
                <Button
                  variant="filled"
                  bg={"#195874"}
                  radius={"xs"}
                  size="md"
                  fw={500}
                  fz={12}
                  // type="submit"
                  component={Link}
                  href={"/dashboard"}
                >
                  Log In
                </Button>
              </Stack>
            </Box>
            <Text
              ta={"center"}
              fw={500}
              fz={12}
              style={{ cursor: "pointer" }}
              // component={Link}
              // href={"/sign-up"}
            >
              Don&apos;t have an account?{" "}
              <span style={{ color: "#195874", fontWeight: "bold" }}>
                Register now
              </span>
            </Text>
          </Stack>
        </Flex>
      </Flex>
    </Container>
  );
};

export default Login;
