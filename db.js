
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'csxpudhsuksnfw',
  host: 'ec2-23-21-148-223.compute-1.amazonaws.com',
  database: 'ddmb1nm14a2ne8',
  password: '6b409e94addfa71852e04daf9caf0018915f085e8a458bc76569e3ffa9e7617b',
  port: 5432,
  ssl: true
})
const getAllWidgets = (request, response) => {
  pool.query('SELECT t.* FROM public.widgets t', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getWidgetById = (request, response) => {
  const id = parseInt(request.params.widget_id)

  pool.query('SELECT * FROM public.widgets WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createWidget = (request, response) => {
  const { widget_id, widget_name } = request.body

  pool.query('INSERT INTO public.widgets (id, widget_id, widget_name) VALUES ($1, $2, $3)',
   [widget_id, widget_id, widget_name], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Widget added with ID: ${widget_id}`)
  })
}

const updateWidget = (request, response) => {
  const id = parseInt(request.params.widget_id)
  const { widget_id, widget_name } = request.body

  pool.query(
    'UPDATE public.widgets SET widget_id = $1, widget_name = $2 WHERE id = $3',
    [widget_id, widget_name, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Widget modified with ID: ${id}`)
    }
  )
}

const deleteWidget = (request, response) => {
  const id = parseInt(request.params.widget_id)

  pool.query('DELETE FROM public.widgets WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Widget deleted with ID: ${id}`)
  })
}

module.exports = {
  getAllWidgets,
  getWidgetById,
  createWidget,
  updateWidget,
  deleteWidget,
}
