
import { describe, before, it } from 'mocha';
import assert from 'assert';
import {connectToDatabase,} from '../src/db/mongoConection.js'
import variables from '../src/config/variables.config.js'
import {start} from 'mongo-unit'


start().then(()=>{
  run()
})

describe('Testing mongoConection', function(){
let db;

    before('connect', function(){
       db={
        connectToDatabase,
      }

        return db
    })

    it('Conect to database', async function(){
      const client = await db.connectToDatabase();
      let dataBase = client.db(variables.DB_NAME);
      assert.equal(dataBase.namespace, "Reserva-API");
    });


});




