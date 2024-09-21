"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import routes from "@/routes";
import { isLoggedIn } from "@/services/auth";

interface RouteWrapperProps {
  children: React.ReactNode;
}

export default function RouteWrapper({ children }: RouteWrapperProps) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const currentRoute = Object.values(routes).find(
      (route) => route.path === pathname
    );

    if (currentRoute?.protected && !isLoggedIn()) {
      router.push(routes.login.path);
    }
  }, [pathname, router]);

  return <>{children}</>;
}
