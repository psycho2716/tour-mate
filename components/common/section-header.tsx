import React from "react";

const SectionHeader = ({
    title,
    subTitle,
    description
}: {
    title: string;
    subTitle: string;
    description: string;
}) => {
    return (
        <div className="text-center mb-16 space-y-4">
            <div className="inline-block px-7 py-1.5 bg-black text-white rounded-md text-sm font-medium mb-4">
                {title}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">{subTitle}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{description}</p>
        </div>
    );
};

export default SectionHeader;
