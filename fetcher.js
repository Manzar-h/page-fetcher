const request = require('request');
const fs = require('fs');

if (process.argv.length === 4) {
  const url = process.argv[2];
  const path = process.argv[3];
  
  request(url, (err, status, content) => {
    if (!err) {
      if (content && status.statusCode === 200) {
        fs.writeFile(path, content, (err) => {
          if (!err) {
            fs.stat(path, (err, stats) => {
              if (!err) {
                console.log(`Downloaded & saved ${stats.size} bytes to ${path}.`);
              } else {
                console.log('Could not obtain the file size.');
              }
            });
          } else {
            console.log("The local file path given is invalid.", err);
          }
        });
      } else {
        console.log("URL is Invalid or non-200 result");
        console.log(`Status Code: ${status.statusCode} \r\n Staus: \r\n ${status} \r\n Body: \r\n ${content}`);
      }
    } else {
      console.log("Could not obtain the specified webpage.", err);
    }
  });
}