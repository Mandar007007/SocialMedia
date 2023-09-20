import Items from "./Items";
import UserDetails from "./UserDetails";

function SideMenu({ isMobile, closeProfile, openProfile }) {
  return (
    <>
      <div className="ml-20 sticky top-2 left-0">
        <img
          className="w-14 h-14 ml-auto mr-auto"
          src="/images/logo.svg"
          alt=""
        />
        <UserDetails />
        <Items
          isMobile={isMobile}
          closeProfile={closeProfile}
          openProfile={openProfile}
        />
      </div>
    </>
  );
}

export default SideMenu;
