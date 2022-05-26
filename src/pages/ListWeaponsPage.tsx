import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import Swal from "sweetalert2";
import { deleteWeapon, getWeapons } from "../api/admin";
import { emojiToImageTag } from "../helpers/emojiHelper";
import { rarityToTextColor } from "../helpers/rarityHelper";
import Button from "../ui/Button";

const ListWeaponsPage = function ListWeaponsPage(props: any) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [itemWeapons, setItemWeapons] = useState<IWeapon[]>([]);

  async function fetchWeapons() {
    try {
      setIsLoading(true);
      const itemWeapons = await getWeapons();
      setItemWeapons(itemWeapons);
      setIsLoading(false);
    } catch (error: any) {
      setErrorMessage(error.message);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchWeapons();
  }, []);

  const handleOnDeleteClick = (id?: number) => async () => {
    const swalResult = await Swal.fire({
      title: "Delete it?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (!id || !swalResult.isConfirmed) {
      return;
    }
    setIsLoading(true);
    await deleteWeapon(id);
    await fetchWeapons();
    setIsLoading(false);
  };

  const sortedWeapons = itemWeapons.sort((a: IWeapon, b: IWeapon) => {
    const rarityToNumber = {
      Common: 0,
      Rare: 1,
      Epic: 2,
      Legendary: 3,
    };
    const aRarityNumber = rarityToNumber[a._itemRarityId];
    const bRarityNumber = rarityToNumber[b._itemRarityId];
    if (aRarityNumber > bRarityNumber) return -1;
    else if (bRarityNumber > aRarityNumber) return 1;
    return 0;
  });

  return (
    <div>
      <h2 className="text-2xl font-bold italic font-sans mb-8">WEAPONS</h2>

      <div className="mt-4">
        <Link to="/weapons/new">
          <Button>New Weapon</Button>
        </Link>
      </div>

      {errorMessage && <div>{errorMessage}</div>}

      {isLoading ? (
        <SyncLoader />
      ) : (
        <div className="mt-4">
          {sortedWeapons.map((weapon: IWeapon, index) => (
            <div>
              <Link to={`weapon/${weapon.id}`}>
                <span key={index}>
                  <div
                    className={`grid grid-cols-4 justify-between font-bold uppercase ${
                      weapon.isArchived ? "opacity-20" : ""
                    } ${rarityToTextColor(weapon._itemRarityId)}`}
                  >
                    <div className="flex">
                      <div>
                        {emojiToImageTag(weapon.emoji, {}, "h-12 w-12")}
                      </div>
                      <div className={`ml-2 flex flex-col`}>
                        <span>
                          {weapon.name}
                          {weapon.isArchived ? " (Archived)" : ""}
                        </span>
                        <span className="font-normal text-sm">
                          {weapon._itemRarityId}
                        </span>
                        <div className="flex text-xs text-gray-600">
                          {weapon._gameItemAvailability.reduce(
                            (acc, gameAvailability, index) => {
                              if (index === 0) {
                                return gameAvailability._gameTypeId;
                              }
                              return acc + ", " + gameAvailability._gameTypeId;
                            },
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-400">DAMAGE</span>
                      <span className="text-xl text-black">
                        {weapon._weapon.minorDamageRate} ~{" "}
                        {weapon._weapon.majorDamageRate}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-400">USAGE LIMIT</span>
                      <span className="text-xl text-black">
                        {weapon.usageLimit || "∞"}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-400">TRAITS</span>
                      <span className="text-sm font-n text-black">
                        {weapon._traits.reduce((acc, trait, index) => {
                          if (index === 0) {
                            return trait.displayName;
                          }
                          return acc + ", " + trait.displayName;
                        }, "")}
                      </span>
                    </div>
                  </div>
                </span>
              </Link>
              <button
                onClick={handleOnDeleteClick(weapon.id)}
                className="text-red-700"
              >
                Delete
              </button>
              <hr className="my-2" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListWeaponsPage;
