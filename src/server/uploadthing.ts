import { UTApi, createUploadthing } from "uploadthing/server";
import { auth } from "./auth";
import type { FileRouter } from "uploadthing/server";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const uploadRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({
    image: {
      maxFileSize: "2MB",
      maxFileCount: 1,
    },
  })
    // Set permissions and file types for this FileRoute
    .middleware(() => {
      // This code runs on your server before upload
      auth();

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return {};
    })
    .onUploadComplete(({ file }) => {
      return {
        uploadedBy: "suzy",
        fileId: file.key,
        fileName: file.name,
      };
    }),
} satisfies FileRouter;

export type UploadRouter = typeof uploadRouter;

export const utapi = new UTApi({
  token: process.env.UPLOADTHING_API_KEY!,
  defaultKeyType: "fileKey",
});

