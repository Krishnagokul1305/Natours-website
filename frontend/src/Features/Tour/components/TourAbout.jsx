
function TourAbout({ img, description, name, maxGroupSize, duration, place }) {
  return (
    <div className="px-5 py-20 flex flex-wrap flex-col md:flex-row ">
      <div className="space-y-7 max-w-[50rem] mx-auto flex-1 flex item flex-col justify-center md:px-10 px-5">
        <h1 className="text-2xl font-bold text-ptext font-oswald tracking-widest head text-center">
          About {name}
        </h1>
        <p className="text-gray-600 leading-5 md:leading-8 text-sm md:text-base">
          {description}
        </p>
      </div>
      <div className="mt-10 md:w-1/2">
        <img
          src={`http://127.0.0.1:8000/api/v1/public/img/toursCover/${img}`}
          alt=""
          className="h-auto w-[90%] object-contain m-auto"
        />
      </div>
    </div>
  );
}

export default TourAbout;
