INSERT INTO client (client_firstname, client_lastname, client_email, client_password)
VALUES 
('Tony', 'Stark', 'tony@starkent.com', 'Iam1ronM@n');

UPDATE client
SET client_type = 'Admin'
WHERE client_email = 'tony@starkent.com';

DELETE FROM client WHERE client_email = 'tony@starkent.com';

UPDATE 
   inventory
SET 
   inv_description = REPLACE(inv_description,'the small interiors','a huge interior')
WHERE 
   inv_model = 'Hummer';

SELECT inventory.inv_make, inventory.inv_model, classification.classification_name
FROM inventory
JOIN classification ON inventory.classification_id = classification.classification_id
WHERE classification.classification_name = 'Sport';

UPDATE inventory
SET inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/');
UPDATE inventory
SET inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');

