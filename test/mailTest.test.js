
import { describe, it } from 'mocha';
import assert from 'assert';

import {sendReserve} from '../src/functions/mailer.js'

describe('Envio de Correo ', function() {

    it('sendReserve', async function(){
        let response =  sendReserve()
        assert.equal(response, 'exito' );
    });
});

