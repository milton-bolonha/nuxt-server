// Importar dados estáticos da pasta server/data
import { constitutionArticles } from "../data/constitution";

export default defineEventHandler(async (event) => {
    console.log("🔍 [DEBUG] Constitution API called (static data)");

    try {
        console.log("🔐 [DEBUG] Validating API access...");
        validateApiAccess(event, "constitution/constitution");
        console.log("✅ [DEBUG] API access validated");

        // Formatar dados para o formato esperado pela API
        const result = constitutionArticles.map((article) => ({
            title: article.title,
            description: article.summary,
            hasArticle: true,
            key: `article${article.number}`,
        }));

        console.log(
            "📊 [DEBUG] Returning",
            result.length,
            "constitution articles"
        );
        return result;
    } catch (error) {
        console.error("❌ [ERROR] Constitution API failed:", error);
        throw createError({
            statusCode: 500,
            message: "Failed to fetch constitution articles",
            cause: error.message,
        });
    }
});
