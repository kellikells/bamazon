USE bamazondb ;

SELECT  FORMAT(price, 2) FROM products;
select * from products where item_id > 5;
select * from products order by product_name;

select * from products order by department_name desc;

select * from products order by department_name,product_name;

SELECT stock_quantity FROM products WHERE item_id=6;
