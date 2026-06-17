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

export interface ArticleProps {
    id: number;
    documentId: string;
    title: string;
    description: string;
    slug: string;
    image: ImageProps;
    author: string;
    authorAvatar: string;
    authorOccupation: string;
    featured: boolean;
    publishedAt: string;
    createdAt: string;
    updatedAt: string;
}



export interface CardProps {
    documentId: string;
    title: string;
    description: string;
    slug: string;
    image: ImageProps;
    price?: number;
    startDate?: string;
    createdAt: string;
    basePath: string
}

type ComponentType = 
    "blocks.hero-section" 
    | "blocks.info-block" 
    | "blocks.partner-section" 
    | "blocks.feature-section" 
    | "blocks.feature-article" 
    | "blocks.subscribe"
    | "blocks.heading"
    | "blocks.paragraph-with-image"
    | "blocks.paragraph"
    | "blocks.full-image";

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

export type Block = 
HeroSectionProps 
| InfoBlockProps 
| PartnerSectionProps 
| FeatureSectionProps 
| FeatureArticleProps 
| SubscribeProps
| HeadingProps
| ParagraphWithImageProps
| ParagraphProps
| FullImageProps

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

export interface FeatureArticleProps extends Base<"blocks.feature-article">{
    headline: string;
    link: LinkProps;
    summary: string;
    image: ImageProps
}

export interface SubscribeProps extends Base<"blocks.subscribe">{
    headline: string;
    content: string;
    placeholder: string;
    buttonText: string;
}

export interface HeadingProps extends Base<"blocks.heading"> {
    heading: string;
    linkId: string;
}

export interface ParagraphProps extends Base<"blocks.paragraph"> {
    content: string;
}

export interface ParagraphWithImageProps extends Base<"blocks.paragraph-with-image">{
    content: string;
    image: ImageProps;
    reversed?: boolean;
    imageLandscape?: boolean;
}

export interface FullImageProps extends Base<"blocks.full-image">{
    id: number;
    image: ImageProps;
    __component: "blocks.full-image";
}