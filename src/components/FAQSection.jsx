import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ = ({ question, answer }) => (
  <AccordionItem value={question}>
    <AccordionTrigger>{question}</AccordionTrigger>
    <AccordionContent>{answer}</AccordionContent>
  </AccordionItem>
);

const FAQSection = ({ items, image, contactEmail }) => {
  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              {items.map((item, index) => (
                <FAQ key={index} question={item.question} answer={item.answer} />
              ))}
            </Accordion>
            {contactEmail && (
              <p className="mt-6 text-gray-600">
                Still have questions? Contact us at{' '}
                <a href={`mailto:${contactEmail}`} className="text-blue-600 hover:underline">
                  {contactEmail}
                </a>
              </p>
            )}
          </div>
          {image && (
            <div className="hidden md:block">
              <img src={image} alt="FAQ illustration" className="w-full h-auto object-cover rounded-lg shadow-lg" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FAQSection;