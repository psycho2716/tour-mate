import { TranslationButton } from "@/components/tourist/translation-button";
import React from "react";

const TouristLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <TranslationButton />
            {children}
        </div>
    );
};

export default TouristLayout;
