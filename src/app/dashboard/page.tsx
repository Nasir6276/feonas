"use client";

import withLayout from "@/layouts/appLayout";
import { Box, Container, Stack, Tabs, Title } from "@mantine/core";
import React from "react";
import TabsSection from "./tabs";
import RequestTab from "./requestTab";

const Dashboard: React.FC = () => {
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
              <RequestTab />
            </Tabs.Panel>
          </Tabs>
        </Box>
      </Stack>
    </Container>
  );
};

export default withLayout(Dashboard);
