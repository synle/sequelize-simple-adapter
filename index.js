const _ = require('lodash');

module.exports = function Table(tableInstance, promiseDbSync){
  this.create = function(params){
    return promiseDbSync.then(
      function _tableCreate(){
        return tableInstance.create(params)
          .then(function(dataObject){
            return dataObject.dataValues;
          });
      }
    );
  };


  this.bulkCreate = function(params){
    return new Promise((resolve, reject) => {
      return promiseDbSync.then(
        function _tableBulkCreate(){
          if(params && params.length > 0){
            // bulk insert new records
            const to_insert_chunks = _.chunk(params, 1000);

            return Promise.all(
                to_insert_chunks.map((cur_chunk) => {
                  return tableInstance.bulkCreate(cur_chunk)
                })
              ).then(resolve, reject)
          } else {
            // no data...
            return rejectreject(params);
          }
        }
      );
    })
  };



  this.update = function(params, whereClause){
    return promiseDbSync.then(
      function _tableUpdate(){
        return tableInstance.update(params, whereClause)
      }
    );
  }


  this.destroy = function(params){
    return promiseDbSync.then(
      function _destroy(){
        return tableInstance.destroy(params)
      }
    );
  }


  this.findOne = function(params){
    return promiseDbSync.then(
      function _tableFindOne(){
        return tableInstance.findOne(params)
          .then(function(dataObject){
            return dataObject && dataObject.dataValues;
          });
      }
    );
  };


  this.findAll = function(params){
    return promiseDbSync.then(
      function _tableFindAll(){
        return tableInstance.findAll(params)
          .then(function(dataObjects){
            return dataObjects.map(function(dataObject){
              return dataObject.dataValues;
            });
          });
      }
    );
  };
}
