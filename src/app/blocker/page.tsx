import { useUserProfile } from "@/contexts/user-profile";
import { BlockerModal } from "@/shared/components/ui/BlockerModal";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const BlockerPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { profile, ready, save } = useUserProfile();

  useEffect(() => {
    if (!ready) return;
    if (profile && pathname !== "/information") {
      router.replace("/information");
    }
  }, [ready, profile, pathname, router]);

  if (!ready || profile) return null;

  return <BlockerModal onSubmit={save} />;
};

export default BlockerPage;
