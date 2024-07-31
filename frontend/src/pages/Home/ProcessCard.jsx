function ProcessCard({ icon, title, description,i }) {
  return (
    <div className={`w-[150px] space-y-5 font-poppins ${i%2!=0?"md:mt-28":""}`}>
      <div className="rounded-full flex items-center justify-center p-5 bg-white w-[120px] h-[120px] mx-auto">
        <img src={icon} alt="" className="h-[40px]"/>
      </div>
      <div className="text-center space-y-2">
        <h1 className="font-semibold text-gray-900">{title}</h1>
        <p className="text-gray-800">{description}</p>
      </div>
    </div>
  );
}

export default ProcessCard;
