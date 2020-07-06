const mysql = require('mysql');

class Model {
  constructor() {
    try {
      const { HOST, USER,  PASSWORD, DATABASE} = process.env;
      const connection = mysql.createConnection({
        host: HOST,
        user: USER,
        password: PASSWORD,
        database: DATABASE,
      });
      connection.connect();
      this.connection = connection;
    } catch(err) {
      throw err;
    }
  }

  get() {
    try {        
      return new Promise((resolve, reject) => {
        const query = `select * from ${this.table}`;
        this.connection.query(query, (err, rows, fields) => {
            if (err) {
               return  reject(err);
            }
            return resolve(rows);
        });
      });
    } catch(err) {
        throw err;
    }
  }

  find(id) {
    try {        
      return new Promise((resolve, reject) => {
        const query = `select * from ${this.table} where ${this.primaryKey} = ${id} LIMIT 1`;
        this.connection.query(query, (err, rows, fields) => {
            if (err) {
               return  reject(err);
            }
            if (Array.isArray(rows)) {
                return resolve(rows[0]);
            }
            return resolve(rows);
        });
      });
    } catch(err) {
        throw err;
    }
  }

  create(data) {
    try {        
      const fields = this.flattenFields(data);
      const values = this.flattenValues(data);
      const query = `insert into ${this.table} (${fields}) values (${values})`; 
      return new Promise((resolve, reject) => {
        this.connection.query(query, async (err, row, flds) => {
            if (err) {
               console.log(query);
               console.log(err);
               process.exit();
               return  reject(err);
            }
            if (row.hasOwnProperty('insertId')) {            
              return resolve({[this.primaryKey]: row.insertId}); 
            }
            return resolve(row);
        });
      });
    } catch(err) {
      throw err;
    }
  }

  insertMany(dataArray) {
    if (!Array.isArray(dataArray) || dataArray.some(data => typeof data != 'object') || dataArray.length == 0) {
        throw new Error('Agument must be array of objects');
    }
    try {        
      return new Promise((resolve, reject) => {
        const fields = this.flattenFields(dataArray[0]);
        const values = dataArray.map(data => `(${this.flattenValues(data)})`).join(', ');
        const query = `insert into ${this.table} (${fields}) values ${values}`;
        this.connection.query(query, async (err, row, flds) => {
          if (err) {
            return  reject(err);
          }
          return resolve(row);
        });
      });
    } catch(err) {
      throw err;
    }
  }

  truncate() {
    try {        
      return new Promise((resolve, reject) => {
        const query = `truncate table ${this.table}`;
        this.connection.query(query, (err, rows, fields) => {
            if (err) {
               return  reject(err);
            }
            return resolve(rows);
        });
      });
    } catch(err) {
        throw err;
    }
  }

  flattenFields(data) {
    return Object.keys(data).join(', ');
  }

  flattenValues(data) {
    return Object.values(data).map(field => { 
      if (field == null || field == '') {
        return "null";
      }
      if (!isNaN(field)) {
        return field;
      }
      return `"${field}"`
    }).join(', '); 
  }

}

module.exports = Model;