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
import { auth } from "@/constant/url";

interface UserData {
  firstName: string;
  lastName: string;
  countryShort: string;
  idType: string;
  idFile: File;
  poaType: string;
  poaFile: File;
}

interface CorporateData {
  countryShort: string;
  companyName: string;
  director_1_idType: string;
  director_1_idFile: File;
  director_1_poaType: string;
  director_1_poaFile: File;
  shareholder_1_idType: string;
  shareholder_1_idFile: File;
  shareholder_1_poaType: string;
  shareholder_1_poaFile: File;
}

const TabsSection = () => {
  const { handleError, handleSuccess } = useNotification();
  const [userForm, setUserForm] = useState<UserData>({
    firstName: "",
    lastName: "",
    countryShort: "",
    idType: "",
    idFile: null as unknown as File,
    poaType: "",
    poaFile: null as unknown as File,
  });

  const [corporateForm, setCorporateForm] = useState<CorporateData>({
    countryShort: "",
    companyName: "",
    director_1_idType: "",
    director_1_idFile: null as unknown as File,
    director_1_poaType: "",
    director_1_poaFile: null as unknown as File,
    shareholder_1_idType: "",
    shareholder_1_idFile: null as unknown as File,
    shareholder_1_poaType: "",
    shareholder_1_poaFile: null as unknown as File,
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUserForm({
      ...userForm,
      [name]: value,
    });
  };

  const handleFileChange = (name: string, file: File | null) => {
    setUserForm({
      ...userForm,
      [name]: file!,
    });
  };

  const handleCorporateInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setCorporateForm({
      ...corporateForm,
      [name]: value,
    });
  };

  const handleCorporateFileChange = (name: string, file: File | null) => {
    setCorporateForm({
      ...corporateForm,
      [name]: file!,
    });
  };

  const handleUserSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData();
    data.append("firstName", userForm.firstName);
    data.append("lastName", userForm.lastName);
    data.append("countryShort", userForm.countryShort);
    data.append("idType", userForm.idType);
    data.append("idFile", userForm.idFile);
    data.append("poaType", userForm.poaType);
    data.append("poaFile", userForm.poaFile);

    try {
      const response = await fetch(`${auth}/request-account`, {
        method: "POST",
        headers: {
          Authorization: `Bearer sk_live_VwXRpCCdvw9EDC4KjNUJiUOqNsfEJN30wDI9TfoWzRa_763E4CasmYNHL97VmrNC`,
        },
        body: data,
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

  const handleCorporateSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData();
    data.append("countryShort", corporateForm.countryShort);
    data.append("companyName", corporateForm.companyName);
    data.append("director_1_idType", corporateForm.director_1_idType);
    data.append("director_1_idFile", corporateForm.director_1_idFile);
    data.append("director_1_poaType", corporateForm.director_1_poaType);
    data.append("director_1_poaFile", corporateForm.director_1_poaFile);
    data.append("shareholder_1_idType", corporateForm.shareholder_1_idType);
    data.append("shareholder_1_idFile", corporateForm.shareholder_1_idFile);
    data.append("shareholder_1_poaType", corporateForm.shareholder_1_poaType);
    data.append("shareholder_1_poaFile", corporateForm.shareholder_1_poaFile);

    try {
      const response = await fetch(`${auth}/request-corporate-account`, {
        method: "POST",
        headers: {
          Authorization: `Bearer sk_live_VwXRpCCdvw9EDC4KjNUJiUOqNsfEJN30wDI9TfoWzRa_763E4CasmYNHL97VmrNC`,
        },
        body: data,
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

  const iconBox = (
    <Group justify="center">
      <IoMdCloudUpload
        style={{ width: "20px", height: "20px", color: "#195874" }}
      />
    </Group>
  );
  return (
    <>
      <Flex
        align={"center"}
        justify={"center"}
        h={"100%"}
        style={{ flexDirection: "column" }}
      >
        <Stack p={"32px"} bg={"#ffffff"} w={"550px"} gap={"lg"}>
          <Flex align={"center"} justify={"center"} h={"100%"}>
            <Image alt="logo" src={Logo.src} h={36} w={38} />
          </Flex>
          <Text fw={700} fz={24} c={"#000000"} ta={"center"}>
            Create An Account
          </Text>
          <Tabs defaultValue="userAccount">
            <Tabs.List>
              <Tabs.Tab value="userAccount">User Account</Tabs.Tab>
              <Tabs.Tab value="corporateAccount">Corporate Account</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="userAccount">
              <Box component="form" onSubmit={handleUserSubmit}>
                <Stack>
                  <Group justify="space-between" gap="sm" grow my={"10px"}>
                    <TextInput
                      radius={"md"}
                      label="First Name"
                      name="firstName"
                      placeholder="Enter first name"
                      value={userForm.firstName}
                      onChange={handleInputChange}
                      required
                    />
                    <TextInput
                      radius={"md"}
                      label="Last Name"
                      name="lastName"
                      placeholder="Enter last name"
                      value={userForm.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </Group>
                  <TextInput
                    radius={"md"}
                    label="Country Short"
                    name="countryShort"
                    placeholder="Enter country short"
                    value={userForm.countryShort}
                    onChange={handleInputChange}
                    required
                  />
                  <TextInput
                    radius={"md"}
                    label="ID Type"
                    name="idType"
                    placeholder="Enter ID type"
                    value={userForm.idType}
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
                    radius={"md"}
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
                    radius={"md"}
                    label="POA Type"
                    name="poaType"
                    placeholder="Enter POA type"
                    value={userForm.poaType}
                    onChange={handleInputChange}
                    required
                  />
                  <FileInput
                    label="POA File"
                    rightSection={iconBox}
                    radius={"md"}
                    accept="image/png,image/jpeg"
                    placeholder="Upload a photo, PNG or JPEG; Max size: 500kb"
                    rightSectionPointerEvents="none"
                    onChange={(file) => handleFileChange("poaFile", file)}
                    required
                  />
                  <Button
                    // type="submit"
                    variant="gradient"
                    gradient={{ from: "violet", to: "cyan", deg: 90 }}
                    radius={"xl"}
                    size="lg"
                    fw={600}
                    fz={12}
                    component={Link}
                    href={"/"}
                    my={"lg"}
                    fullWidth
                  >
                    Submit
                  </Button>
                </Stack>
              </Box>
            </Tabs.Panel>
            <Tabs.Panel value="corporateAccount">
              <Box component="form" onSubmit={handleCorporateSubmit}>
                <Stack>
                  <TextInput
                    required
                    radius={"md"}
                    label="Country Short"
                    name="countryShort"
                    placeholder="Enter country short"
                    value={corporateForm.countryShort}
                    onChange={handleCorporateInputChange}
                  />
                  <TextInput
                    radius={"md"}
                    label="Company Name"
                    name="companyName"
                    placeholder="Enter company name"
                    value={corporateForm.companyName}
                    onChange={handleCorporateInputChange}
                  />
                  <TextInput
                    radius={"md"}
                    label="Director 1 ID Type"
                    name="director_1_idType"
                    placeholder="Enter Director 1 ID Type"
                    value={corporateForm.director_1_idType}
                    onChange={handleCorporateInputChange}
                  />
                  <FileInput
                    label="Director 1 ID File"
                    rightSection={iconBox}
                    radius={"md"}
                    accept="image/png,image/jpeg, image/jpg"
                    placeholder="Upload a photo, PNG or JPEG; Max size: 500kb"
                    onChange={(file) =>
                      handleCorporateFileChange("director_1_idFile", file)
                    }
                  />
                  <TextInput
                    radius={"md"}
                    label="Director 1 POA Type"
                    name="director_1_poaType"
                    placeholder="Enter Director 1 POA Type"
                    value={corporateForm.director_1_poaType}
                    onChange={handleCorporateInputChange}
                  />
                  <FileInput
                    label="Director 1 POA File"
                    rightSection={iconBox}
                    radius={"md"}
                    accept="application/pdf"
                    placeholder="Upload a photo, PNG or JPEG; Max size: 500kb"
                    onChange={(file) =>
                      handleCorporateFileChange("director_1_poaFile", file)
                    }
                  />
                  <TextInput
                    radius={"md"}
                    label="Shareholder 1 ID Type"
                    name="shareholder_1_idType"
                    placeholder="Enter Shareholder 1 ID Type"
                    value={corporateForm.shareholder_1_idType}
                    onChange={handleCorporateInputChange}
                  />
                  <FileInput
                    label="Shareholder 1 ID File"
                    rightSection={iconBox}
                    radius={"md"}
                    accept="image/png,image/jpeg, image/jpg application/pdf"
                    placeholder="Upload a photo, PNG or JPEG; Max size: 500kb"
                    onChange={(file) =>
                      handleCorporateFileChange("shareholder_1_idFile", file)
                    }
                  />
                  <TextInput
                    radius={"md"}
                    label="Shareholder 1 POA Type"
                    name="shareholder_1_poaType"
                    placeholder="Enter Shareholder 1 POA Type"
                    value={corporateForm.shareholder_1_poaType}
                    onChange={handleCorporateInputChange}
                  />
                  <FileInput
                    label="Shareholder 1 POA File"
                    rightSection={iconBox}
                    radius={"md"}
                    accept="image/png,image/jpeg, image/jpg application/pdf"
                    placeholder="Upload a photo, PNG or JPEG; Max size: 500kb"
                    onChange={(file) =>
                      handleCorporateFileChange("shareholder_1_poaFile", file)
                    }
                  />
                  <Button
                    type="submit"
                    variant="gradient"
                    gradient={{ from: "violet", to: "cyan", deg: 90 }}
                    radius={"xl"}
                    size="lg"
                    fw={600}
                    fz={12}
                    my={"lg"}
                    fullWidth
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

export default TabsSection;
