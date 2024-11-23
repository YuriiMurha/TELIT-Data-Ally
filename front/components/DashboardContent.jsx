import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Chart } from "./Chart";
import Typewriter from 'typewriter-effect';import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
);

function DashboardContent() {
  return (
    <div className=" frosted-magenta-small rounded-2xl py-4 px-4 min-h-[32rem] gap-4 flex  border-2 border-white">
      <div className="bg-white border-2 border-gray-300 shadow-2xl rounded-2xl p-2 min-w-96 max-w-96 h-auto">
        <ScrollArea className="h-full max-h-[30rem] w-full rounded-md">
          <div className="p-4">
            <h4 className="mb-4 font-medium leading-none">Description</h4>
            <Typewriter 
              options={{
                strings: ['Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi corrupti soluta, deserunt fugiat reprehenderit mollitia nam excepturi, saepe, maiores quaerat quisquam nisi magni laborum blanditiis delectus at ad? Temporibus, officiis?'],
                autoStart: true,
                delay: 50,
                pauseFor: 99999999999999
              }}
            />
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </div>
      <div className="bg-white border-2  border-gray-300 shadow-2xl rounded-xl p-2 w-full h-auto">
        <ScrollArea className="h-full max-h-[30rem] w-full rounded-md">
          <div className="p-4">
            <h4 className="mb-4 font-medium leading-none">Tags</h4>
            {/* {tags.map((tag) => (
              <>
                <div key={tag} className="">
                  {tag}
                </div>
              </>
            ))} */}
            <div className="flex items-center justify-center">
            <Carousel className="w-full max-w-3xl">
              <div>
              <CarouselContent>
               {Array.from({ length: 5 }).map((_, num) => (
                  <CarouselItem key={`item-${num}`}>
                    <div className="p-1">
                          <Chart />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
              </div>
            </Carousel>
            </div>
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </div>
    </div>
  );
}

export default DashboardContent;
