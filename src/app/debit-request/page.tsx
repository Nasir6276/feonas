import withLayout from "@/layouts/appLayout";
import {
  Button,
  Container,
  Flex,
  Group,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import Link from "next/link";
import React from "react";

const DebitRequest = () => {
  return (
    <Container size={1500}>
      <Flex align={"center"} justify={"center"} h={"100vh"}>
        <Stack p={"32px"} bg={"#ffffff"} w={"550px"} gap={"xs"}>
          <Text fw={700} fz={24} c={"#000000"} ta={"center"}>
            Request Payout
          </Text>
          <Text fw={500} fz={16} c={"#000000"} ta={"center"}>
            Input the neccessary account details
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
            <TextInput radius="xs" label="Reason" placeholder="Enter Reason" />
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
    </Container>
  );
};

export default withLayout(DebitRequest);
