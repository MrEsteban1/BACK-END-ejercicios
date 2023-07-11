const request = require('supertest')('http://localhost:8080')
const expect = require('chai').expect

describe('TEST DE API PRODUCTOS', ()=>{
    describe('PRODUCTOS', ()=>{
        it('GET PRODUCTOS: Retorna todos los productos', async ()=>{
            let response = await request.get('/api/productos')
            expect(response.body.estado).to.eql('OK')
        })
        it('GET PRODUCTO: Retorna un producto seleccionado', async()=>{
            let response = await request.get('/api/productos/630ead15b7d8f86ea18eac98')
            expect(response.body.estado).to.eql('OK')
        })
        it('GET PRODUCTO: un producto inexistente deberia retornar error', async()=>{
            let response = await request.get('/api/productos/630ead15b7d8f86ea18eac09')
            expect(response.status).to.eql('error')
        })
        it('POST PRODUCTO: sube un producto a la DB', async()=>{
            const newPto = {
                nombre: "florero ceramica",
                descripcion: "florero ceramica muy lindo",
                stock: 5,
                imagen: "https://cdn3.iconfinder.com/data/icons/education-209/64/bag-pack-container-school-128.png",
                precio: 1285,
              };
            let response = await request.post('/api/productos/').send(newPto)
            expect(response.body.estado).to.eql('OK')
        })
        it('PUT PRODUCTO: modificar un producto inexistente deberia traer un error', async()=>{
            const modificacion = {
                nombre: "Florero Negro",
                descripcion: "Una mochila negra",
                precio: 1285,
                stock: 10
            };
            let response = await request.put('/api/productos/61e0931bbcf2d104d8538206').send(modificacion)
            expect(response.body.estado).to.eql('error')

        })
        it('PUT PRODUCTO: un producto existente deberia mensaje de OK', async()=>{
            const modPto = {
                descripcion: "Un florero magico",
                precio: 1285,
                stock: 100
            };
            let response = await request.put('/api/productos/630ead15b7d8f86ea18eac98').send(modPto)
            expect(response.body.estado).to.eql('OK')
        })
        it('DELETE PRODUCTO: eliminar un producto inexistente resulta en mensae de error', async()=>{
            let response = await request.delete('/api/productos/61e0931bbcf2d104d8538206')
            expect(response.body.estado).to.eql('error')
        })

    })
})