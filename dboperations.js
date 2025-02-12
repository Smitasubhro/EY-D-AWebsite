var config = require('./dbconfig');
const sql = require('mssql');


async function getUsecase_Info() {
    try {
        let pool = await sql.connect(config);
        let products = await pool.request().query("SELECT * from Usecase_Info");
        return products.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function addOrder(order) {

    try {
        let pool = await sql.connect(config);
        let insertProduct = await pool.request()
            .input('Id', sql.Int, order.Id)
            .input('Title', sql.NVarChar, order.Title)
            .input('Quantity', sql.Int, order.Quantity)
            .input('Message', sql.NVarChar, order.Message)
            .input('City', sql.NVarChar, order.City)
            .execute('InsertOrders');
        return insertProduct.recordsets;
    }
    catch (err) {
        console.log(err);
    }

}
module.exports = {
    getUsecase_Info: getUsecase_Info
    
}