

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import BillingComponent from './BillingComponent'
import ShippingInformationPage from './ShippingInformationPage'


const Checkout = () => {
  return (
    <div>
      <Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Billing Information</AccordionTrigger>
    <AccordionContent>
      <BillingComponent/>
    </AccordionContent>
  </AccordionItem>
    <AccordionItem value="item-2">
        <AccordionTrigger>Shipping Information</AccordionTrigger>
        <AccordionContent>
        <ShippingInformationPage/>
        </AccordionContent>
    </AccordionItem>
</Accordion>
    </div>
  )
}

export default Checkout
