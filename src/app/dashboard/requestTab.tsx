import Logo from "@/assets/logo-app.jpg";
import {
  Box,
  Button,
  Flex,
  Group,
  Image,
  Stack,
  Tabs,
  Text,
  TextInput,
} from "@mantine/core";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { debit, token } from "@/constant/url";

interface DisburseFunds {
  amount: number;
  destinationIBAN: string;
  destinationBIC: string;
  destinationCountry: string;
  destinationBank: string;
  reference: string;
  reason: string;
}

interface RequestPayout {
  account: string;
  amount: number;
  destinationIBAN: string;
  destinationBIC: string;
  destinationCountry: string;
  destinationBank: string;
  reference: string;
  reason: string;
}

const RequestTab = () => {
  const [requestForm, setRequestForm] = useState<RequestPayout>({
    account: "",
    amount: 300,
    destinationIBAN: "",
    destinationBIC: "",
    destinationCountry: "",
    destinationBank: "",
    reference: "",
    reason: "",
  });
  const [disburseForm, setDisburseForm] = useState<DisburseFunds>({
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

  const handleDisburseInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const updatedValue = name === "amount" ? parseFloat(value) : value;
    setDisburseForm({
      ...disburseForm,
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

    try {
      const response = await fetch(`${debit}/v1/payout/send`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
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

  const handleDisburseSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      amount: disburseForm.amount,
      destinationIBAN: disburseForm.destinationIBAN,
      destinationBIC: disburseForm.destinationBIC,
      destinationCountry: disburseForm.destinationCountry,
      destinationBank: disburseForm.destinationBank,
      reference: disburseForm.reference,
      reason: disburseForm.reason,
    };

    try {
      const response = await fetch(`${debit}/v1/payout/disburse`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
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
    <>
      <Flex align={"center"} justify={"center"} h={"100%"}>
        <Stack p={"32px"} bg={"#ffffff"} w={"550px"} gap={"xs"}>
          <Flex align={"center"} justify={"center"} h={"100%"}>
            <Image alt="logo" src={Logo.src} h={36} w={38} />
          </Flex>
          <Text fw={700} fz={24} c={"#000000"} ta={"center"}>
            Request Payout
          </Text>
          <Tabs defaultValue="disburseFunds">
            <Tabs.List>
              <Tabs.Tab value="disburseFunds">Disburse Funds</Tabs.Tab>
              <Tabs.Tab value="requestPayout">Request Payout</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="disburseFunds">
              <Box component="form" onSubmit={handleDisburseSubmit}>
                <Stack>
                  <TextInput
                    my={"5px"}
                    radius="md"
                    label="Amount"
                    placeholder="Enter Amount"
                    name="amount"
                    value={disburseForm.amount}
                    onChange={handleDisburseInputChange}
                    type="number"
                  />
                  <TextInput
                    my={"5px"}
                    radius="md"
                    label="Destination IBAN"
                    placeholder="Enter Destination IBAN"
                    name="destinationIBAN"
                    value={disburseForm.destinationIBAN}
                    onChange={handleDisburseInputChange}
                  />
                  <TextInput
                    my={"5px"}
                    radius="md"
                    label="Destination BIC"
                    placeholder="Enter Destination BIC"
                    name="destinationBIC"
                    value={disburseForm.destinationBIC}
                    onChange={handleDisburseInputChange}
                  />
                  <Group justify="space-between" gap="sm" grow>
                    <TextInput
                      radius="md"
                      label="Destination Country"
                      placeholder="Enter Destination Country"
                      name="destinationCountry"
                      value={disburseForm.destinationCountry}
                      onChange={handleDisburseInputChange}
                    />
                    <TextInput
                      radius="md"
                      label="Destination Bank"
                      placeholder="Enter Destination Bank"
                      name="destinationBank"
                      value={disburseForm.destinationBank}
                      onChange={handleDisburseInputChange}
                    />
                  </Group>
                  <Group justify="space-between" gap="sm" grow>
                    <TextInput
                      radius="md"
                      label="Reference"
                      placeholder="Enter Reference"
                      name="reference"
                      value={disburseForm.reference}
                      onChange={handleDisburseInputChange}
                    />
                    <TextInput
                      radius="md"
                      label="Reason"
                      placeholder="Enter Reason"
                      name="reason"
                      value={disburseForm.reason}
                      onChange={handleDisburseInputChange}
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
              </Box>
            </Tabs.Panel>
            <Tabs.Panel value="requestPayout">
              <Box component="form" onSubmit={handleUserSubmit}>
                <Stack>
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
              </Box>
            </Tabs.Panel>
          </Tabs>
        </Stack>
      </Flex>
    </>
  );
};

export default RequestTab;
