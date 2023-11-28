import QRCode from 'qrcode';

export const generateQR = async (
  content: string,
  version = 5,
): Promise<string> => {
  try {
    const url = await QRCode.toDataURL(content, { version });
    return url;
  } catch (err) {
    throw err;
  }
};
