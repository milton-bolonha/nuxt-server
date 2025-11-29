import filesData from "../../data/files.json";

export default defineEventHandler(async (event) => {
    validateApiAccess(event, "resources/files");

    try {
        return filesData.files.map((file) => ({
            title: file.title,
            link: file.fileUrl,
        }));
    } catch (error) {
        console.error("Error fetching files:", error);
        throw createError({
            statusCode: 500,
            message: "Failed to fetch files",
        });
    }
});

