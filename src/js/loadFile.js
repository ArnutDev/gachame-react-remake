export async function loadJSON(filePath) {
    const res = await fetch(filePath);
    if (!res.ok) throw new Error("Failed to load " + filePath);
    return res.json();
}