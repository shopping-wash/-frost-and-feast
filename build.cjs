const fs=require('fs');
require('esbuild').buildSync({entryPoints:['game-source.js'],bundle:true,minify:true,outfile:'dist/game.js'});
const template=fs.readFileSync('page-template.html','utf8');
const code=fs.readFileSync('dist/game.js','utf8').replace(/<\/script/gi,'<\\/script');
fs.writeFileSync('index.html',template.replace('<script src="game.js"></script>',()=>'<script>'+code+'</script>'));
