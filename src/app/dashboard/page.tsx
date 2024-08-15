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
  Paper,
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
import TabsSection from "./tabs";
import { debit } from "@/constant/url";

interface UserData {
  account: string;
  amount: number;
  destinationIBAN: string;
  destinationBIC: string;
  destinationCountry: string;
  destinationBank: string;
  reference: string;
  reason: string;
}

const Dashboard: React.FC = () => {
  const [requestForm, setRequestForm] = useState<UserData>({
    account: "",
    amount: 300,
    destinationIBAN: "",
    destinationBIC: "",
    destinationCountry: "",
    destinationBank: "",
    reference: "",
    reason: "",
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const updatedValue = name === "amount" ? parseFloat(value) : value;
    setRequestForm({
      ...requestForm,
      [name]: updatedValue,
    });
  };

  const handleUserSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      account: requestForm.account,
      amount: requestForm.amount,
      destinationIBAN: requestForm.destinationIBAN,
      destinationBIC: requestForm.destinationBIC,
      destinationCountry: requestForm.destinationCountry,
      destinationBank: requestForm.destinationBank,
      reference: requestForm.reference,
      reason: requestForm.reason,
    };

    console.log(data);

    try {
      const response = await fetch(`${debit}/v1/payout/send`, {
        method: "POST",
        headers: {
          Authorization: `Bearer sk_live_VwXRpCCdvw9EDC4KjNUJiUOqNsfEJN30wDI9TfoWzRa_763E4CasmYNHL97VmrNC`,
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

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

  return (
    <Container size={1500} mx={"0px"} px={"0px"}>
      <Stack h={"100vh"}>
        <Box p={"10px 20px"} bg={"#fff"} mb={"md"}>
          <Title order={6}>Dashboard</Title>
        </Box>
        <Box p={"10px 0px"} bg={"#fff"}>
          <Tabs defaultValue="createAccount" orientation="vertical" mt={"lg"}>
            <Tabs.List>
              <Tabs.Tab value="createAccount">Create Account</Tabs.Tab>
              <Tabs.Tab value="requestPayment">Request Payment</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="createAccount">
              <TabsSection />
            </Tabs.Panel>
            <Tabs.Panel value="requestPayment">
              <Box component="form" onSubmit={handleUserSubmit}>
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
                      radius="md"
                      label="Account"
                      placeholder="Enter Account"
                      name="account"
                      value={requestForm.account}
                      onChange={handleInputChange}
                    />
                    <TextInput
                      my={"5px"}
                      radius="md"
                      label="Amount"
                      placeholder="Enter Amount"
                      name="amount"
                      value={requestForm.amount}
                      onChange={handleInputChange}
                      type="number"
                    />
                    <TextInput
                      my={"5px"}
                      radius="md"
                      label="Destination IBAN"
                      placeholder="Enter Destination IBAN"
                      name="destinationIBAN"
                      value={requestForm.destinationIBAN}
                      onChange={handleInputChange}
                    />
                    <TextInput
                      my={"5px"}
                      radius="md"
                      label="Destination BIC"
                      placeholder="Enter Destination BIC"
                      name="destinationBIC"
                      value={requestForm.destinationBIC}
                      onChange={handleInputChange}
                    />
                    <Group justify="space-between" gap="sm" grow>
                      <TextInput
                        radius="md"
                        label="Destination Country"
                        placeholder="Enter Destination Country"
                        name="destinationCountry"
                        value={requestForm.destinationCountry}
                        onChange={handleInputChange}
                      />
                      <TextInput
                        radius="md"
                        label="Destination Bank"
                        placeholder="Enter Destination Bank"
                        name="destinationBank"
                        value={requestForm.destinationBank}
                        onChange={handleInputChange}
                      />
                    </Group>
                    <Group justify="space-between" gap="sm" grow>
                      <TextInput
                        radius="md"
                        label="Reference"
                        placeholder="Enter Reference"
                        name="reference"
                        value={requestForm.reference}
                        onChange={handleInputChange}
                      />
                      <TextInput
                        radius="md"
                        label="Reason"
                        placeholder="Enter Reason"
                        name="reason"
                        value={requestForm.reason}
                        onChange={handleInputChange}
                      />
                    </Group>
                    <Button
                      type="submit"
                      variant="gradient"
                      gradient={{ from: "violet", to: "cyan", deg: 90 }}
                      radius={"xl"}
                      size="lg"
                      fw={600}
                      fz={12}
                      my={"lg"}
                    >
                      Submit
                    </Button>
                  </Stack>
                </Flex>
              </Box>
            </Tabs.Panel>
          </Tabs>
        </Box>
      </Stack>
    </Container>
  );
};

export default withLayout(Dashboard);
