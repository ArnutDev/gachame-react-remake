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
    try {
        const res = await fetch(`${process.env.PUBLIC_URL}/${filePath}`);
        if (!res.ok) {
            throw new Error(`Failed to load JSON: ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        return data;
    } catch (err) {
        console.error(err);
        return null; // หรือ return [] / {} ตามที่ต้องการ
    }
}