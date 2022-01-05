import { useState } from "react";
import { updateFloor } from "../../api/admin";
import { emojiToImageTag } from "../../helpers/emojiHelper";
import Button from "../Button";
import Modal from "../Modal";

interface IProps {
    show: boolean;
    onClose: () => void;
    floor: ITowerFloor | null;
    allEnemies: IEnemy[];
    allEmoji: IAllEmoji;
}

const AddEnemyToFloorModal = ({
    show,
    onClose,
    floor,
    allEnemies,
    allEmoji,
}: IProps) => {
    const [floorEnemies, setFloorEnemies] = useState<IEnemy[]>([]);

    if (!floor) {
        return null;
    }

    const handleOnSaveButtonClick = () => {
        const floorId = floor.id;
        const enemyIds = floorEnemies.map((enemy) => enemy.id) as number[];

        if (!floorId || !enemyIds) {
            return;
        }
        updateFloor(floorId, {
            enemyIds,
        });
    };

    const handleOnAddEnemyClick =
        (enemy: IEnemy) => (event: React.MouseEvent<HTMLElement>) => {
            setFloorEnemies([...floorEnemies, enemy]);
        };

    const handleOnRemoveEnemyClick =
        (enemyToRemove: IEnemy) => (event: React.MouseEvent<HTMLElement>) => {
            const newFloorEnemiesArray = [...floorEnemies];
            const indexOfEnemy = newFloorEnemiesArray.indexOf(enemyToRemove);
            newFloorEnemiesArray.splice(indexOfEnemy, 1);

            setFloorEnemies(newFloorEnemiesArray);
        };

    return (
        <section>
            <Modal show={show} onClose={onClose}>
                <h2 className="text-xteamaccent font-extrabold italic text-xl">
                    Add Enemy to Floor {floor.number}
                </h2>

                <div className="flex space-between w-full mt-4">
                    <div className="w-full h-96 bg-xteamaccent">
                        <p className="text-xl text-white text-center mb-4 uppercase">
                            All enemies
                        </p>
                        <div className="grid grid-cols-4 gap-3">
                            {allEnemies.map((enemy) => {
                                return (
                                    <span
                                        className="cursor-pointer"
                                        onClick={handleOnAddEnemyClick(enemy)}
                                    >
                                        {emojiToImageTag(
                                            enemy.emoji,
                                            allEmoji,
                                            "h-12 w-12"
                                        )}
                                    </span>
                                );
                            })}
                        </div>
                    </div>
                    <div className="w-full bg-green-500">
                        <p className="text-xl text-white text-center mb-4 uppercase">
                            Floor Enemies
                        </p>
                        <div className="grid grid-cols-4 gap-3">
                            {floorEnemies.map((enemy) => {
                                return (
                                    <span
                                        className="cursor-pointer"
                                        onClick={handleOnRemoveEnemyClick(
                                            enemy
                                        )}
                                    >
                                        {emojiToImageTag(
                                            enemy.emoji,
                                            allEmoji,
                                            "h-12 w-12"
                                        )}
                                    </span>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="mt-4 flex justify-center">
                    <Button type="button" onClick={handleOnSaveButtonClick}>
                        Save
                    </Button>
                </div>
            </Modal>
        </section>
    );
};

export default AddEnemyToFloorModal;
