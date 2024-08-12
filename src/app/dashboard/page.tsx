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
import React, { ChangeEvent, FormEvent, useState } from "react";
import { IoMdCloudUpload } from "react-icons/io";
import { z } from "zod";
import { useForm, zodResolver } from "@mantine/form";
import axios, { isAxiosError } from "axios";
import useNotification from "@/lib/hooks/useNotification";

interface AccountData {
  firstName: string;
  lastName: string;
  countryShort: string;
  idType: string;
  idFile: File;
  poaType: string;
  poaFile: File;
}

const Dashboard: React.FC = () => {
  const [formData, setFormData] = useState<AccountData>({
    firstName: "",
    lastName: "",
    countryShort: "",
    idType: "",
    idFile: null as unknown as File,
    poaType: "",
    poaFile: null as unknown as File,
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (name: string, file: File | null) => {
    setFormData({
      ...formData,
      [name]: file!,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData();
    data.append("firstName", formData.firstName);
    data.append("lastName", formData.lastName);
    data.append("countryShort", formData.countryShort);
    data.append("idType", formData.idType);
    data.append("idFile", formData.idFile);
    data.append("poaType", formData.poaType);
    data.append("poaFile", formData.poaFile);

    try {
      const response = await fetch(
        "https://dps.accounts.prunepayments.net/v1/accounts/request-account",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer sk_live_VwXRpCCdvw9EDC4KjNUJiUOqNsfEJN30wDI9TfoWzRa_763E4CasmYNHL97VmrNC`,
          },
          body: data,
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Form submitted successfully:", result);
      } else {
        console.error("Form submission failed:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred while submitting the form:", error);
    }
  };

  const iconBox = (
    <Group justify="center" bg={"#F3F2F2"} w={"105px"} h={"100%"}>
      <IoMdCloudUpload
        style={{ width: "20px", height: "20px", color: "#195874" }}
      />
    </Group>
  );

  // const Account = z.object({
  //   firstName: z.string().min(1, "First name is required"),
  //   lastName: z.string().min(1, "Last name is required"),
  //   countryShort: z.string().min(1, "Last name is required"),
  //   idType: z.string().min(1, "ID type is required"),
  //   poaType: z.string().min(1, "ID type is required"),
  // });

  // type AccounType = z.infer<typeof Account>;

  // const form = useForm<AccounType>({
  //   initialValues: {
  //     firstName: "",
  //     lastName: "",
  //     countryShort: "",
  //     idType: "",
  //     poaType: "",
  //   },
  //   validate: zodResolver(Account),
  // });

  // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   if (!formData.file) {
  //     handleError("File not uploaded", "error");
  //     return;
  //   }

  //   try {
  //     const { firstName, lastName, countryShort, idType } = form.values;
  //     const { data: res } = await axios.post(
  //       "https://dps.accounts.prunepayments.net/v1/accounts/request-account",
  //       {
  //         firstName,
  //         lastName,
  //         countryShort,
  //         idType,
  //         idFile,
  //       }
  //     );
  //     handleSuccess("Account created", "User Account has been created");
  //   } catch (error) {
  //     if (isAxiosError(error))
  //       return handleError("Error occured", error.response?.data.message);
  //     return handleError("Account creation failed", "An error occurred");
  //   }
  // };

  return (
    <Container size={1500} mx={"0px"} px={"0px"}>
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
                <Box component="form" onSubmit={handleSubmit}>
                  <Group justify="space-between" gap="sm" grow my={"10px"}>
                    <TextInput
                      radius="xs"
                      label="First Name"
                      name="firstName"
                      placeholder="Enter first name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                    <TextInput
                      radius="xs"
                      label="Last Name"
                      name="lastName"
                      placeholder="Enter last name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </Group>
                  <TextInput
                    radius="xs"
                    label="Country Short"
                    name="countryShort"
                    placeholder="Enter country short"
                    value={formData.countryShort}
                    onChange={handleInputChange}
                    required
                  />
                  <TextInput
                    radius="xs"
                    label="ID Type"
                    name="idType"
                    placeholder="Enter ID type"
                    value={formData.idType}
                    onChange={handleInputChange}
                    required
                  />
                  {/* <MultiSelect
                    radius="xs"
                    label="ID Type"
                    placeholder="Select ID type"
                    data={[
                      "Passport",
                      "Identity Card",
                      "Driving License",
                      "Residence Permit",
                    ]}
                  /> */}
                  <FileInput
                    label="ID File"
                    rightSection={iconBox}
                    size="sm"
                    radius="xs"
                    accept="image/png,image/jpeg"
                    placeholder="Upload a photo, PNG or JPEG; Max size: 500kb"
                    rightSectionPointerEvents="none"
                    onChange={(file) => handleFileChange("idFile", file)}
                    required
                  />
                  {/* <MultiSelect
                    radius="xs"
                    label="POA Type"
                    placeholder="Select POA type"
                    data={["Bank Statement", "Utility Bill"]}
                  /> */}
                  <TextInput
                    radius="xs"
                    label="POA Type"
                    name="poaType"
                    placeholder="Enter POA type"
                    value={formData.poaType}
                    onChange={handleInputChange}
                    required
                  />
                  <FileInput
                    label="POA File"
                    rightSection={iconBox}
                    size="sm"
                    radius="xs"
                    accept="image/png,image/jpeg"
                    placeholder="Upload a photo, PNG or JPEG; Max size: 500kb"
                    rightSectionPointerEvents="none"
                    onChange={(file) => handleFileChange("poaFile", file)}
                    required
                  />
                  <Button
                    type="submit"
                    radius={"xs"}
                    size="md"
                    fw={500}
                    fz={"12"}
                    style={{ border: "1px solid #40845F" }}
                    // component={Link}
                    // href={"/debit-request"}
                    my={"lg"}
                  >
                    Submit
                  </Button>
                </Box>
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
                />
                <TextInput
                  my={"5px"}
                  radius="xs"
                  label="Amount"
                  placeholder="Enter Amount"
                />
                <TextInput
                  my={"5px"}
                  radius="xs"
                  label="Destination IBAN"
                  placeholder="Enter Destination IBAN"
                />
                <TextInput
                  my={"5px"}
                  radius="xs"
                  label="Destination BIC"
                  placeholder="Enter Destination BIC"
                />
                <Group justify="space-between" gap="sm" grow>
                  <TextInput
                    radius="xs"
                    label="Destination Country"
                    placeholder="Enter Destination Country"
                  />
                  <TextInput
                    radius="xs"
                    label="Destination Bank"
                    placeholder="Enter Destination Bank"
                  />
                </Group>
                <Group justify="space-between" gap="sm" grow>
                  <TextInput
                    radius="xs"
                    label="Reference"
                    placeholder="Enter Reference"
                  />
                  <TextInput
                    radius="xs"
                    label="Reason"
                    placeholder="Enter Reason"
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
