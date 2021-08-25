const agent = require('superagent');
const statusCode = require('http-status-codes');
const chai = require('chai');

const expect = chai.expect;

describe('First Api Tests', () => {
    it('Consume GET Service', async () => {
        const response = await agent.get('https://httpbin.org/ip');
      
        expect(response.status).to.equal(statusCode.OK);
        expect(response.body).to.have.property('origin');
    });

    it('Consume GET Service with query parameters', async () => {
        const query = {
          name: 'Stiven',
          age: '31',
          city: 'New York'
        };
      
        const response = await agent.get('https://httpbin.org/get').query(query);
      
        expect(response.status).to.equal(statusCode.OK);
        expect(response.body.args).to.eql(query);
      });

    it('Consume HEAD Service', async () =>{
      const myQuery = {};

      const response = await agent.head('https://httpbin.org/headers').query(myQuery);
  
      expect(response.status).to.equal(statusCode.OK);
      expect(response.headers).to.have.property('access-control-allow-credentials', 'true');
      expect(response.body).to.eql(myQuery);
    }); 
    
    it('Consume PATCH Service', async () => {
      const body = {
        name: 'Pepito',
        city: 'New York'
      };
  
      const response = await agent
        .patch('https://httpbin.org/patch')
        .send(body);
  
      expect(response.status).to.equal(statusCode.OK);
      expect(response.body).to.have.property('headers');
      expect(response.body.json).to.eql(body);
    });

    it('Consume PUT Service', async () => {
      const body = {
        name: 'Pepito',
        city: 'New York'
      };
  
      const response = await agent
        .put('https://httpbin.org/put')
        .set('Content-Type', 'application/json')
        .send(body);
  
      expect(response.status).to.equal(statusCode.OK);
      expect(response.body.json).to.eql(body);
    });

    it('Consume DELETE Service', async () => {
      const body = {
        name: 'Pepito',
        city: 'New York'
      };
  
      const response = await agent
        .del('https://httpbin.org/delete')
        .send(body);
        
      expect(response.status).to.equal(statusCode.OK);
      expect(response.body.json).to.eql(body);
    });
});
