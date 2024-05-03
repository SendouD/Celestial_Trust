const puppeteer = require('puppeteer');
const fs = require('fs');
const path=require('path');

async function generatePDFFromHTML(htmlContent, outputPath) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlContent);
    await page.pdf({ path: outputPath, format: 'A4' });

    await browser.close();
}
async function generatePDF(username,path){
    const html=`
    <html >
    <head>
        
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
            }
    
            .certificate {
                width: 800px;
                margin: 50px auto;
                background-color: #f5f5f5;
                border: 2px solid #ccc;
                padding: 20px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
    
            .certificate-header {
                text-align: center;
                margin-bottom: 20px;
            }
    
            .certificate-header h1 {
                font-size: 24px;
                color: #333;
                margin: 0;
            }
    
            .certificate-content {
                text-align: center;
            }
    
            .certificate-content p {
                font-size: 18px;
                color: #555;
            }
    
            .signature {
                margin-top: 50px;
            }
    
            .signature img {
                width: 200px;
            }
    
            .footer {
                margin-top: 50px;
                text-align: center;
                color: #888;
                font-size: 14px;
            }
        </style>
    </head>
    <body>
        <div class="certificate">
            <div class="certificate-header">
                <h1>Certificate of Appreciation</h1>
            </div>
            <div class="certificate-content">
                <p>This certificate is awarded to</p>
                <h2>${username}</h2>
                <p>for their invaluable contribution as a volunteer through celestial trust</p>
            </div>
        </div>
    </body>
    </html>
    `
    await generatePDFFromHTML(html,path);
}

module.exports={generatePDF};
