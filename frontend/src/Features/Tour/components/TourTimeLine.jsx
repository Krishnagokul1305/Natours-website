import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { flagWhite, logoWhite } from  "../../../assets/index";

function TourTimeLine({ locations, startLocation }) {
  const locationsArr = [startLocation, ...locations];
  return (
    <div className="h-auto py-10 bg-gray-100 px-5">
      <h1 className="text-3xl font-bold text-ptext font-oswald tracking-widest head text-center mb-10">
        Destinations
      </h1>
      <VerticalTimeline>
        {locationsArr.map((location, i) => (
          <VerticalTimelineElement
            key={location.id}
            className="vertical-timeline-element--work"
            contentStyle={{
              background: "rgb(255,255,255)",
              color: "rgba(30, 121, 139)",
              borderRadius: "5px",
              position: "relative",
              overflow: "hidden",
            }}
            iconStyle={{
              background:
                "linear-gradient(to right, rgba(97, 218, 214), rgba(30, 121, 139))",
              color: "#fff",
              border: "0px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              fontWeight: "bold",
            }}
            icon={
              <p className="font-extrabold">
                <img src={flagWhite} alt="" className="w-[24px]" />
              </p>
            }
          >
            <div className="flex relative">
              <div className="bg-primary  rounded-full md:translate-x-[-60%] translate-x-[-70%] w-[100px] md:h-[100px] h-[100px]  flex items-center justify-center shadow-lg">
                <img
                  src={logoWhite}
                  alt="Natours logo"
                  className="object-contain h-[6rem]"
                />
              </div>

              <div className="flex items-center gap-5 flex-row">
                <div className=" space-y-1 md:space-y-2">
                  <h2 className="font-semibold text-ptext md:text-2xl">
                    {location.description}
                  </h2>
                  <p className="text-gray-500 text-xs md:text-lg">
                    Day {i + 1}
                  </p>
                </div>
              </div>
            </div>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  );
}

export default TourTimeLine;
