"use client";
import { ItemModal } from "@/components/ItemModal";
import { useQuery } from "@apollo/client";
import {
  Box,
  Button,
  Grid,
  GridItem,
  Heading,
  Image,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { QUERY_CHARACTERS } from "../lib/rickymorty.gql";

const InformationPage = () => {
  const sp = useSearchParams();
  const router = useRouter();
  const page = Math.max(parseInt(sp.get("page") || "1", 10), 1);

  const { data, loading, error } = useQuery(QUERY_CHARACTERS, {
    variables: { page },
  });

  interface Character {
    id: number;
    name: string;
    species: string;
    status: string;
    image: string;
    gender: string; // Added gender property
  }

  const [active, setActive] = useState<Character | null>(null);

  // ✅ v3: useDisclosure 返回 { open, onOpen, onClose }
  const { open, onOpen, onClose } = useDisclosure();

  const openItem = (item: Character) => {
    setActive(item);
    onOpen();
  };

  if (loading) return <Spinner mt={8} />;
  if (error) return <Text color="red.400">Failed to load.</Text>;

  const list = data?.characters?.results ?? [];
  const info = data?.characters?.info;

  return (
    <Box p={4}>
      <Heading size="lg" mb={4}>
        Information
      </Heading>

      <Grid templateColumns={{ base: "1fr 1fr", md: "repeat(4, 1fr)" }} gap={4}>
        {list.map((c: Character) => (
          <GridItem key={c.id}>
            <Box
              as="button"
              onClick={() => openItem(c)}
              w="100%"
              textAlign="left"
            >
              <Image
                src={c.image}
                alt={c.name}
                rounded="md"
                w="100%"
                h="200px"
                style={{ objectFit: "cover" }}
              />
              <Heading size="sm" mt={2}>
                {c.name}
              </Heading>
              <Text fontSize="sm" color="gray.500">
                {c.species} · {c.status}
              </Text>
            </Box>
          </GridItem>
        ))}
      </Grid>

      <Box mt={6} display="flex" gap={8}>
        <Button
          onClick={() => router.push(`?page=${Math.max(1, info?.prev ?? 1)}`)}
          disabled={!info?.prev}
          variant="outline"
        >
          Prev
        </Button>
        <Button
          onClick={() => router.push(`?page=${info?.next ?? page}`)}
          disabled={!info?.next}
          colorPalette="blue" // v3 推荐 colorPalette（colorScheme 也可）
        >
          Next
        </Button>
        <Text ml={3}>
          Page {page} / {info?.pages ?? "?"}
        </Text>
      </Box>

      <ItemModal isOpen={open} onClose={onClose} item={active} />
    </Box>
  );
};

export default InformationPage;
