"use client";

import { ReactNode } from "react";
import MainLayout from "@/components/Layout/MainLayout";

interface MapLayoutProps {
    children: ReactNode;
}

export default function MapLayout({ children }: MapLayoutProps) {
    return <MainLayout>{children}</MainLayout>;
}