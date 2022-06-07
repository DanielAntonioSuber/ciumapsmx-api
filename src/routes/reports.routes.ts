import { Request, Router } from 'express'
import { Event } from '../database/models/Event'
import { Report } from '../database/models/Report'
import { getUserJWT } from '../utils/jwt'

const router = Router()

router.post(
  '/',
  async (req: Request<{ description: string; problem: string }>, res) => {
    const { id } = getUserJWT(req)
    const report = await Report.create({
      description: req.body.description,
      problem: req.body.problem,
      userId: id
    })
    if (report) return res.status(201).json(report)
    return res.status(400)
  }
)

router.get('/', async (req, res) => {
  const reports = await Report.findAll({ include: Report.associations.event })

  if (reports.length !== 0) return res.json(reports.filter((r) => !r.event))
  return res.status(400)
})

router.post('/:id/events', async (req, res) => {
  const event = await Event.create({
    isSolved: false,
    reportId: parseInt(req.params.id),
    type: 'supportEngineer'
  })
  if (event) return res.status(200).json(event)
  return res.status(400)
})

router.put('/:id/events', async (req, res) => {
  const event = await Event.findOne({
    where: { reportId: parseInt(req.params.id) }
  })
  console.log(event)

  if (event) {
    event.update({ type: 'maintenanceEnginner' })
    return res.json(event)
  }
  return res.status(400)
})

router.put('/:id', async (req, res) => {
  const report = await Report.findByPk(req.params.id)
  report?.update(req.body)
  res.json(report)
})

router.get('/events/supportEngineer', async (req, res) => {
  const reports = await Report.findAll({ include: Report.associations.event })

  if (reports.length !== 0) {
    return res.json(reports.filter((r) => r.event?.type === 'supportEngineer'))
  }
  return res.status(400)
})

router.get('/events/maintenanceEnginner', async (req, res) => {
  const reports = await Report.findAll({ include: Report.associations.event })

  if (reports.length !== 0) {
    return res.json(reports.filter((r) => r.event?.type === 'maintenanceEnginner'))
  }
  return res.status(400)
})

router.delete('/:id')

export default router
