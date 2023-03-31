const pool = require("../database/")

/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications(){
  return await pool.query("SELECT * FROM public.classification ORDER BY classification_name")
}

async function getVehiclesByClassificationId(classificationId){
    try {
        const data = await pool.query("SELECT * FROM public.inventory AS i JOIN public.classification AS c ON i.classification_id = c.classification_id WHERE i.classification_id = $1", [classificationId])

        return data.rows
    }
    catch(error){
        console.error('getclassificationsbyid error' + error)
    }
}

async function getVehiclesByVehicleId(vehicleId){
    try {
        const data = await pool.query("SELECT * FROM public.inventory AS i JOIN public.classification AS c ON i.classification_id = c.classification_id WHERE i.inv_id = $1", [vehicleId])

        return data.rows
    }
    catch(error){
        console.error('getclassificationsbyid error' + error)
    }
}

async function getVehicleData(vehicleId){
    try{
        const data = await pool.query("SELECT * FROM public.inventory AS i JOIN public.classification AS c ON i.classification_id = c.classification_id WHERE inv_id = $1", [vehicleId])

        return data.rows
    }
    catch(error){
        console.error('getVehicleData error' + error)
    }
}

async function sendNewClass(classification_name){
    try{
        await pool.query("INSERT INTO classification (classification_name) VALUES ($1)", [classification_name])
    }
    catch
        (error){
            console.error('sendNewClass error' + error)
    }
}

async function sendNewCar(classificationId, make, model, description, imgPath, thumbPath, price, year, miles, color){
    try{
        await pool.query("INSERT INTO inventory (classification_id, inv_make, inv_model, inv_description, inv_image, inv_thumbnail, inv_price, inv_year, inv_miles, inv_color) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)", [classificationId, make, model, description, imgPath, thumbPath, price, year, miles, color])
    }
    catch(error){
        console.error('sendNewCar error' + error)
    }
}

/* ***************************
 *  Update Vehicle Data
 * ************************** */
async function updateVehicle(
    inv_id,
    inv_make,
    inv_model,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_year,
    inv_miles,
    inv_color,
    classification_id
  ) {
    try {
      const sql =
        "UPDATE public.inventory SET inv_make = $1, inv_model = $2, inv_description = $3, inv_image = $4, inv_thumbnail = $5, inv_price = $6, inv_year = $7, inv_miles = $8, inv_color = $9, classification_id = $10 WHERE inv_id = $11"
      const data = await pool.query(sql, [
        inv_make,
        inv_model,
        inv_description,
        inv_image,
        inv_thumbnail,
        inv_price,
        inv_year,
        inv_miles,
        inv_color,
        classification_id,
        inv_id
      ])
      return data.rows[0]
    } catch (error) {
      console.error("model error: " + error)
    }
  }

  /* ***************************
 *  Delete Inventory Item
 * ************************** */
 async function deleteVehicle(inv_id) {
    try {
      const sql = 'DELETE FROM inventory WHERE inv_id = $1'
      const data = await pool.query(sql, [inv_id])
    return data
    } catch (error) {
      next(error)
    }
  }

module.exports = {getClassifications, getVehiclesByClassificationId, getVehicleData, sendNewClass, sendNewCar, updateVehicle, getVehiclesByVehicleId, deleteVehicle}