import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const Answer = ({ description, imageUrl }) => {
  return (
    <div className="flex flex-col">
      {description && <p style={{ marginBottom: "10px" }}>{description}</p>}
      {imageUrl && (
        <img
          className="mt-5"
          src={imageUrl}
          alt="Response image"
          style={{ maxWidth: "450px", maxHeight: "450px", borderRadius: "10px" }}
        />
      )}
    </div>
  );
};

// Основной компонент для диалога
export const Dialog = ({ dialogData }) => {
  return (
    <div>
      {dialogData.map((entry, index) => (
        <div
          className=" text-lg px-5 py-2"
          key={index}
          style={{
            marginBottom: "20px",
            borderTopLeftRadius: entry.type === "question" ? "20px" : "20px",
            borderTopRightRadius: entry.type === "question" ? "20px" : "20px",
            borderBottomLeftRadius: entry.type === "question" ? "0px" : "20px",
            borderBottomRightRadius: entry.type === "question" ? "20px" : "0px",
            backgroundColor:
              entry.type === "question" ? "#F3F3F3" : "#e2097a17",
          }}
        >
          {entry.type === "question" ? (
            <>
              <div className="font-bold text-lg text-black ">User</div>
              <p>{entry.content}</p>
            </>
          ) : (
            <>
              <div className="font-bold text-lg text-[#E2097A]">Allyce</div>
              {entry.answers.length > 1 ? (
                <div className="flex items-center justify-center">
                  <Carousel className="w-full">
                    <CarouselContent>
                      {entry.answers.map((answer, idx) => (
                        <CarouselItem key={`item-${idx}`}>
                          <div className="p-1 ">
                            <Answer
                              description={answer.description}
                              imageUrl={answer.imageUrl}
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                  </Carousel>
                </div>
              ) : (
                <Answer
                  description={entry.answers[0].description}
                  imageUrl={entry.answers[0].imageUrl}
                />
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
};
