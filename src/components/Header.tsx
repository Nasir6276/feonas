"use client";

import {
  Avatar,
  Flex,
  Group,
  Menu,
  Paper,
  UnstyledButton,
  Text,
  rem,
  Image,
  Box,
  Indicator,
  ThemeIcon,
  Badge,
  Container,
  Burger,
} from "@mantine/core";

import { IconLogout, IconSearch, IconSettings } from "@tabler/icons-react";

import { BsBell } from "react-icons/bs";
import { FaRegCircleQuestion } from "react-icons/fa6";

import classes from "@/styles/components/header.module.scss";
import useNotification from "@/lib/hooks/useNotification";

import User from "@/lib/store/user.store";
import NILDS from "@/assets/logo-app.png";
import Link from "next/link";

import axios from "axios";
import { core } from "@/constant/url";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Notification } from "@/lib/interface";

const icon = <IconSearch style={{ width: rem(16), height: rem(16) }} />;

export default function Header() {
  const { user, setUser } = User();
  const { handleError, handleSuccess } = useNotification();
  const router = useRouter();

  const [notifications, setNotifications] = useState([]);

  const handleLogout = async () => {
    const token = Cookies.get("auth");
    try {
      Cookies.remove("auth");
      setUser(null);
      handleSuccess("Logout Successful", "See you again");

      // router.replace("/auth/login");
      router.refresh();
    } catch (error) {
      console.log(error);

      handleError("An error occurred", "Please try again later");
    }
  };

  const value = user?.email;

  const menuLinks = [
    {
      text: "Dashboard",
      link: "/",
    },
    {
      text: "Files",
      link: "/files",
    },
    {
      text: "Tasks",
      link: "/tasks",
    },
  ];

  const fetchUser = async () => {
    const token = Cookies.get("auth");
    const id = Cookies.get("user");
    try {
      const { data: res } = await axios.get(`${core}/people/user?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(res.data.user);
    } catch (error) {
      return;
    }
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      const token = Cookies.get("auth");
      try {
        const { data: res } = await axios.get(`${core}/notifications`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const unread = res.data.filter(
          (n: Notification) => n.status === "unread"
        );

        setNotifications(unread);
      } catch (err) {
        return;
      }
    };

    fetchNotifications();

    if (!user) {
      fetchUser();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <Container size={1200} h="100%">
      <Paper py={"md"} bg="transparent">
        <Flex w={"100%"} align={"center"} justify={"space-between"}>
          <Flex gap={20} align={"center"} h="100%">
            <Link href={"http://localhost:8090/"}>
              <Burger color="#195874" />
            </Link>
            <Link href={"/"}>
              <Image src={NILDS.src} h={26} w={28} fit="contain" alt="logo" />
            </Link>
          </Flex>

          <Group>
            <Group className={classes.icon_container}>
              <Badge
                variant="transparent"
                tt="capitalize"
                color="#4B4B4B"
                px={0}
                fz={12}
                fw={500}
                leftSection={
                  <ThemeIcon variant="transparent" color="#4B4B4B" size={15}>
                    <IconSettings />
                  </ThemeIcon>
                }
              >
                Settings
              </Badge>
              <Badge
                variant="transparent"
                tt="capitalize"
                color="#4B4B4B"
                px={0}
                fz={12}
                fw={500}
                leftSection={
                  <ThemeIcon variant="transparent" color="#4B4B4B" size={15}>
                    <FaRegCircleQuestion />
                  </ThemeIcon>
                }
              >
                Help
              </Badge>

              <Box
                component={Link}
                href={"/notification"}
                className={classes.icon_size}
              >
                <Indicator
                  label={notifications.length}
                  inline
                  size={25}
                  radius="xl"
                  offset={1}
                  withBorder
                  bg="transparent"
                >
                  <ThemeIcon variant="transparent">
                    <BsBell />
                  </ThemeIcon>
                </Indicator>
              </Box>
            </Group>

            <Menu
              width={260}
              position="bottom-end"
              transitionProps={{ transition: "pop-top-right" }}
              withinPortal
            >
              <Menu.Target>
                <UnstyledButton>
                  <Group>
                    <Avatar radius="xl" tt="uppercase" size={30} color="gray">
                      {user?.firstName?.charAt(0)}
                      {user?.lastName?.charAt(0)}
                    </Avatar>
                  </Group>
                </UnstyledButton>
              </Menu.Target>

              <Menu.Dropdown mt={15}>
                {/* <Link href="#"> */}
                <Menu.Item
                  component={Link}
                  href={`/people/${user?.id}`}
                  className={classes.bgHover}
                >
                  <Text fw={700} fz={{ base: 12, md: 14 }}>
                    {user?.firstName} {user?.lastName}
                  </Text>
                </Menu.Item>
                {/* </Link> */}

                <Menu.Label>Settings</Menu.Label>

                <Link href="/auth/reset-password">
                  <Menu.Item
                    className={classes.bgHover}
                    leftSection={<IconSettings size="0.9rem" stroke={1.5} />}
                  >
                    Change Password
                  </Menu.Item>
                </Link>

                <Menu.Item
                  className={classes.bgHover5}
                  onClick={handleLogout}
                  leftSection={<IconLogout size="0.9rem" stroke={1.5} />}
                >
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Flex>
      </Paper>
    </Container>
  );
}
