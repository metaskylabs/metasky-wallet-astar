import QRCode from 'qrcode';

export const generateQR = async (content: string): Promise<string> => {
  try {
    const url = await QRCode.toDataURL(content, { version: 5 });
    return url;
  } catch (err) {
    throw err;
  }
};
