

// // src/app/api/uploadthing/core.ts
// import { createUploadthing, type FileRouter } from "uploadthing/next";
// import { getAuth } from "@clerk/nextjs/server";
// import type { NextRequest } from "next/server";

// const f = createUploadthing();

// // Helper to get auth from request
// const auth = (req: NextRequest) => {
//   try {
//     const { userId } = getAuth(req);
//     return { userId: userId || "anonymous" };
//   } catch (error) {
//     return { userId: "anonymous" };
//   }
// };

// export const ourFileRouter = {
//   applicationDocuments: f({
//     pdf: { maxFileSize: "4MB" },
//     "application/msword": { maxFileSize: "4MB" },
//     "application/vnd.openxmlformats-officedocument.wordprocessingml.document": { maxFileSize: "4MB" },
//   })
//     .middleware(async ({ req }) => {
//       const user = await auth(req as NextRequest);
//       return { 
//         userId: user.userId,
//         uploadTime: new Date().toISOString()
//       };
//     })
//     .onUploadComplete(async ({ metadata, file }) => {
//       console.log("Upload complete for user:", metadata.userId);
//       console.log("File URL:", file.url);
//       return { 
//         uploadedBy: metadata.userId,
//         url: file.url,
//         key: file.key,
//         name: file.name
//       };
//     }),
// } satisfies FileRouter;

// export type OurFileRouter = typeof ourFileRouter;


// src/app/api/uploadthing/core.ts
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { getAuth } from "@clerk/nextjs/server";
import type { NextRequest } from "next/server";

const f = createUploadthing();

const auth = (req: NextRequest) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) throw new Error("Unauthorized");
    return { userId };
  } catch (error) {
    throw new Error("Authentication required");
  }
};

export const ourFileRouter = {
  applicationDocuments: f({
    pdf: { maxFileSize: "4MB" },
    "application/msword": { maxFileSize: "4MB" },
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": { maxFileSize: "4MB" },
  })
    .middleware(async ({ req }) => {
      const user = await auth(req as NextRequest);
      return { 
        userId: user.userId,
        timestamp: Date.now()
      };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // Log upload for monitoring
      console.log(`📁 File uploaded by user ${metadata.userId}: ${file.name} (${file.size} bytes)`);
      
      return { 
        userId: metadata.userId,
        url: file.url,
        key: file.key,
        name: file.name,
        size: file.size,
        type: file.type
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;