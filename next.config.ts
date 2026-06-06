import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/lib/i18n/request.ts");

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Keep pino out of the client bundle; run it as a native node module.
  serverExternalPackages: ["pino"],
};

export default withNextIntl(nextConfig);
