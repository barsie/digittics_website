export interface LinkProps {
    id: number;
    text: string;
    href: string;
    isExternal: boolean;
}

export interface ImageProps {
    id: number;
    documentId: string;
    url: string;
    alternativeText: string
}

export interface LogoProps {
    logoText: string;
    logoDescription?: string;
    image: ImageProps
}

export interface FeatureProps {
    id: number;
    iconName: string;
    iconColor: "primary" | "secondary";
    iconSize: number;
    text: string;
    description: string;
}

type ComponentType = "blocks.hero-section" | "blocks.info-block" | "blocks.partner-section" | "blocks.feature-section";

interface Base< 
    T extends ComponentType,
    D extends object = Record<string, unknown>
> {
    id: number;
    __component?: T;
    createdAt?: string;
    updatedAt?: string;
    publishedAt?: string;
    data?: D;
}

export type Block = HeroSectionProps | InfoBlockProps | PartnerSectionProps | FeatureSectionProps;

export interface HeroSectionProps extends Base<"blocks.hero-section">{
    theme: "primary" | "secondary"
    heading: string;
    description: string;
    image: ImageProps;
    cta?: LinkProps;
    logo?: LogoProps;
    author: string;
    darken: boolean;
}

export interface InfoBlockProps extends Base<"blocks.info-block">{
    theme: "primary" | "secondary"
    reversed?: boolean
    headline: string
    content: string
    image: ImageProps
    cta?: LinkProps
}

export interface PartnerSectionProps extends Base<"blocks.partner-section">{
    text: string;
    partners: LogoProps[];
}

export interface FeatureSectionProps extends Base<"blocks.feature-section">{
    heading?: string;
    feature: FeatureProps[];
}