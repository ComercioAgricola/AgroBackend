const usersController = require('../src/controllers/users.controllers')


describe('GET /user', () => {  

    it('tests async code', async () => {
        const employeeData = {id: 1, name: 'bobby hadz', salary: 500};
      
        const employeePromise = new Promise(resolve =>
          setTimeout(() => resolve(employeeData), 6000),
        );
      
        const result = await employeePromise;
      
        expect(result.id).toBe(1);
        expect(result.name).toBe('bobby hadz');
        expect(result).toEqual(employeeData);
      }, 30000);

})

