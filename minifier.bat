for /f %%i in ("%0") do set curpath=%%~dpi
cd /d %curpath%

java -jar C:\yuicompressor\yuicompressor-2.4.7.jar source\ctcCalendar\jquery.ctcCalendar.css -o source\ctcCalendar\jquery.ctcCalendar.min.css
java -jar C:\yuicompressor\yuicompressor-2.4.7.jar source\ctcCalendar\jquery.ctcCalendar.js -o source\ctcCalendar\jquery.ctcCalendar.min.js