"use client";

import { Dialog, Image, Portal, Text, VStack } from "@chakra-ui/react";

type Item = {
  name: string;
  image: string;
  status: string;
  species: string;
  gender: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  item: Item | null;
};

export const ItemModal = ({ isOpen, onClose, item }: Props) => {
  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(e) => {
        if (!e.open) onClose();
      }}
      placement="center"
      closeOnInteractOutside={true}
    >
      <Portal>
        {/* ✅ 纯黑遮罩（非虚化） */}
        <Dialog.Backdrop bg="blackAlpha.800" />{" "}
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{item?.name ?? "Details"}</Dialog.Title>
              <Dialog.CloseTrigger />
            </Dialog.Header>
            <Dialog.Body>
              {item ? (
                <VStack alignItems="stretch" gap="3">
                  <Image src={item.image} alt={item.name} rounded="md" />
                  <Text>Status: {item.status}</Text>
                  <Text>Species: {item.species}</Text>
                  <Text>Gender: {item.gender}</Text>
                </VStack>
              ) : (
                <Text fontSize="sm" color="fg.muted">
                  Loading…
                </Text>
              )}
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
