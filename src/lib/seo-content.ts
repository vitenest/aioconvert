export function generateSeoContent(category: string, from?: string, to?: string) {
  const cName = category.charAt(0).toUpperCase() + category.slice(1);
  
  // High-volume keywords integration
  const toolName = from && to ? `${from.toUpperCase()} to ${to.toUpperCase()} Converter` : `${cName} Converter`;
  
  const title = from && to 
    ? `Best ${from.toUpperCase()} to ${to.toUpperCase()} Converter Free Online | High Quality & Fast`
    : `Free Online ${cName} Converter | Fast, Secure & High Quality`;
    
  const description = from && to
    ? `Convert ${from.toUpperCase()} to ${to.toUpperCase()} online for free. The ultimate high-quality ${from.toUpperCase()} to ${to.toUpperCase()} converter. Fast, secure, no registration required, and batch conversion supported.`
    : `The best free online ${category} converter. Convert files instantly in high quality. Supports all major formats with advanced processing and automatic file deletion for your privacy.`;
    
  const about = from && to 
    ? `Looking for the fastest and highest quality **${from.toUpperCase()} to ${to.toUpperCase()} converter**? Our advanced online tool allows you to seamlessly transform your files without losing quality. Whether you need to change a single file or perform bulk **${from.toUpperCase()} to ${to.toUpperCase()} batch conversion**, our servers process your requests instantly. Best of all, this **free ${from.toUpperCase()} to ${to.toUpperCase()} converter** operates entirely within your browser for maximum security, automatically deleting files after 30 minutes.`
    : `Welcome to the ultimate **${cName} Converter**. We support an extensive array of file formats, ensuring you can convert files to exactly what you need. Drop your files into the workspace above to get started instantly without installing any software. Enjoy unrestricted access to our **free online ${category} converter** with zero registration required.`;

  const features = [
    `High-Quality ${to ? to.toUpperCase() : 'File'} Output: Retain the original quality of your files during the conversion process.`,
    `Lightning Fast Conversions: Convert your ${from ? from.toUpperCase() : 'files'} to ${to ? to.toUpperCase() : 'desired formats'} in mere seconds.`,
    `100% Free & Secure: Bank-grade encryption ensures your data is protected. No hidden fees.`,
    `Auto-Deletion Privacy: All uploaded and converted files are permanently erased after 30 minutes.`,
    `Cross-Platform & Mobile Friendly: Use our converter on Windows, Mac, Linux, iOS, or Android.`
  ];

  const faqs = [
    {
      q: `How do I convert ${from ? from.toUpperCase() : 'files'} to ${to ? to.toUpperCase() : 'other formats'} for free?`,
      a: `Simply drag and drop your ${from ? from.toUpperCase() : 'files'} into the upload zone above. Select ${to ? to.toUpperCase() : 'your target format'} from the dropdown menu, and click "Process All Files". Your high-quality download will be ready in seconds.`
    },
    {
      q: `Is this ${toolName} safe and secure?`,
      a: `Yes! Security is our top priority. All files are transmitted via secure HTTPS (SSL) connections and are permanently deleted from our servers 30 minutes after conversion.`
    },
    {
      q: `Can I convert multiple ${from ? from.toUpperCase() : ''} files at once?`,
      a: `Absolutely. Our advanced batch processing engine allows you to upload and convert dozens of files simultaneously, saving you valuable time.`
    },
    {
      q: `Do I need to install any software to use this ${toolName}?`,
      a: `No, this is a 100% web-based application. You do not need to download or install any third-party software, extensions, or apps to convert your files.`
    }
  ];

  return { title, description, about, features, faqs };
}
