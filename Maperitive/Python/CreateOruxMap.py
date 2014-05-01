from maperipy import App
import time
import os
import urllib

mobileAtlasCreatorPath = 'D:\Mobile Atlas Creator'
startPath = os.path.abspath(App.script_dir + '\..\\')
App.log('script-dir: ' + App.script_dir)
App.log('change-dir dir="' + startPath + '"')
App.run_command('change-dir dir="' + startPath + '"')

App.log('=== downloading if needed israel-and-palestine-latest.osm.pbf ===')
localFile = os.path.abspath(startPath + '\cache\israel-and-palestine-latest.osm.pbf')
remoteFile = 'http://download.geofabrik.de/asia/israel-and-palestine-latest.osm.pbf'
urllibobject = urllib.urlopen("http://download.geofabrik.de/asia/israel-and-palestine-latest.osm.pbf")
if os.path.isfile(localFile) == 0 or urllibobject.info()['Content-Length'] != str(os.stat(localFile).st_size) :
	urllib.urlretrieve(remoteFile, localFile)
	App.log('=== download complete ===')

App.run_command("run-script file=Scripts\IsraelHiking.mscript")

sitePath = os.path.abspath(startPath + '\..\Site')
App.log('change-dir dir="' + sitePath + '"')
App.run_command('change-dir dir="' + sitePath + '"')
App.run_command("generate-tiles minzoom=7 maxzoom=15 use-fprint=true")
App.log("=== Create a Zip file with new tiles ===")
App.run_command('zip zip-file="TileUpdate.zip"')

lastModified = sitePath + '\js\LastModified.js'
App.log('=== Create LastModified.js file and add it to zip file: ' +  lastModified + '===')
jsFile = open(lastModified, 'w')
jsFile.write("function getLastModifiedDate() { return '" + time.strftime("%d-%m-%Y") + "'; }")
jsFile.close()

App.log("=== Start uploading of tiles zoom 15 and below ===")
App.log('os.system(' + sitePath + '\UploadTiles.bat TileUpdate.zip' + ')')
os.system(sitePath + '\UploadTiles.bat TileUpdate.zip')

App.log("=== Start creation of Oruxmap map ===")
App.log('os.system(' + mobileAtlasCreatorPath + '\CreateIsraelHiking.bat' + ')')
os.system(mobileAtlasCreatorPath + '\CreateIsraelHiking.bat')

App.log("=== Create tiles for zoom 16 ===")
App.log('script-dir: ' + sitePath)
App.run_command("generate-tiles minzoom=16 maxzoom=16 use-fprint=true")

App.log("=== Create a Zip file with new tiles ===")
App.run_command('zip zip-file="TileUpdate16.zip"')

App.log("=== Start uploading of tiles zoom 16 ===")
App.log('os.system(' + sitePath + '\UploadTiles.bat TileUpdate16.zip' + ')')
os.system(sitePath + '\UploadTiles.bat TileUpdate16.zip')

App.run_command('change-dir dir="' + startPath + '"')
