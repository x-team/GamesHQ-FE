import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import Swal from "sweetalert2";
import { deleteGameType, getGameTypes } from "../api/gamedev";
import Button from "../ui/Button";

const ListGamesPage = function ListGamesPage(props: any) {
  const maxKeyDisplayLength = 30;
  const [games, setGames] = useState<IGameType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchGames = async () => {
    try {
      setIsLoading(true);
      const games = await getGameTypes();
      setGames(games || []);
      setIsLoading(false);
    } catch (error: any) {
      console.log({ error });
      setErrorMessage(error?.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const handleOnDeleteClick = (game?: IGameType) => async () => {
    if (!game) {
      return;
    }

    const swalResult = await Swal.fire({
      title: `Delete game ${game.id}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (!swalResult.isConfirmed) {
      return;
    }
    setIsLoading(true);
    await deleteGameType(game.id!);
    await fetchGames();
    setIsLoading(false);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold italic font-sans mb-8">MY GAMES</h2>

      <div className="mt-4">
        <a href="/games/new">
          <Button>New Game</Button>
        </a>
      </div>

      {errorMessage && <div>{errorMessage}</div>}

      {isLoading ? (
        <SyncLoader />
      ) : (
        <div className="mt-4">
          {games.map((game: IGameType, index: number) => (
            <>
              <div className="flex justify-between my-4" key={index}>
                <Link to={`/games/${game.id}`}>
                  <div className="grid grid-cols-4 gap-4 items-center justify-between">
                    <div className="w-52">
                      <span className="text-xl font-bold">{game.id}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 font-bold">
                        CLIENT SECRET
                      </span>
                      <div>
                        {game.clientSecret.substring(0, maxKeyDisplayLength)}...
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-400 font-bold">
                        SIGNING SECRET
                      </span>
                      <div>
                        {game.signingSecret.substring(0, maxKeyDisplayLength)}
                        ...
                      </div>
                    </div>
                  </div>
                </Link>
                <button
                  onClick={handleOnDeleteClick(game)}
                  className="text-red-700"
                >
                  DELETE
                </button>
              </div>
              <hr className="my-2" />
            </>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListGamesPage;
