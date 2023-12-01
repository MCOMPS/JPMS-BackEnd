const db = require("../index");

// Function to retrieve all customers from the database
exports.getAllCustomers = async () => {
    // Select all the values from the customer table
    const query = "SELECT * FROM customers";
    // Execute the database query and return the result
    return await db.query(query);
} 
// Function to retrieve a specific customer by customer_id from the database
exports.getCustomer = async (customer_id)=> {
    // select all the info where the customer_id matches
    const query = "SELECT * FROM customers WHERE customer_id=$1";
    // pass the values from the customer id to the sql statment
    // done to avoid sql injection
    const values = [customer_id];
    // Execute the database query with parameterized values and return the result
    return await db.query(query, values);
}
// Function to add a new customer to the database
exports.addCustomer = async (name,email,phone_country_code,phone_number,date_of_birth,nationality,gender,password_hashed) => {
    const query = "INSERT INTO customers(name,email,phone_country_code,phone_number,date_of_birth,nationality,gender,password_hashed) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)";
    // pass the values from the customer id to the sql statment
    // done to avoid sql injection
    const values = [name,email,phone_country_code,phone_number,date_of_birth,nationality,gender,password_hashed];
    // Execute the database query with parameterized values and return the result
    return await db.query(query,values);
}

// Function to update customer data 
exports.updateCustomer = async (customer_id, updates) => {
    // retrive all the values from the customer with the id
    const getCustomerQuery = "SELECT * FROM customers WHERE customer_id = $1;";
    const getCustomerValues = [customer_id];
    const customer = await db.query(getCustomerQuery, getCustomerValues);
    // retrive him from the array, place into an object
    let customerObj = customer.rows[0];

    // Function that checks if the updates contain the correct values 
    const updateTenant = async (customer, updates) => {
        for (let key in updates) {
            // check if the customers has a the property key which was provided by the updates array
            if (customer.hasOwnProperty(key)) {
                //If the property exists in the customer object, the function updates 
                // the value of that property with the value from the updates object.
                // In java script if the name of an object matches in the call arr[item_name_in_arr] then that item will be returned
                customer[key] = updates[key];
            }
        }
    }

    // for all the values retrevied it will only repace the colums which were provided in the updates
    updateTenant(customerObj, updates);

    // query to update this to the db
    const updateCustomerQuery = "UPDATE customers SET name = $1, email = $2, phone_country_code = $3, phone_number = $4, date_of_birth = $5, gender = $6 , nationality = $7, password_hashed = $8 WHERE customer_id = $9; ";
    const updateCustomerValues = [customerObj.name, customerObj.email, customerObj.phone_country_code, customerObj.phone_number, customerObj.date_of_birth, customerObj.gender, customerObj.nationality, customerObj.password_hashed,customer_id];
    return await db.query(updateCustomerQuery, updateCustomerValues);
}
// Function deletes the customer with the customer_id
exports.deleteCustomer = async (customer_id) => {
    // query where the customer ids match
    const query = "DELETE FROM customers WHERE customer_id = $1";
    const value = [customer_id];
    return await db.query(query, value);
}