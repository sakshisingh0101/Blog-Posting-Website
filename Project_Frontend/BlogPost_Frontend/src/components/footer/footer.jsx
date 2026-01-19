// import React from 'react'
// import { Link } from 'react-router-dom'
// // import Logo from '.Logo.jsx'

// function Footer() {
//   return (
//     <section className="relative overflow-hidden py-10 bg-gray-400 border border-t-2 border-t-black">
//             <div className="relative z-10 mx-auto max-w-7xl px-4">
//                 <div className="-m-6 flex flex-wrap">
//                     <div className="w-full p-6 md:w-1/2 lg:w-5/12">
//                         <div className="flex h-full flex-col justify-between">
//                             {/* <div className="mb-4 inline-flex items-center">
//                                 <Logo width="100px" />
//                             </div> */}
//                             <div>
//                                 <p className="text-sm text-gray-600">
//                                     &copy; Copyright 2023. All Rights Reserved by DevUI.
//                                 </p>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="w-full p-6 md:w-1/2 lg:w-2/12">
//                         <div className="h-full">
//                             <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-500">
//                                 Company
//                             </h3>
//                             <ul>
//                                 <li className="mb-4">
//                                     <Link
//                                         className=" text-base font-medium text-gray-900 hover:text-gray-700"
//                                         to="/"
//                                     >
//                                         Features
//                                     </Link>
//                                 </li>
//                                 <li className="mb-4">
//                                     <Link
//                                         className=" text-base font-medium text-gray-900 hover:text-gray-700"
//                                         to="/"
//                                     >
//                                         Pricing
//                                     </Link>
//                                 </li>
//                                 <li className="mb-4">
//                                     <Link
//                                         className=" text-base font-medium text-gray-900 hover:text-gray-700"
//                                         to="/"
//                                     >
//                                         Affiliate Program
//                                     </Link>
//                                 </li>
//                                 <li>
//                                     <Link
//                                         className=" text-base font-medium text-gray-900 hover:text-gray-700"
//                                         to="/"
//                                     >
//                                         Press Kit
//                                     </Link>
//                                 </li>
//                             </ul>
//                         </div>
//                     </div>
//                     <div className="w-full p-6 md:w-1/2 lg:w-2/12">
//                         <div className="h-full">
//                             <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-500">
//                                 Support
//                             </h3>
//                             <ul>
//                                 <li className="mb-4">
//                                     <Link
//                                         className=" text-base font-medium text-gray-900 hover:text-gray-700"
//                                         to="/"
//                                     >
//                                         Account
//                                     </Link>
//                                 </li>
//                                 <li className="mb-4">
//                                     <Link
//                                         className=" text-base font-medium text-gray-900 hover:text-gray-700"
//                                         to="/"
//                                     >
//                                         Help
//                                     </Link>
//                                 </li>
//                                 <li className="mb-4">
//                                     <Link
//                                         className=" text-base font-medium text-gray-900 hover:text-gray-700"
//                                         to="/"
//                                     >
//                                         Contact Us
//                                     </Link>
//                                 </li>
//                                 <li>
//                                     <Link
//                                         className=" text-base font-medium text-gray-900 hover:text-gray-700"
//                                         to="/"
//                                     >
//                                         Customer Support
//                                     </Link>
//                                 </li>
//                             </ul>
//                         </div>
//                     </div>
//                     <div className="w-full p-6 md:w-1/2 lg:w-3/12">
//                         <div className="h-full">
//                             <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-500">
//                                 Legals
//                             </h3>
//                             <ul>
//                                 <li className="mb-4">
//                                     <Link
//                                         className=" text-base font-medium text-gray-900 hover:text-gray-700"
//                                         to="/"
//                                     >
//                                         Terms &amp; Conditions
//                                     </Link>
//                                 </li>
//                                 <li className="mb-4">
//                                     <Link
//                                         className=" text-base font-medium text-gray-900 hover:text-gray-700"
//                                         to="/"
//                                     >
//                                         Privacy Policy
//                                     </Link>
//                                 </li>
//                                 <li>
//                                     <Link
//                                         className=" text-base font-medium text-gray-900 hover:text-gray-700"
//                                         to="/"
//                                     >
//                                         Licensing
//                                     </Link>
//                                 </li>
//                             </ul>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//   )
// }

// export default Footer

import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-gray-400 border-t-2 border-black">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Column 1 */}
          <div className="flex flex-col justify-between">
            <p className="text-sm text-gray-700">
              &copy; 2023. All Rights Reserved by DevUI.
            </p>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase text-gray-600">
              Company
            </h3>
            <ul className="space-y-3">
              <li><Link className="footer-link" to="/">Features</Link></li>
              <li><Link className="footer-link" to="/">Pricing</Link></li>
              <li><Link className="footer-link" to="/">Affiliate Program</Link></li>
              <li><Link className="footer-link" to="/">Press Kit</Link></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase text-gray-600">
              Support
            </h3>
            <ul className="space-y-3">
              <li><Link className="footer-link" to="/">Account</Link></li>
              <li><Link className="footer-link" to="/">Help</Link></li>
              <li><Link className="footer-link" to="/">Contact Us</Link></li>
              <li><Link className="footer-link" to="/">Customer Support</Link></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase text-gray-600">
              Legals
            </h3>
            <ul className="space-y-3">
              <li><Link className="footer-link" to="/">Terms & Conditions</Link></li>
              <li><Link className="footer-link" to="/">Privacy Policy</Link></li>
              <li><Link className="footer-link" to="/">Licensing</Link></li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  )
}

export default Footer
