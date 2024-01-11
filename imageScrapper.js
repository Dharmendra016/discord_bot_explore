const puppeteer = require('puppeteer');

async function scrapeGoogleImages(query, numberOfImages) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate to Google Images and perform a search
  await page.goto(`https://www.google.com/search?q=${encodeURIComponent(query)}&tbm=isch`);

  // Wait for the images to load. You might need to adjust the timeout based on the website.
  await page.waitForTimeout(2000);

  // Extract image URLs
  const imageUrls = await page.evaluate((numberOfImages) => {
    const images = document.querySelectorAll('.rg_i.Q4LuWd[src^="http"]');
    const urls = [];

    images.forEach((img, index) => {
      if (index < numberOfImages) {
        const src = img.getAttribute('src');
        if (src && src.startsWith('http')) {
          urls.push(src);
        }
      }
    });

    return urls;
  }, numberOfImages);

  await browser.close();

  return imageUrls;
}

// Example usage: node imageScraper.js football 5
// Uncomment the following lines if you want to run the script from the command line
// const query = process.argv[2];
// const numberOfImages = parseInt(process.argv[3]) || 5;
// scrapeImages(query, numberOfImages);

// Export the function to use it in other modules
module.exports = scrapeGoogleImages;
