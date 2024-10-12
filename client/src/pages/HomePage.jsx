function HomePage() {
  return (
    <div>
      <div className="bg-banner-one-piece h-[300px] bg-center flex justify-around">
        <div className="text-white p-8 w-[50%] flex justify-around flex-col">
          <h1 className="font-bold text-6xl">LEGENDARY TREASURES AWAIT</h1>
          <p className="text-lg">
            Exclusive One Piece 25th Anniversary collectibles are available for
            a limited time! Pre-order now!.
          </p>
        </div>
        <div className="flex justify-center items-center">
          <img src="../../public/luffy-zoro.png" className="h-full" />
        </div>
      </div>
      <div className="flex h-[300px] pt-1">
        <div>
          <img src="../../public/BANNER.jpg" className="w-full h-full" />
        </div>
        <div>
          <img src="../../public/BANNER-2.jpg" className="w-full h-full" />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
