// import {
//     readFile
// } from "fs/promises";
// import path from "path";

// export async function loadJSON(filePath) {
//     try {
//         const fullPath = path.resolve(filePath); // แปลงเป็น absolute path
//         const data = await readFile(fullPath, "utf-8");
//         return JSON.parse(data);
//     } catch (error) {
//         console.error("Error loading JSON:", error);
//         throw error;
//     }
// }

// ตัวอย่างใน React
export async function loadJSON(filePath) {
    const res = await fetch(filePath);
    const data = await res.json();
    return data;
}