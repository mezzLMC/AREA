import React from "react";
import { RoseGlow, VioletGlow } from "@/app/components/bgGlow";
import Menu from "@/app/components/menu";

export default function ApplicationsPage() {
    return (
        <main data-testid="applications-page">
            <VioletGlow data-testid="violet-glow" />
            <RoseGlow data-testid="rose-glow" />
            <Menu data-testid="menu" />
            <div>
                <h1 data-testid="applications-title">Applications</h1>
            </div>
        </main>
    )
}
