export const serializeFile = async (file: File) => {
  const base64 = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

  return {
    id: crypto.randomUUID(),
    base64,
    filename: file.name,
    filetype: file.type,
    filesize: file.size,
  };
};
