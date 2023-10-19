const { marked } = require('marked');
const fs = require('fs');
const path = require('path');

const inputDir = 'md_texts'; // Source directory for .md files
const outputDir = 'blog';    // Destination directory for generated .html files

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Create an array to store HTML file entries
const htmlFileEntries = [];

// Function to format a date object as a string in DD/MM/YYYY format
function formatDate(date) {
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

// Function to process Markdown files and generate HTML files
function processMarkdownFiles() {
  fs.readdir(inputDir, (err, files) => {
    if (err) {
      console.error(err);
      return;
    }

    // Filter out non-md files
    const mdFiles = files.filter(file => path.extname(file) === '.md');

    // Process each md file
    mdFiles.forEach(file => {
      const filePath = path.join(inputDir, file);

      // Get file stats to retrieve creation date (mtime)
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error(err);
          return;
        }

        // Extract the creation date from stats
        const creationDate = stats.mtime; // Use mtime instead of birthtime

        // Read the content of the Markdown file
        fs.readFile(filePath, 'utf-8', (err, data) => {
          if (err) {
            console.error(err);
            return;
          }

          const html = marked(data);

          // Create the HTML file with the same name as the MD file
          const outputFilePath = path.join(outputDir, `${path.parse(file).name}.html`);
          fs.writeFile(outputFilePath, html, err => {
            if (err) {
              console.error(err);
            } else {
              console.log(`${outputFilePath} created`);
              console.log(`Creation Date: ${formatDate(creationDate)}`);

              // Add the HTML file entry to the array
              htmlFileEntries.push({
                fileName: path.parse(file).name, // Remove .html extension
                creationDate,
              });

              // Call the listHTMLFiles function after processing Markdown files
              listHTMLFiles();
            }
          });
        });
      });
    });
  });
}

// Function to list HTML files and generate an HTML page
function listHTMLFiles() {
  // Sort the HTML file entries by creation date in descending order
  htmlFileEntries.sort((a, b) => b.creationDate - a.creationDate);

  // Create a string of HTML code for the list
  let listHTML = '';
  htmlFileEntries.forEach(entry => {
    listHTML += `<a href="./${outputDir}/${entry.fileName}.html" target="_blank">${entry.fileName}</a><br><p>${formatDate(entry.creationDate)}</p>\n`;
  });

  // Create a string of HTML code for the page
  const pageHTML = `<!DOCTYPE html>\n<html>\n<head>\n<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <title>Julia's Blog</title>
  <script src="jquery.min.js"></script>
  <script src="js/typing.js"></script>
  <script src="poster.js"></script>
  <script src="js/main.js"></script>
  <script src="js/dark-mode.js"></script>
  <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.7/dist/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

  <link rel="stylesheet" type="text/css" href="main.css">
  
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css">
  <link rel="shortcut icon" href="https://juliadebelli.com/favicon.ico" type="image/x-icon">
  <meta name="description" content="Writings about design, technology, maker culture">
  <meta name="keywords" content="blog, designer blog, developer blog, design, developer, tech">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!--  favicon -->
  <link rel="apple-touch-icon" sizes="180x180" href="assets/favicon/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="assets/favicon/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="assets/favicon/favicon-16x16.png">
  <link rel="manifest" href="assets/favicon/site.webmanifest">
  <!-- favicon --></link>
  
  \n\n</head>\n<body>\n<section id="top-nav">\n<nav class="w-75 navbar navbar-expand-lg navbar-light container pt-4">
  <div class="d-block pr-4">   
    <h1 class="d-inline-block align-text-top">PORTO, J.B.</h1>
    <h5>Researcher</h5>
  </div>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse mt-2" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" href="index.html">CV</a>
      </li>

      <li class="nav-item">
        <a class="nav-link" href="https://buscatextual.cnpq.br/buscatextual/visualizacv.do?id=K8273655J5&tokenCaptchar=03AFcWeA6XZCSTA1Wn-ckFKwLF4Uq37vc74-XGBSDs64qOzFuztTAG3mTvUyZa8y_61XAOrNKcWP5NGRQnUrWrFphJ_5a5w__MRpVsVwrxD8svZ_fdN31TakSFJ2gS5ekg177Cl0mWT2Ih1jOxR_dmSl8mVwQju5vUJgxZWABYXJ-zepDykau3Jy2S1ceiw0cAjhH1riPsCWkpyEAvXpZeapKIQY4u2_54S2YSIoLGVxa3M3DBtHIJby2t9u-vzy8dCnHDm9DLgt0UHqhXsMu0nIPDtxtvbOFiFKvxD2eaaIZsEC_8p7DboLAGi07Qz0h_PZfY5SriLT3MR5OBL6Ur5YLqMF3e14P3nPbAyESnB3clKV7S-72ElEDKquLv4B3-p8rCrSkARnwkKpueDKApswzDaBWSduC5jX4iqUoztF-kiBXnhwedoRlb3aV3LC2DpC57HbqbLcOZMIGM1MeKjBxT59Tjidfdvcs7F1SPEFt9ON6bGsEMQFqdO5orGsLWpyp7Sh2Q2-eRJlCVdC1p3tgtqDXFmrXMqU1U2Hn6q9aryb5QHxVttTc" target="_blank">Lattes</a>
      </li>

      <li class="nav-item active">
        <a class="nav-link" href="#">Blog <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <button id="chat-button" class="w-100">Contact</button>
      </li>
    </ul>
  </div>
</nav>\n</section>\n<div class="container w-75 pt-4 pl-5">\n<br><h1>Julia's Blog</h1><br><p>
Below are essays written by me that are related to my research and interests. Some of them might become their own paper someday.
</p>\n<br><br>\n<div>${listHTML}</div>\n</div>\n</body>\n</html>`;

  // Write the page HTML to a file
  fs.writeFile('blog.html', pageHTML, function (err) {
    if (err) {
      console.error('Error writing blog.html:', err);
    } else {
      console.log('Blog page created!');
    }
  });
}

// Call the function to process Markdown files
processMarkdownFiles();
