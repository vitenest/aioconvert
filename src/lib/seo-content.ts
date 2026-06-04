export function generateSeoContent(category: string, from?: string, to?: string) {
  const cName = category.charAt(0).toUpperCase() + category.slice(1);
  const title = from && to 
    ? `Convert ${from.toUpperCase()} to ${to.toUpperCase()} Free Online`
    : `Advanced ${cName} Free Online`;
    
  const description = from && to
    ? `Easily convert ${from.toUpperCase()} files to ${to.toUpperCase()} format with our free, secure, and fast online converter. No registration required.`
    : `The best free online ${category} converter. Supports all major formats with advanced processing and automatic file deletion for your privacy.`;
    
  const about = from && to 
    ? `Our ${from.toUpperCase()} to ${to.toUpperCase()} converter is a highly advanced, browser-based tool that allows you to seamlessly transform your files. Whether you are dealing with a single file or a bulk batch of ${from.toUpperCase()}s, our powerful servers process them into high-quality ${to.toUpperCase()}s in seconds. Everything is handled securely, and files are automatically deleted after 30 minutes.`
    : `Welcome to the ultimate ${cName}. We support an extensive array of file formats. Drop your files into the workspace above to get started instantly without installing any software.`;

  const features = [
    `Lightning Fast Conversions: Get your ${to ? to.toUpperCase() : 'files'} in seconds.`,
    `100% Free & Secure: We never share your data.`,
    `Auto-Deletion: Files are erased after 30 minutes.`,
    `Mobile Friendly: Convert on any device.`
  ];

  const faqs = [
    {
      q: `How do I convert ${from ? from.toUpperCase() : 'files'} to ${to ? to.toUpperCase() : 'other formats'}?`,
      a: `Simply drag and drop your ${from ? from.toUpperCase() : 'files'} into the upload zone above, select ${to ? to.toUpperCase() : 'your target format'} from the dropdown, and click "Process All Files".`
    },
    {
      q: `Is it safe to use this converter?`,
      a: `Yes! All files are transmitted via secure HTTPS connections and are permanently deleted from our servers 30 minutes after conversion.`
    },
    {
      q: `Can I convert multiple files at once?`,
      a: `Absolutely. Our advanced batch processing engine allows you to upload and convert dozens of files simultaneously.`
    }
  ];

  return { title, description, about, features, faqs };
}
