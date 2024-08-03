import { useRouteError } from "react-router-dom";

function ErrorElement() {
  let error = useRouteError();
  console.log(error.message)
  if (error.message.includes("loader")) error = "failed to fetch the data";
  return (
    <div className="flex items-center justify-center h-screen flex-col gap-5">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100"
          height="100"
          viewBox="0 0 32 32"
          id="error"
          fill="#282828"
        >
          <path d="M23.214.586A2 2 0 0 0 21.798 0H10.202c-.53 0-1.04.21-1.414.586l-8.2 8.202A1.985 1.985 0 0 0 0 10.202V21.8c0 .53.21 1.04.586 1.414l8.2 8.202c.376.374.884.584 1.416.584H21.8c.53 0 1.04-.21 1.414-.586l8.2-8.202c.376-.374.586-.882.586-1.414V10.202c0-.53-.21-1.04-.586-1.414l-8.2-8.202zM16 20a2 2 0 0 1-2-2V6a2 2 0 0 1 4 0v12a2 2 0 0 1-2 2zm2 6a2 2 0 1 1-4.001-.001A2 2 0 0 1 18 26z"></path>
        </svg>
      </div>
      <h1>{error} 🥲</h1>
    </div>
  );
}

export default ErrorElement;
