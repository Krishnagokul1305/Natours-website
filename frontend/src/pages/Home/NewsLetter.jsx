import Button from "../../components/Button";

function NewsLetter() {
  return (
    <div className="md:px-20 px-12 py-24 flex items-center justify-center flex-col gap-5">
      <h1 className="text-2xl font-bold text-gray-700 font-oswald tracking-widest head text-center">
        Subscribe to our Newsletter
      </h1>
      <p className="text-gray-500 text-sm text-center md:text-base">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio
        consequuntur eum beatae doloribus quas expedita iure, tenetur ratione
        dolores vel?
      </p>
      <form className="mt-5 flex items-center md:gap-3 gap-1">
        <input
          type="email"
          className="px-5 py-3 w-60 border border-blue-300 rounded-lg md:w-[20rem] transition-all duration-300 placeholder:text-gray-500 focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="enter your email"
        />
        <Button type="big" variant="secondary">
          Subscribe
        </Button>
      </form>
    </div>
  );
}

export default NewsLetter;
