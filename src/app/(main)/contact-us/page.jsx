import React from 'react'
import ContactForm from '../../../components/ContactUs/ContactForm'
import Breadcrumb from '../../../components/Breadcrumb'
function page() {

  
  return (
    <div>
        <Breadcrumb/>
        <div className='flex flex-col justify-center items-center  lg:space-y-4 space-y-2 bg-amber-100 m-4 py-14 rounded-lg'>
            <h1 className='lg:text-5xl text-3xl font-bold uppercase'>Contact Us</h1>
            <p className='lg:w-[50%] w-[85%] lg:text-md text-sm text-center text-neutral-500'>We value your inquiries and feedback at HYRUN. Don’t hesitate to reach out to us if you have any questions, need assistance, or just want to connect.</p>
        </div>
        <ContactForm/> 
    </div>
  )
}

export default page