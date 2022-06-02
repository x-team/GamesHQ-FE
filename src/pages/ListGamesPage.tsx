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
              <div className="grid grid-cols-10" key={index}>
                <Link to={`/games/${game.id}`} className="col-span-3 py-4">
                  <div className="grid items-center justify-between">
                    <div>
                      <span className="text-xl font-bold">{game.name}</span>
                    </div>
                    <table className="shadow-lg bg-white border-collapse">
                      <tr>
                        <th className="bg-gray-100 border text-left px-2 py-4">
                          <span className="text-gray-400 font-bold">
                            CLIENT SECRET
                          </span>
                        </th>
                      </tr>
                      <tr>
                        <td className="border px-2 py-4">
                          {game.clientSecret.substring(0, maxKeyDisplayLength)}
                          ...
                        </td>
                      </tr>

                      <tr>
                        <th className="bg-gray-100 border text-left px-2 py-4">
                          <span className="text-gray-400 font-bold">
                            SIGNING SECRET
                          </span>
                        </th>
                      </tr>
                      <tr>
                        <td className="border px-2 py-4">
                          {game.signingSecret.substring(0, maxKeyDisplayLength)}
                          ...
                        </td>
                      </tr>
                    </table>
                    <div className="my-4">
                      <Button onClick={handleOnDeleteClick(game)}>
                        DELETE
                      </Button>
                    </div>
                  </div>
                </Link>
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
