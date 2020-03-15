# bamazon
(aka babyamazon)

Command line node app that mimics the standard process of purchasing products.  
User is prompted what item and how many they would like.  They receive a total cost for their purchase and a notification if the database cannot fulfill their item/quantity request.

============================================================
## Technologies utilized:
- npm inquirer
- npm mysql
- MySQL workbench

=============================================================
### Screenshots of the app's functions:

Javascript code put into MySQL Workbench:
![initial load](/README/screenshot_1.jpg)
--------------------------------------------------------------
Creating the database by executing selected statements:
![creating database](/README/screenshot_2.jpg)
--------------------------------------------------------------
Executing SELECT statement to display `products` table data:
![MySQL data table](/README/screenshot_3.jpg)
--------------------------------------------------------------
CLI initial load (prompts user):
![CLI initial view](/README/terminal_1.jpg)
--------------------------------------------------------------
App response when user's request more units than database holds for a specific product:
![Unable to meet request](/README/terminal_2.jpg)
--------------------------------------------------------------
App response when user's request falls within the table data range:
![Purchase Successful](/README/terminal_3.jpg)
--------------------------------------------------------------
MySQL Workbench database is updated:
![](/README/mysql_compare.jpg)
--------------------------------------------------------------

