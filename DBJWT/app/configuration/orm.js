//Our Object Relational Mapper. Here we create the methods to convert objets to scalar values and viceversa; write functions that take inputs and conditions and turn them into database commands like SQL.


// Dependencies. Lets access mySQL
var connection = require('./mySqlConnection.js');
// this is our table
var contactsTable = 'contacts';
//this is the Object Relational Mapper
var orm = {
    showAllContacts: function(callback) {
        var syntax = 'SELECT * FROM ' + contactsTable;
        connection.query(syntax, function(err, result) {
            callback(result);
        });
    },
    addContact: function(newContactInfo, callback) {

        var syntax = 'INSERT INTO ' + contactsTable + '(user_name, password, email) VALUES (?,?,?)';

        connection.query(syntax, [newContactInfo.username, newContactInfo.password, newContactInfo.email], function(error, result) {
            if (error) console.log(error);
            callback(result);
        });

        console.log('The info comes from orm.js addContact');


    },
    searchContact: function(user_name, password, callback) {
        var syntax = 'SELECT * FROM ' + contactsTable + ' WHERE user_name=? AND password=?';

        connection.query(syntax, [user_name, password], function(err, result) {
            if (err) throw err;
            //the query brings back the result which is an array with an object on index 0
            //we give this in the callback
            //  console.log("The query result for the name " + result[0].user_name);
            // console.log("The query result for the password " + result[0].password);
            callback(result);
        });
    }
};

//lets make our orm available
module.exports = orm;