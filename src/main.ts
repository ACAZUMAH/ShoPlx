import { config } from "dotenv";

const main = async () => {
    config();
    const server = await import("./servers/app");
    server.default();
}

main().catch((error) => {
    console.error('Unable to start server',error);
    process.exit(1);
});
