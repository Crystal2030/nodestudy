var fs = require('fs');
/**
 *1.把src里的文件内容，写入到target文件里。
 */
function copy(src,target){
    fs.readFile(src, function(err, data){
        if(err){
            console.error('read file failed!');
        }
        fs.writeFile(target, data, function(err){
            if(err){
                console.error('failed');
            }else{
                console.log('copy success!');
            }
        })
    })
}

copy('./name.txt','./name.bak.txt');