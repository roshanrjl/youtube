import ffmpeg from 'fluent-ffmpeg';
import fs from "fs"
import path from "path"

export const converToHLs= (inputpath , outputFolder)=>{
    return new  Promise((resolve, reject)=>{
        if(!fs.existsSync(outputFolder)){
            fs.mkdirSync(outputFolder,{recursive:true})
        }
        const outputPath = path.join(outputFolder ,"index.m3u8");

        ffmpeg(inputpath)
          .addOptions([
            '-profile:v baseline',    // compatibility for older devices
            '-level 3.0',
            '-start_number 0',
            '-hls_time 10',           // each segment = 10s
            '-hls_list_size 0',       // infinite playlist
            '-f hls'                  // format = HLS
          ])
          .output(outputPath)
          .on ('end',()=>{
             console.log('HLS conversion finished');
             resolve(outputPath);
          })
          .on("error",()=>{
              console.error('HLS conversion error:', err);
              reject(err);
          })
          .run()
    });

};