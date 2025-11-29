import definitionsData from "../../data/definitions.json";

export default defineEventHandler(async (event) => {
    validateApiAccess(event, "resources/definitions");

    try {
        return definitionsData.definitions;
    } catch (error) {
        console.error("Error fetching definitions:", error);
        throw createError({
            statusCode: 500,
            message: "Failed to fetch definitions",
        });
    }
});

