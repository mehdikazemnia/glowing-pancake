import * as fs from 'fs';

export default function (inputPath: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    setTimeout(() => {
      const outputPath = inputPath.replace('/input/', '/output/');
      fs.copyFile(inputPath, outputPath, (err) => {
        if (err) reject(err);
        else resolve(outputPath);
      });
    }, 1000 * 60 /* 60 seconds */);
  });
}
