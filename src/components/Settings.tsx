// import { useRef, useState } from "react";



// const Settings = () => {
//     const modalRef = useRef<HTMLDivElement>(null);
//     const [number1, setNumber1] = useState(0);
//     const [number2, setNumber2] = useState(0);
    
//     return (
//         <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
//             <div ref={modalRef} className="bg-gray-800 rounded-lg shadow-lg p-6 w-1/3">

//               <h2 className="text-xl font-semibold text-white mb-4">Settings</h2>

//               {/* Toggle Switches */}
//               <div className="mb-4">
//                 <label className="block text-white text-sm font-bold mb-2 flex items-center justify-between" htmlFor="toggle1">
//                   Enhanced Option 1
//                   <div className="relative">
//                     <input type="checkbox" id="toggle1" className="sr-only" />
//                     <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
//                     <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
//                   </div>
//                 </label>
//               </div>

//               <div className="mb-4">
//                 <label className="block text-white text-sm font-bold mb-2 flex items-center justify-between" htmlFor="toggle2">
//                   Enhanced Option 2
//                   <div className="relative">
//                     <input type="checkbox" id="toggle2" className="sr-only" />
//                     <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
//                     <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
//                   </div>
//                 </label>
//               </div>

//               {/* Number Fields */}
//               <div className="mb-4">
//                 <label className="block text-white text-sm font-bold mb-2" htmlFor="number1">
//                   Number 1
//                 </label>
//                 <div className="flex items-center space-x-2">
//                   <button onClick={() => setNumber1(prev => prev - 1)}>-</button>
//                   <input
//                     type="number"
//                     id="number1"
//                     className="w-full rounded-lg focus:ring focus:ring-opacity-50 focus:ring-indigo-300"
//                     value={number1}
//                     onChange={(e) => setNumber1(Number(e.target.value))}
//                   />
//                   <button onClick={() => setNumber1(prev => prev + 1)}>+</button>
//                 </div>
//               </div>

//               <div className="mb-4">
//                 <label className="block text-white text-sm font-bold mb-2" htmlFor="number2">
//                   Number 2
//                 </label>
//                 <div className="flex items-center space-x-2">
//                   <button onClick={() => setNumber1(prev => prev + 1)}>+</button>
//                   <input
//                     type="number"
//                     id="number2"
//                     className="w-full rounded-lg focus:ring focus:ring-opacity-50 focus:ring-indigo-300"
//                     value={number2}
//                     onChange={(e) => setNumber2(Number(e.target.value))}
//                   />
//                   <button onClick={() => setNumber2((prev: number) => Math.max(0, prev - 1))}>-</button>
//                 </div>
//               </div>

//               {/* Close Button */}
//               <div className="flex justify-end mt-6">
//                 <button
//                   onClick={closeSettings}
//                   className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//     );
// }   

// export default Settings;