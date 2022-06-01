import { Request, Response } from 'express'
import FAQService from '../services/FAQService'

class FAQcontroller {
  service = new FAQService()

  createFAQ = async (req: Request, res: Response) => {
    const { question, answer } = req.body
    const faq = await this.service.createFAQ(question, answer)
    if (faq) return res.status(200).json(faq)
    res.status(400)
  }

  getFAQs = async (req: Request, res: Response) => {
    const faqs = await this.service.getFAQs()
    res.json(faqs)
  }

  editFAQ = async (req: Request, res: Response) => {
    const faqId = req.params.id
    const { question, answer } = req.body

    const faq = await this.service.updateFAQ(faqId, question!, answer!)
    res.json(faq)
  }

  deleteFAQ = async (req: Request, res: Response) => {
    const faqId = req.params.id
    const destroys = await this.service.deleteFAQ(faqId!)

    if (destroys !== 0) return res.status(200).json({})

    res.status(400).json({})
  }
}

export default FAQcontroller
