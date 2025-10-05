// // src/lib/storage.ts - Updated with correct UTApi usage
// import { UTApi } from "uploadthing/server";

// export const utapi = new UTApi();

// export async function uploadFile(
//   base64Data: string, 
//   fileName: string, 
//   fileType: string
// ): Promise<string> {
//   try {
//     // Convert base64 to buffer
//     const buffer = Buffer.from(base64Data.split(',')[1], 'base64');
    
//     // Convert buffer to blob
//     const blob = new Blob([buffer], { type: fileType });
//     const file = new File([blob], fileName);

//     // Upload to Uploadthing
//     const response = await utapi.uploadFiles(file);
    
//     if (!response.data?.url) {
//       throw new Error('Upload failed');
//     }

//     return response.data.url;
//   } catch (error) {
//     console.error('File upload error:', error);
//     throw new Error('Erreur lors du téléchargement du fichier');
//   }
// }

// export async function deleteFile(fileUrl: string): Promise<void> {
//   try {
//     // Extract file key from URL
//     const fileKey = fileUrl.split('/f/').pop();
//     if (fileKey) {
//       await utapi.deleteFiles(fileKey);
//     }
//   } catch (error) {
//     console.error('File deletion error:', error);
//   }
// }



// src/lib/storage.ts
import { UTApi } from "uploadthing/server";

export const utapi = new UTApi();

// New approach using Uploadthing's direct upload
export async function uploadFileViaUT(
  file: File
): Promise<{ url: string; key: string }> {
  try {
    const response = await utapi.uploadFiles(file);
    
    if (!response.data) {
      throw new Error('Upload failed: ' + response.error?.message);
    }

    return {
      url: response.data.ufsUrl,
      key: response.data.key
    };
  } catch (error) {
    console.error('File upload error:', error);
    throw new Error('Erreur lors du téléchargement du fichier: ' + (error as Error).message);
  }
}

export async function deleteFile(fileKey: string): Promise<void> {
  try {
    await utapi.deleteFiles(fileKey);
  } catch (error) {
    console.error('File deletion error:', error);
  }
}