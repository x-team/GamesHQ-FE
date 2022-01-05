import { groupBy } from "lodash";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    getAllEmoji,
    getCurrentTowerGameStatus,
    getEnemies,
} from "../api/admin";
import { emojiToImageTag } from "../helpers/emojiHelper";
import AddEnemyToFloorModal from "../ui/AddEnemyToFloorModal";
import Button from "../ui/Button";
import PanelBox from "../ui/PanelBox";

const FloorsEditorPage = () => {
    const [allEmoji, setAllEmoji] = useState<IAllEmoji>({});
    const [, setIsLoading] = useState(false);
    const [towerGame, setTowerGame] = useState<IGameWithTower | null>(null);
    const [enemies, setEnemies] = useState<IEnemy[]>([]);

    useEffect(() => {
        const fetchTowerAndEnemiesData = async () => {
            setIsLoading(true);
            const [enemies, game, allEmoji] = await Promise.all([
                getEnemies(),
                getCurrentTowerGameStatus(),
                getAllEmoji(),
            ]);

            setEnemies(enemies);
            setTowerGame(game);
            setAllEmoji(allEmoji);
            setIsLoading(false);
        };

        fetchTowerAndEnemiesData();
    }, [setTowerGame, setEnemies]);

    if (!towerGame) {
        return (
            <p>
                No tower game found. Create one first{" "}
                <Link className="text-xteamaccent italic" to="/tower/status">
                    here
                </Link>
                .
            </p>
        );
    }

    if (!enemies.length) {
        return (
            <p>
                No enemies available to add to the floors. Create some{" "}
                <Link className="text-xteamaccent italic" to="/enemies">
                    here
                </Link>
                .
            </p>
        );
    }

    return (
        <section>
            <h2 className="text-2xl font-bold italic font-sans mb-8">
                FLOOR EDITOR
            </h2>

            <FloorsEditor
                allEmoji={allEmoji}
                enemies={enemies}
                towerGame={towerGame}
            />
        </section>
    );
};

interface IFloorEditorProps {
    enemies: IEnemy[];
    towerGame: IGameWithTower;
    allEmoji: IAllEmoji;
}

const FloorsEditor = ({ enemies, towerGame, allEmoji }: IFloorEditorProps) => {
    const [showAddEnemyModal, setShowAddEnemyModal] = useState(false);
    const [editingFloor, setEditingFloor] = useState<ITowerFloor | null>(null);

    const renderFloor = (floor: ITowerFloor) => {
        const floorEnemies = floor._floorEnemies?.map(
            (floorEnemy) => floorEnemy._enemy
        );

        const groupedByEnemies = groupBy(floorEnemies, "name");

        const handleOpenEditFloorModal = (floor: ITowerFloor) => () => {
            setEditingFloor(floor);
            setShowAddEnemyModal(true);
        };

        return (
            <PanelBox className="block my-4" key={floor.number}>
                <div className="flex justify-between">
                    <span className="text-xteamaccent font-extrabold font-sans text-lg italic">
                        Floor {floor.number}
                    </span>

                    <div>
                        <Button onClick={handleOpenEditFloorModal(floor)}>
                            +
                        </Button>
                    </div>
                </div>

                <div className="mt-4">
                    {Object.keys(groupedByEnemies).map((enemyKey) => (
                        <div>
                            {groupedByEnemies[enemyKey].length}x{" "}
                            {emojiToImageTag(
                                groupedByEnemies[enemyKey][0].emoji,
                                allEmoji
                            )}
                        </div>
                    ))}
                </div>
            </PanelBox>
        );
    };

    return (
        <div>
            <AddEnemyToFloorModal
                floor={editingFloor}
                show={showAddEnemyModal}
                allEmoji={allEmoji}
                allEnemies={enemies}
                onClose={() => setShowAddEnemyModal(false)}
            />
            <section className="mb-4">
                {towerGame._tower._floors
                    ?.sort((a, b) => a.number - b.number)
                    .map((floor) => renderFloor(floor))}
            </section>
        </div>
    );
};

export default FloorsEditorPage;
