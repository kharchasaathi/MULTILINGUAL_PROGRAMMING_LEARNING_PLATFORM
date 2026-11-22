-- CodeSaathi SQL8 Join Lab: reusable practice dataset
-- Dialect: SQLite 3.39.0+ (for RIGHT JOIN and FULL OUTER JOIN)
-- Paste this script into the SQL Playground to create the module practice tables.
-- This is an educational fixture; it contains fictional sample records only.

PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS customers;

CREATE TABLE customers (
  customer_id INTEGER PRIMARY KEY,
  customer_name TEXT NOT NULL,
  city TEXT NOT NULL
);

CREATE TABLE orders (
  order_id INTEGER PRIMARY KEY,
  customer_id INTEGER NOT NULL REFERENCES customers(customer_id),
  order_date TEXT NOT NULL,
  order_total NUMERIC NOT NULL CHECK (order_total >= 0)
);

CREATE TABLE products (
  product_id INTEGER PRIMARY KEY,
  product_name TEXT NOT NULL,
  unit_price NUMERIC NOT NULL CHECK (unit_price >= 0)
);

CREATE TABLE order_items (
  order_item_id INTEGER PRIMARY KEY,
  order_id INTEGER NOT NULL REFERENCES orders(order_id),
  product_id INTEGER NOT NULL REFERENCES products(product_id),
  quantity INTEGER NOT NULL CHECK (quantity > 0)
);

CREATE TABLE employees (
  employee_id INTEGER PRIMARY KEY,
  employee_name TEXT NOT NULL,
  manager_id INTEGER REFERENCES employees(employee_id),
  department TEXT NOT NULL
);

INSERT INTO customers VALUES
  (1, 'Asha Rao', 'Rajahmundry'),
  (2, 'Bilal Khan', 'Hyderabad'),
  (3, 'Chitra Das', 'Vijayawada'),
  (4, 'Dev Patel', 'Mumbai');

INSERT INTO orders VALUES
  (101, 1, '2026-10-02', 240),
  (102, 1, '2026-10-08', 150),
  (103, 3, '2026-10-11', 75);

INSERT INTO products VALUES
  (10, 'Notebook', 50),
  (11, 'Desk Lamp', 200),
  (12, 'Pen Set', 25),
  (13, 'Backpack', 300);

INSERT INTO order_items VALUES
  (1001, 101, 10, 2),
  (1002, 101, 12, 4),
  (1003, 102, 11, 1),
  (1004, 103, 12, 3);

INSERT INTO employees VALUES
  (1, 'Priya Sen', NULL, 'Sales'),
  (2, 'Rahul Das', 1, 'Sales'),
  (3, 'Sara Ali', 1, 'Engineering'),
  (4, 'Omar Khan', 2, 'Sales'),
  (5, 'Tara Roy', 2, 'Engineering');

-- Starter query: join customers to orders.
SELECT c.customer_name, o.order_id, o.order_total
FROM customers AS c
INNER JOIN orders AS o ON o.customer_id = c.customer_id
ORDER BY o.order_id;
