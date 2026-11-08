const fs=require('fs');const crypto=require('crypto');
require('esbuild').buildSync({entryPoints:['game-source.js'],bundle:true,minify:true,outfile:'dist/game.js'});
const template=fs.readFileSync('page-template.html','utf8');
const code=fs.readFileSync('dist/game.js','utf8').replace(/<\/script/gi,'<\\/script');
const version=crypto.createHash('sha256').update(code).update(template).digest('hex').slice(0,12);
fs.writeFileSync('version.json',JSON.stringify({version}));
fs.writeFileSync('index.html',template.replace('__GAME_VERSION__',version).replace('<script src="game.js"></script>',()=>'<script>'+code+'</script>'));
