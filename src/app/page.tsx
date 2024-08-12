"use client";

import useNotification from "@/lib/hooks/useNotification";
import {
  Box,
  Button,
  Container,
  Flex,
  Group,
  Image,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { FaRegEnvelope } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, ChangeEvent, FormEvent } from "react";
import sideImage from "@/assets/sideImage.jpeg";
import { CiLock } from "react-icons/ci";

const Login = () => {
  const { handleError, handleSuccess } = useNotification();
  const [visible, setVisible] = useState(false);
  const { push } = useRouter();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setVisible(true);

    const defaultUsername = "feonas@gmail.com";
    const defaultPassword = "Feonas2024";

    setTimeout(() => {
      if (username === defaultUsername && password === defaultPassword) {
        handleSuccess("Login successful", "Admin has successfuly signed in");
        push("/dashboard");
      } else {
        handleError("Login failed", "Wrong credentials");
      }
      setVisible(false);
    }, 500);
  };

  const emailIcon = (
    <Group justify="center" bg={"#FFF"}>
      <FaRegEnvelope />
    </Group>
  );
  const passIcon = (
    <Group justify="center" bg={"#FFF"}>
      <CiLock />
    </Group>
  );

  return (
    <Container size={1500}>
      <Group bg={"#FFF"} h={"100vh"} p={"20px"} grow>
        <Box p={"lg"} h={"100%"}>
          <Image
            radius={"xl"}
            src={sideImage.src}
            alt="sideImage"
            height={"100%"}
            w={"100%"}
          />
        </Box>
        <Box>
          <Flex align={"center"} justify={"center"} h={"100vh"}>
            <Stack p={"40px 32px"} bg={"#fff"} w={"520px"} gap={"32px"}>
              <Flex align={"center"} justify={"center"}>
                <Stack gap={"xs"}>
                  <Text fw={700} fz={24} ta={"center"}>
                    Log In
                  </Text>
                  <Text fw={500} fz={12} c={"#807F7F"} ta={"center"}>
                    Input your details to have access to your account.
                  </Text>
                </Stack>
              </Flex>
              <Box component="form" onSubmit={handleSubmit}>
                <Stack>
                  <TextInput
                    leftSection={emailIcon}
                    radius={"md"}
                    size="lg"
                    placeholder="Enter email address"
                    mt={"8px"}
                    label="Email address"
                    value={username}
                    onChange={handleUsernameChange}
                  />
                  <PasswordInput
                    leftSection={emailIcon}
                    radius={"md"}
                    size="lg"
                    label="Password"
                    placeholder="Enter password"
                    fz={1}
                    fw={500}
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  <Button
                    variant="gradient"
                    gradient={{ from: "violet", to: "cyan", deg: 90 }}
                    radius={"md"}
                    size="lg"
                    fw={600}
                    fz={12}
                    type="submit"
                  >
                    Log In
                  </Button>
                </Stack>
              </Box>
            </Stack>
          </Flex>
        </Box>
      </Group>
    </Container>
  );
};

export default Login;
