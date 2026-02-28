import * as z from "zod";

const buildingTypeEnum = {
    residential: "residential",
    commercial: "commercial",
    industrial: "industrial"
};

const buildingStatusEnum = {
    healthy: "healthy",
    maintenance: "maintenance",
    alert: "alert"
}

export const buildingSchema = z.object({
    name: z.string(),
    address: z.string(),
    type: z.enum(buildingTypeEnum).default("residential"),
    total_units: z.number(),
    status: z.enum(buildingStatusEnum).default("healthy"),
    image_url: z.string(),
})