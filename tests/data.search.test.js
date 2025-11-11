// tests/data.search.test.js, aixo ho faig per a comprovar el endpoint
import request from 'supertest'
import app from '../apicalls.js'

describe('POST /data/search', () => {
  const seed = { id: 98765, forename: 'Roy', surname: 'Fielding' }

  beforeAll(async () => {
    await request(app)
      .post('/data')
      .set('Content-Type', 'application/json')
      .send(seed)
      .expect([201, 200]) // per si ja existeix
  })

  afterAll(async () => {
    await request(app)
      .delete(`/data/${seed.id}`)
      .expect([200, 404]) // si ja s’ha esborrat, també OK
  })

  test('200 i retorna coincidències quan existeix', async () => {
    const res = await request(app)
      .post('/data/search')
      .set('Content-Type', 'application/json')
      .send({ forename: 'Roy' })
      .expect(200)

    expect(Array.isArray(res.body)).toBe(true)
    expect(res.body).toContainEqual({
      forename: 'Roy',
      surname: 'Fielding'
    })
  })

  test('404 quan no hi ha coincidències', async () => {
    await request(app)
      .post('/data/search')
      .set('Content-Type', 'application/json')
      .send({ forename: 'NoExiste' })
      .expect(404)
  })

  test('415 si el Content-Type no és JSON', async () => {
    await request(app)
      .post('/data/search')
      .set('Content-Type', 'text/plain')
      .send('forename=Roy')
      .expect(415)
  })
})
