import { useState } from "react";
import { Input } from "./ui/input";
import { ArrowUp, Plus } from "lucide-react";

function DashboardSearch({ updateDialogData, setIsLoading }) {
  const [queryNumber, setQueryNumber] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [prompts, setPrompts] = useState([]);

  const handleAddPrompt = () => {
    if (inputValue.trim() === '') return; // Не добавляем пустые сообщения
    setPrompts([...prompts, inputValue]); // Добавляем новое сообщение в массив
    setQueryNumber(queryNumber + 1); // Увеличиваем счетчик
    setInputValue(''); // Очищаем поле ввода
  };

  const handleArrowClick = async () => {
    let finalPrompts = []

    setInputValue('')

    if (inputValue.trim().length) finalPrompts.push(inputValue.trim())
    finalPrompts = [...finalPrompts, ...prompts]

    if (finalPrompts.length === 0) return;

    setIsLoading(true);

    try {
      const response = await fetch('http://147.232.172.217:8000/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_queries: finalPrompts }),
      });
  
      if (response.ok) {
        const data = await response.json();

        updateDialogData([
          {
            type: "question",
            content: finalPrompts.join(". ")
          },
          {
            type: "answer",
            answers: data.map((answer) => ({
              description: answer.response,
              imageUrl: answer.plot_paths.length ? `http://147.232.172.217:8000/plots/${answer.plot_paths[0]}` : null
            })) || []
          }
        ])


      } else {
        console.error('Failed to send prompts:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending prompts:', error);
    } finally {
      setIsLoading(false);
      setQueryNumber(0);
      setPrompts([]);
    }
  };

  const buttonBackgroundColor_1 = inputValue.trim() === '' ? 'bg-[#DC61AD]' : 'bg-[#E2097A]';
  const buttonBackgroundColor_2 = inputValue.trim() === '' && prompts.length === 0 ? 'bg-[#DC61AD]' : 'bg-[#E2097A]';

  return (
    <div className="flex flex-row items-center frosted-magenta-small border-2 border-[#ffffff] h-auto py-3 px-4 w-full rounded-xl gap-5">
      <Input
        placeholder="Write your query here..."
        className="flex-grow max-h-[150px]"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        multiline={true}
        rows={2}
      />

      <div className="flex flex-row gap-4 justify-center">
        <div
          className={`my-2 flex justify-center h-auto w-[180px] flex-col rounded-full hover:scale-95 duration-300 ${buttonBackgroundColor_1}`}
          onClick={handleAddPrompt}
        >
          <div className="flex justify-center items-center p-2 rounded-full relative">
            {queryNumber === 0 ? (
              <div className="flex items-center gap-2 select-none ">
                <span className="text-white font-semibold text-sm py-1">Add Prompt </span>
                <Plus className="text-white" />
              </div>
            ) : (
              <div className="flex gap-2 flex-row items-center">
                <Plus className="text-white" />
                <div className="flex gap-1 flex-row text-white text-sm font-semibold select-none ">
                  <p>Total</p>
                  <p>Prompts</p>
                </div>
                <div className="text-white text-md border-2 border-white rounded-3xl px-2 font-bold">
                  {queryNumber}
                </div>
              </div>
            )}
          </div>
        </div>
 
        <div
          className={`my-2 px-1 flex justify-center h-auto w-auto flex-col rounded-full flex-shrink-0 hover:scale-95 duration-300 ${buttonBackgroundColor_2}`}
          onClick={handleArrowClick}
        >
          <div className="flex justify-center items-center p-2 rounded-full" >
            <ArrowUp className="text-white " />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardSearch;
