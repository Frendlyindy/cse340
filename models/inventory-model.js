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

module.exports = {getClassifications, getVehiclesByClassificationId, getVehicleData, sendNewClass}