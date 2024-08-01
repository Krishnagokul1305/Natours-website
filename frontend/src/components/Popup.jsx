
function Popup({ status ="loading..."}) {
  return <div className="fixed top-10 px-7 py-4 md:text-lg">
   <div className="loader"></div>
  </div>;
}

export default Popup;
