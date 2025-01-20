/** @type {import('next').NextConfig} */

const useBasePath = process.env.NEXT_PUBLIC_USEBASEPATH === "true" //grab the USEBASEPATH variable that was declared when “pnpm next build” was called

const basePathToUse = "/sam_browser_test_bare_next_js/out" //No trailing slash. Change to Github repo name if using Github pages.

const nextConfig = {
  basePath: useBasePath ? basePathToUse : '',
  assetPrefix: useBasePath ? basePathToUse : '',
  trailingSlash: true,
  output: "export" //tells nextjs to build as static files in "out" folder
                   //alternatively, just run "pnpm next export" after "pnpm next build"
};

export default nextConfig;
