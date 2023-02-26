import backgroundImage from "../../assets/bannerBackground.png";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import HomeFilter from "../../components/homeComponents/HomeFilter";

const Home = () => {
  const handleClick = ()=>{
    console.log("Test click");
    
  }
  return (
    <div className="relative flex flex-col justify-center">
      <div
        className="bg-inherit bg-cover bg-fixed h-screen flex flex-col justify-center items-start w-full"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="pl-24 flex flex-col items-start justify-start">
          <h1 className="text-5xl font-semibold text-white mb-4 sm:text-7xl">
            Find A House <br /> That Suits You
          </h1>
          <h4 className="text-gray sm:text-xl pb-8">
            Want to find or sell all whats related to real estate <br />
            You are in the right place 
          </h4>
          <PrimaryButton title="Let's Go" onClick={()=>handleClick()} width="150px" height="55px"/>
          <div className="flex flex-wrap justify-around pt-8">
            <div className="px-4">
              <h3 className="font-bold text-2xl">2000+</h3>
              <p className="text-gray">Happy user</p>
            </div>          
            <div className="px-4">
              <h3 className="font-bold text-2xl">2000+</h3>
              <p className="text-gray">Happy user</p>
            </div>          
            <div className="px-4">
              <h3 className="font-bold text-2xl">2000+</h3>
              <p className="text-gray">Happy user</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-4/5 self-center flex absolute top-[88%]">
        <HomeFilter/>
      </div>
    </div>
  );
};

export default Home;
