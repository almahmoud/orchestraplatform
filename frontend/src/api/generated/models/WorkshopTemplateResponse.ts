/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { WorkshopResources } from './WorkshopResources';
import type { WorkshopStorage } from './WorkshopStorage';
/**
 * Response schema for a workshop template.
 */
export type WorkshopTemplateResponse = {
    id: string;
    name: string;
    slug: string;
    description?: (string | null);
    image: string;
    defaultDuration: string;
    port?: number;
    env?: Record<string, string>;
    args?: Array<string>;
    tier?: WorkshopTemplateResponse.tier;
    resources: WorkshopResources;
    storage?: (WorkshopStorage | null);
    tags?: Array<'latest' | 'archived' | 'bioconductor' | 'jupyter' | 'python' | 'rstudio' | 'bioc2026' | 'eurobioc2025' | 'mig2025' | 'gbcc2025' | 'biocasia2024' | 'eurobioc2024' | 'bioc2024' | 'cbrc2024' | 'abacbs2023' | 'bbcc2023' | 'biocasia2023' | 'eurobioc2023' | 'monashbioinformatics2023' | 'iscb2023' | 'bioc2023' | 'ismb2023' | 'xmeetingbsb2023' | 'artnet2023' | 'smorgasbord2023' | 'cdnmws'>;
    url?: (string | null);
    sourceUrl?: (string | null);
    submittedBy?: (string | null);
    isActive: boolean;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
};
export namespace WorkshopTemplateResponse {
    export enum tier {
        SMALL = 'small',
        LARGE = 'large',
    }
}

