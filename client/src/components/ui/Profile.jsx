const Profile = ({ handleEvent }) => {
  return (
    <div
      className="rounded-full flex items-center m-2 justify-center cursor-pointer text-white text-[1rem] bg-[#FF5733] h-[35px] w-[35px]"
      onClick={handleEvent}
    >
      P
    </div>
  );
};

export default Profile;
