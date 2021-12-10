// import React, { Fragment, useRef, useState } from "react";
// import { useRecoilState } from "recoil";
// import { Popover, Transition } from "@headlessui/react";
// import { CameraIcon } from "@heroicons/react/outline";
// import { guestModalState } from "../../atoms/modalAtom";

// function GuestModal() {
//   const [open, setOpen] = useRecoilState(guestModalState);

//   return (
//     <Popover className="relative">
//       <Popover.Button>Solutions</Popover.Button>

//       <Popover.Panel className="absolute z-10 top-16">
//         <div className="grid grid-cols-2">
//           <a href="/analytics">Analytics</a>
//           <a href="/engagement">Engagement</a>
//           <a href="/security">Security</a>
//           <a href="/integrations">Integrations</a>
//         </div>

//         <img src="/solutions.jpg" alt="" />
//       </Popover.Panel>
//     </Popover>
//   );
// }

// export default GuestModal;

/*
<Popover className="relative">
  {({ open }) => (
    <>
      <div onClick={handleGuestSelected}>
        <Popover.Button
          className={
            guestSelected && open
              ? `flex items-center justify-center border-3 flex-grow h-16 px-2 py-1 transition bg-white shadow-2xl duration-150 ease-out rounded-full cursor-pointer min-w-[10rem] `
              : `flex items-center justify-center flex-grow h-16 px-2 py-1 transition duration-150 ease-out rounded-full cursor-pointer min-w-[10rem] hover:bg-gray-200 hover:bg-opacity-75`
          }
        >
          Guests
        </Popover.Button>
      </div>

      <Popover.Panel className="absolute z-10 p-5 bg-white border-[0.3px] shadow-2xl rounded-2xl top-20 left-1">
        <div className="flex items-center space-x-4">
          <button onClick={decrementGuestCount}>
            <MinusCircleIcon
              className={
                guestCount > 0
                  ? `h-8 text-gray-500`
                  : `h-8 text-gray-300 opacity-75 cursor-not-allowed`
              }
            />
          </button>
          <p>{guestCount}</p>
          <button onClick={incrementGuestCount}>
            <PlusCircleIcon
              className={
                guestCount < 5
                  ? `h-8 text-gray-500`
                  : `h-8 text-gray-300 opacity-75 cursor-not-allowed`
              }
            />
          </button>
        </div>
      </Popover.Panel>
    </>
  )}
</Popover>;

*/
