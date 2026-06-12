import type { Block } from "@/types";

import { HeroSection } from "./Blocks/HeroSection";
import InfoBlock from "./Blocks/InfoBlock";
import PartnerSection from "./Blocks/PartnerSection";
import FeatureSection from "./Blocks/FeatureSection";

function blockRederrer( block: Block, index: number){
    switch(block.__component){
        case "blocks.hero-section":
            return <HeroSection {...block} key={index}/>
        case "blocks.partner-section":
            return <PartnerSection {...block} key={index}/>
        case "blocks.feature-section":
            return <FeatureSection {...block} key={index}/>
        case "blocks.info-block":
            return <InfoBlock {...block} key={index}/>
        default:
            return null;
    }
}

export function BlockRenderer({blocks}: {blocks: Block[]}){
    return blocks.map((block, index) => blockRederrer(block, index))
}