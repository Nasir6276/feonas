"use client";

import withLayout from "@/layouts/appLayout";
import Logo from "@/assets/logo-app.jpg";
import {
  Box,
  Button,
  Container,
  FileInput,
  Flex,
  Group,
  Image,
  MultiSelect,
  Stack,
  Tabs,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import Link from "next/link";
import React from "react";
import { IoMdCloudUpload } from "react-icons/io";

const Dashboard = () => {
  const iconBox = (
    <Group justify="center" bg={"#F3F2F2"} w={"105px"} h={"100%"}>
      <IoMdCloudUpload
        style={{ width: "20px", height: "20px", color: "#195874" }}
      />
    </Group>
  );
  return (
    <Container size={1500}>
      <Box p={"10px 20px"} bg={"#fff"} mb={"md"}>
        <Title order={3}>Dashboard</Title>
      </Box>
      <Box p={"10px 0px"} bg={"#fff"}>
        <Tabs defaultValue="createAccount" orientation="vertical" mt={"lg"}>
          <Tabs.List>
            <Tabs.Tab value="createAccount">Create Account</Tabs.Tab>
            <Tabs.Tab value="requestPayment">Request Payment</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="createAccount">
            <Flex align={"center"} justify={"center"} h={"100%"}>
              <Stack p={"32px"} bg={"#ffffff"} w={"550px"} gap={"xs"}>
                <Flex align={"center"} justify={"center"} h={"100%"}>
                  <Image alt="logo" src={Logo.src} h={36} w={38} />
                </Flex>
                <Text fw={700} fz={24} c={"#000000"} ta={"center"}>
                  Create Your Account
                </Text>
                <Group justify="space-between" gap="sm" grow my={"10px"}>
                  <TextInput
                    radius="xs"
                    label="First Name"
                    placeholder="Enter first name"
                    required
                  />
                  <TextInput
                    radius="xs"
                    label="Last Name"
                    placeholder="Enter last name"
                    required
                  />
                </Group>
                <TextInput
                  radius="xs"
                  label="Country Short"
                  placeholder="Enter country short"
                  required
                />
                <MultiSelect
                  radius="xs"
                  label="ID Type"
                  placeholder="Select ID type"
                  data={[
                    "Passport",
                    "Identity Card",
                    "Driving License",
                    "Residence Permit",
                  ]}
                />
                <FileInput
                  label="ID File"
                  rightSection={iconBox}
                  size="sm"
                  radius="xs"
                  accept="image/png,image/jpeg"
                  placeholder="Upload a photo, PNG or JPEG; Max size: 500kb"
                  rightSectionPointerEvents="none"
                  required
                />
                <MultiSelect
                  radius="xs"
                  label="POA Type"
                  placeholder="Select POA type"
                  data={["Bank Statement", "Utility Bill"]}
                />
                <FileInput
                  label="POA File"
                  rightSection={iconBox}
                  size="sm"
                  radius="xs"
                  accept="image/png,image/jpeg"
                  placeholder="Upload a photo, PNG or JPEG; Max size: 500kb"
                  rightSectionPointerEvents="none"
                  required
                />
                <Button
                  // type="submit"
                  radius={"xs"}
                  size="md"
                  fw={500}
                  fz={"12"}
                  style={{ border: "1px solid #40845F" }}
                  component={Link}
                  href={"/debit-request"}
                  my={"lg"}
                >
                  Submit
                </Button>
              </Stack>
            </Flex>
          </Tabs.Panel>
          <Tabs.Panel value="requestPayment">
            <Flex align={"center"} justify={"center"} h={"100%"}>
              <Stack p={"32px"} bg={"#ffffff"} w={"550px"} gap={"xs"}>
                <Flex align={"center"} justify={"center"} h={"100%"}>
                  <Image alt="logo" src={Logo.src} h={36} w={38} />
                </Flex>
                <Text fw={700} fz={24} c={"#000000"} ta={"center"}>
                  Request Payout
                </Text>
                <TextInput
                  my={"5px"}
                  radius="xs"
                  label="Account"
                  placeholder="Enter Account"
                  required
                />
                <TextInput
                  my={"5px"}
                  radius="xs"
                  label="Amount"
                  placeholder="Enter Amount"
                  required
                />
                <TextInput
                  my={"5px"}
                  radius="xs"
                  label="Destination IBAN"
                  placeholder="Enter Destination IBAN"
                  required
                />
                <TextInput
                  my={"5px"}
                  radius="xs"
                  label="Destination BIC"
                  placeholder="Enter Destination BIC"
                  required
                />
                <Group justify="space-between" gap="sm" grow>
                  <TextInput
                    radius="xs"
                    label="Destination Country"
                    placeholder="Enter Destination Country"
                    required
                  />
                  <TextInput
                    radius="xs"
                    label="Destination Bank"
                    placeholder="Enter Destination Bank"
                    required
                  />
                </Group>
                <Group justify="space-between" gap="sm" grow>
                  <TextInput
                    radius="xs"
                    label="Reference"
                    placeholder="Enter Reference"
                    required
                  />
                  <TextInput
                    radius="xs"
                    label="Reason"
                    placeholder="Enter Reason"
                    required
                  />
                </Group>
                <Button
                  // type="submit"
                  radius={"xs"}
                  size="md"
                  fw={500}
                  fz={"12"}
                  style={{ border: "1px solid #40845F" }}
                  component={Link}
                  href={"/"}
                  my={"lg"}
                >
                  Submit
                </Button>
              </Stack>
            </Flex>
          </Tabs.Panel>
        </Tabs>
      </Box>
    </Container>
  );
};

export default withLayout(Dashboard);
