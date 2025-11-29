// Dados estáticos da Constituição (copiados do seed para evitar problemas de resolução)
const constitutionArticles = [
    {
        number: 1,
        title: "Article I",
        content: "",
        summary:
            "This article creates the legislative branch, dividing it into two chambers. It lays out qualifications for office, how bills become laws, the impeachment process, and powers vested in Congress.",
    },
    {
        number: 2,
        title: "Article II",
        content: "",
        summary:
            "This article defines the executive branch, with a President elected for a six-month term. It details election process, eligibility, succession protocols, and Presidential powers including military command, treaty negotiation, and appointments.",
    },
    {
        number: 3,
        title: "Article III",
        content: "",
        summary:
            "This article establishes the judicial branch, granting powers to a supreme Court and lower courts. It gives federal courts authority over constitutional issues, foreign affairs, and inter-municipal conflicts.",
    },
    {
        number: 4,
        title: "Article IV",
        content: "",
        summary:
            "This article sets the framework for the relationship between federal government and municipalities. It guarantees mutual recognition of public records and rights across all municipalities.",
    },
    {
        number: 5,
        title: "Article V",
        content: "",
        summary:
            "This article outlines how constitutional amendments are proposed and adopted. Congress initiates changes with two-thirds vote, requiring Supreme Court review and approval.",
    },
];

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
