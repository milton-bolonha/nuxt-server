import vipsData from "../../data/vips.json";

export default defineEventHandler(async (event) => {
    validateApiAccess(event, "resources/vips");

    try {
        return vipsData.vips;
    } catch (error) {
        console.error("Error fetching VIPs:", error);
        throw createError({
            statusCode: 500,
            message: "Failed to fetch VIPs",
        });
    }
});

