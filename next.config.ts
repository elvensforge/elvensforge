import type { NextConfig } from "next";

// The existing Deploy Now workflow supplies this artifact directory.
const ionosBuild =
  process.env.GITHUB_ACTIONS === "true" &&
  process.env.DEPLOYMENT_FOLDER === "./out";

const nextConfig: NextConfig = {
  // Each build has a root layout. Clerk's server actions require the dynamic layout.
  pageExtensions: ionosBuild ? ["tsx", "static.tsx"] : ["ts", "tsx", "dynamic.tsx"],
  ...(ionosBuild && { output: "export" }),
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
