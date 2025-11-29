// Importar dados estáticos da pasta server/data
import constitutionArticlesData from "../../data/constitution-articles.json";

export default defineEventHandler(async (event) => {
    console.log("🔍 [DEBUG] Constitution Articles API called (static data)");
    
    try {
        console.log("🔐 [DEBUG] Validating API access...");
        validateApiAccess(event, 'constitution/articles');
        console.log("✅ [DEBUG] API access validated");

    const key = getRouterParam(event, 'key');

        if (!key) return [];

        if (!Object.hasOwn(constitutionArticlesData.articles, key)) return [];

        console.log(
            "📊 [DEBUG] Returning article:",
            key
        );
        return constitutionArticlesData.articles[key];
    } catch (error) {
        console.error("❌ [ERROR] Constitution Articles API failed:", error);
        throw createError({
            statusCode: 500,
            statusMessage: "Failed to fetch constitution article",
            cause: error.message,
        });
    }
})