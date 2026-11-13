import type { Block } from "@/types";

import { HeroSection } from "./Blocks/HeroSection";
import InfoBlock from "./Blocks/InfoBlock";
import PartnerSection from "./Blocks/PartnerSection";
import ServiceSection from "./Blocks/FeatureSection";
import { FeatureArticle } from "./Blocks/FeatureArticle";
import { Subscribe } from "./Blocks/Subscribe";
import { Heading } from "./Blocks/Heading";
import Paragraph from "./Blocks/Paragraph";
import ParagraphWithImage from "./Blocks/ParagraphWithImage";
import FullImage from "./Blocks/FullImage";

function blockRederrer( block: Block, index: number){
    switch(block.__component){
        case "blocks.hero-section":
            return <HeroSection {...block} key={index}/>
        case "blocks.feature-section":
            return <ServiceSection {...block} key={index}/>
        case "blocks.partner-section":
            return <PartnerSection {...block} key={index}/>
        case "blocks.info-block":
            return <InfoBlock {...block} key={index}/>
        case "blocks.feature-article":
            return <FeatureArticle {...block} key={index}/>
        case "blocks.subscribe":
            return <Subscribe {...block} key={index}/>
        case "blocks.heading":
            return <Heading {...block} key={index}/>
        case "blocks.paragraph":
            return <Paragraph {...block} key={index}/>
        case "blocks.paragraph-with-image":
            return <ParagraphWithImage {...block} key={index}/>
        case "blocks.full-image":
            return <FullImage {...block} key={index}/>
        default:
            return null;
    }
}

export function BlockRenderer({blocks}: {blocks: Block[]}){
    return blocks.map((block, index) => blockRederrer(block, index))
}