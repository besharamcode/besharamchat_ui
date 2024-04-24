const Pageloader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full flex-col justify-center items-center flex">
        <h1 className="text-center capitalize font-bold text-2xl w-5/6 mx-auto font-jost">
          Besharam Chat
        </h1>
        <div className="loader mt-4"></div>
      </div>
    </div>
  );
};

export default Pageloader;
