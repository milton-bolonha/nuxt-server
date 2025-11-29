import courtProceduresData from "../../data/court-procedures.json";

export default defineEventHandler(async (event) => {
    validateApiAccess(event, "resources/court-procedure");

    try {
        return courtProceduresData.courtProcedures.map((p) => p.description);
    } catch (error) {
        console.error("Error fetching court procedures:", error);
        throw createError({
            statusCode: 500,
            message: "Failed to fetch court procedures",
        });
    }
});

