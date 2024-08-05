import useNotification from "@/hooks/useNotification";
import withLayout from "@/layouts/appLayout";
import CardContainer from "@/views/Card";
import CardDesign from "@/views/Card";
import ShowToast from "@/views/showToast";
import { Center, Container, SimpleGrid, Text, Title } from "@mantine/core";
import axios from "axios";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

async function Home() {
  const posts = await axios.get("https://jsonplaceholder.typicode.com/posts");

  return (
    <Container size={1200}>
      <Title my={30}>Welcome to Server Side Rendering</Title>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }}>
        {posts.data.map((post: Post, index: number) => (
          <CardDesign key={index} {...post} />
        ))}
      </SimpleGrid>
    </Container>
  );
}

export default withLayout(Home);
