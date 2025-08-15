// components/UserGate.tsx (v3版本)
"use client";

import { getUser, setUser, UserProfile } from "@/lib/user-store";
import {
  Button,
  Dialog,
  Field,
  Input,
  Portal,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

type Props = { isOpen: boolean; onClose: () => void; onUnlocked: () => void };

export const UserGate = ({ isOpen, onClose, onUnlocked }: Props) => {
  const [form, setForm] = useState<UserProfile>({ username: "", jobTitle: "" });
  const [touched, setTouched] = useState({ username: false, jobTitle: false });
  const initialRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const existing = getUser();
    if (existing) setForm(existing);
  }, []);

  const validUsername = form.username.trim().length > 0;
  const validJobTitle = form.jobTitle.trim().length > 0;
  const canSubmit = validUsername && validJobTitle;

  const onSubmit = () => {
    if (!canSubmit) {
      setTouched({ username: true, jobTitle: true });
      return;
    }
    setUser({ username: form.username.trim(), jobTitle: form.jobTitle.trim() });
    onClose();
    onUnlocked();
  };

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(e) => {
        if (!e.open) onClose();
      }}
      placement="center"
      closeOnInteractOutside={false}
      initialFocusEl={() => initialRef.current}
    >
      <Portal>
        <Dialog.Backdrop
          bg="blackAlpha.800" // 纯黑遮罩
          backdropFilter="none" // Chakra v3 style prop：禁用模糊
          css={{ WebkitBackdropFilter: "none" }} // Safari 兜底
        />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>User profile required</Dialog.Title>
              <Dialog.CloseTrigger />
            </Dialog.Header>
            <Dialog.Body>
              <VStack alignItems="stretch" gap="4">
                <Text id="gate-desc" fontSize="sm" color="fg.muted">
                  Please enter your username and job title to continue.
                </Text>
                <Field.Root
                  required
                  invalid={touched.username && !validUsername}
                >
                  <Field.Label>
                    Username <Field.RequiredIndicator />
                  </Field.Label>
                  <Input
                    ref={initialRef}
                    value={form.username}
                    onChange={(e) =>
                      setForm((s) => ({ ...s, username: e.target.value }))
                    }
                  />
                  {!validUsername && touched.username && (
                    <Field.ErrorText>Username is required.</Field.ErrorText>
                  )}
                </Field.Root>
                <Field.Root
                  required
                  invalid={touched.jobTitle && !validJobTitle}
                >
                  <Field.Label>
                    Job Title <Field.RequiredIndicator />
                  </Field.Label>
                  <Input
                    value={form.jobTitle}
                    onChange={(e) =>
                      setForm((s) => ({ ...s, jobTitle: e.target.value }))
                    }
                  />
                  {!validJobTitle && touched.jobTitle && (
                    <Field.ErrorText>Job title is required.</Field.ErrorText>
                  )}
                </Field.Root>
              </VStack>
            </Dialog.Body>
            <Dialog.Footer gap="2">
              <Button
                variant="outline"
                onClick={() => setForm({ username: "", jobTitle: "" })}
              >
                Clear
              </Button>
              <Button
                colorPalette="blue"
                onClick={onSubmit}
                disabled={!canSubmit}
              >
                Save & Continue
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
