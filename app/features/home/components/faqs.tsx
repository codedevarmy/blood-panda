import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion"

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { faqs } from "~/constants"

export default function FAQs() {
  return (
    <section>
      <Card
        className={"rounded-none border-0 bg-transparent shadow-none ring-0"}
      >
        <CardHeader>
          <CardTitle>
            <h3 className={"text-center text-3xl"}>
              Frequently Asked Questions
            </h3>
          </CardTitle>
        </CardHeader>

        <CardContent className={"mx-auto w-full max-w-xl"}>
          <Accordion type="single">
            {faqs.map((faq) => {
              return (
                <AccordionItem value={faq.id} key={faq.id}>
                  <AccordionTrigger>
                    <h5 className={"text-base font-semibold"}>
                      {faq.question}
                    </h5>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p>{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              )
            })}
          </Accordion>
        </CardContent>
      </Card>
    </section>
  )
}
