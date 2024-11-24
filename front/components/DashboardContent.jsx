import { useEffect, useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { BeatLoader } from "react-spinners";
import Typewriter from "typewriter-effect";

import { Dialog } from "@/components/AnswerContent";

// Пример данных
// const dialogData = [
//   {
//     type: "question",
//     content: "Что такое React?",
//   },
//   {
//     type: "answer",
//     answers: [
//       {
//         description:
//           "React — это библиотека для создания пользовательских интерфейсов.",
//         imageUrl: "",
//       },
//     ],
//   },
//   {
//     type: "question",
//     content: "Покажите логотип React.",
//   },
//   {
//     type: "answer",
//     answers: [
//       {
//         description: "Это логотип React.",
//         imageUrl:
//           "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
//       },
//     ],
//   },
//   {
//     type: "question",
//     content: "Как работает виртуальный DOM?",
//   },
//   {
//     type: "answer",
//     answers: [
//       {
//         description: "Virtual DOM — это легковесная копия реального DOM.",
//         imageUrl:
//           "https://matplotlib.org/3.4.3/_images/sphx_glr_simple_plot_0011.png",
//       },
//       {
//         description:
//           "React сравнивает Virtual DOM с реальным DOM для минимизации изменений.",
//         imageUrl: "",
//       },
//     ],
//   },
// ];

function DashboardContent({ descriptions }) {
  const [dialogData, setDialogData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <div className=" frosted-magenta-small rounded-2xl py-4 px-4 min-h-[32rem] gap-4 flex  border-2 border-white">
      <div className="bg-white border-2 border-gray-300 shadow-2xl rounded-2xl p-2 min-w-96 max-w-96 h-auto">
        <ScrollArea className="h-full max-h-[30rem] w-full rounded-md">
          <h3 className="p-4 font-medium leading-none">File Descriptions</h3>

          {!descriptions.length && <p className="pl-4">No files yet.</p>}

          {descriptions.map((el, i) => (
            <div className="p-4" key={el.name}>
              <h4 className="mb-4 font-medium leading-none">{el.name}</h4>
              <Typewriter
                options={{
                  strings: [el.description],
                  autoStart: true,
                  delay: 3,
                  pauseFor: 1000 * 60 * 60 * 24 * 31,
                }}
              />
            </div>
          ))}

          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </div>

      <div className="bg-white border-2  border-gray-300 shadow-2xl rounded-xl p-2 w-full h-auto">
        <ScrollArea className="h-full max-h-[30rem] w-full rounded-md">
          <div className="p-4">
            <h4 className="mb-4 font-medium leading-none">Dialog</h4>
            {isLoading ? (
              <div className="flex flex-col justify-start items-start">
                <BeatLoader />
              </div>
            ) : error ? (
              <p className="text-red-500">Error: {error}</p>
            ) : (
              !dialogData.length ? 'No messages yet.' : <Dialog dialogData={dialogData} />
            )}
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </div>
    </div>
  );
}

export default DashboardContent;
