import { FAQ } from '../database/models/FAQ'

class FAQService {
  createFAQ = async (question: string, answer: string) =>
    await FAQ.create({ answer, question })

  deleteFAQ = async (faqId: string) =>
    await FAQ.destroy({ where: { id: faqId } })

  updateFAQ = async (faqId: string, question: string, answer: string) => {
    const faq = await FAQ.findByPk(faqId)
    faq?.update({ answer, question })
    return faq
  }

  getFAQs = async () => await FAQ.findAll()
}

export default FAQService
