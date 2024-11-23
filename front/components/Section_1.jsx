import React, { useEffect } from 'react';
import '@styles/glass.css';

function scrollToBottom() {
  var messageBody = document.getElementById('messageFormeight');
  messageBody.scrollTop = messageBody.scrollHeight;
}   
   
function Section() {
  
  return (
    <div className=' w-screen h-screen rounded-t-3xl bg-[#ffffff] border-2 border-fuchsia-400'>
      <div className='w-full flex flex-col pt-[30vh] justify-center items-center '>

        <div className='frosted-glass-small gap-7 flex flex-col p-16 px-28  rounded-xl border-2 border-[#FF6D40]'>
          <div className='flex flex-col gap-2 font-extrabold text-7xl text-center text-[#2f2f2f]'>
            <p> <span className='text-[#FF6D40]'>AI</span> Chat </p>
            <p>Assistent</p>
          </div>

          <div className='max-w-6xl p-5 mt-5 border-2  border-[#FF6D40] bg-white rounded-3xl'>
            <form id="messageArea" className='flex gap-x-16'>
              <input type="text" id="text" placeholder="Введите сообщение..." />
              <button type="submit" className='border-1 text-lg text-white uppercase p-3 rounded-3xl bg-[#FF6D40]'>send messages </button>
            </form>
            <div id="messageFormeight">
              {/* Здесь будут отображаться сообщения */}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Section;
