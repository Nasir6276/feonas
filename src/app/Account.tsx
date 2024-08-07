import useNotification from "@/lib/hooks/useNotification";
import withLayout from "@/layouts/appLayout";
import CardContainer from "@/views/Card";
import CardDesign from "@/views/Card";
import ShowToast from "@/views/showToast";
import {
  Button,
  Center,
  Container,
  FileInput,
  Flex,
  Group,
  Input,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import axios from "axios";

import { IoMdCloudUpload } from "react-icons/io";
import Link from "next/link";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

async function Home() {
  const iconBox = (
    <Group justify="center" bg={"#F3F2F2"} w={"105px"} h={"100%"}>
      <IoMdCloudUpload
        style={{ width: "20px", height: "20px", color: "#195874" }}
      />
    </Group>
  );
  return (
    <Container size={1500}>
      <Flex align={"center"} justify={"center"} h={"100vh"}>
        <Stack p={"32px"} bg={"#ffffff"} w={"550px"} gap={"xs"}>
          <Text fw={700} fz={24} c={"#000000"} ta={"center"}>
            Create Your Account
          </Text>
          <Text fw={500} fz={16} c={"#000000"} ta={"center"}>
            We recommend you use your work email.
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
          <TextInput
            radius="xs"
            label="ID Type"
            placeholder="Enter ID type"
            required
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
          <TextInput
            radius="xs"
            label="POA Type"
            placeholder="Enter POA type"
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
    </Container>
  );
}

export default withLayout(Home);
