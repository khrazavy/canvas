import { App } from '@tinyhttp/app'
import { logger } from '@tinyhttp/logger'
import path from 'node:path'


const app = new App()

//setup routes
app
  .use(logger())
  .get(
    '/',
    (_, res) =>
      void res.format({
        //html: () => res.send('<h1>Hello World</h1>'),
        html: () => res.sendFile(path.resolve('public/index.html'), {}, (err) => {
          if (err) console.error(err)
        }),
        text: () => res.send('Hello World')
      })
  )
  .get(
    '/public/:page/', (req, res) =>
      void res.format({
        css: () => res.sendFile(path.resolve('public/' + req.params['page']), {}, (err) => {
          if (err) console.error(err); 
        })
      })
  )
  .get('/page/:page/', (req, res) => {
    res.status(200).send(`
    <h1>Some cool page</h1>
    <h2>URL</h2>
    ${req.url}
    <h2>Params</h2>
    ${JSON.stringify(req.params, null, 2)}
  `)
  })
  .listen(3000, () => console.log(`Listening on http://localhost:3000`))
