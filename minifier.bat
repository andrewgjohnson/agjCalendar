for /f %%i in ("%0") do set curpath=%%~dpi
cd /d %curpath%

java -jar C:\yuicompressor-2.4.7\build\yuicompressor-2.4.7.jar source\jquery.ctcCalendar.css -o source\jquery.ctcCalendar.min.css
java -jar C:\yuicompressor-2.4.7\build\yuicompressor-2.4.7.jar source\jquery.ctcCalendar.js -o source\jquery.ctcCalendar.min.js