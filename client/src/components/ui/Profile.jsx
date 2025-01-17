const Profile = ({ handleEvent }) => {
  const getRandomBg = () => {
    const bg = [
      "#FF5733", // Vibrant orange
      "#33FF57", // Lime green
      "#3357FF", // Bright blue
      "#FF33A6", // Hot pink
      "#FFC300", // Golden yellow
      "#DAF7A6", // Pastel green
      "#900C3F", // Deep maroon
      "#581845", // Purple
    ];
    return bg[Math.floor(Math.random() * bg.length)];

    
  };

  return (
    <div
      style={{
        backgroundColor: getRandomBg(), // Set a random background color
        height: "35px", // Example height for the div
        width: "35px", // Example width for the div
      }}
      className="rounded-full flex items-center m-2 justify-center cursor-pointer text-white text-[1rem] "
      onClick={handleEvent}
    >
      R
    </div>
  );
};

export default Profile;
