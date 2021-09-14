const puppeteer = require('puppeteer');

module.exports.pdfParser = async (event) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  if (!body || body === '') {
    return {
      statusCode: 400,
      body: {
        error: {
          message: 'Empty body'
        }
      }
    };
  }

  await page.setContent(event.body);
  const buffer = await page.pdf({
    format: 'Legal'
  });

  await browser.close();

  return {
    statusCode: 200,
    body: {
      content: buffer.toString('base64')
    }
  };
};
