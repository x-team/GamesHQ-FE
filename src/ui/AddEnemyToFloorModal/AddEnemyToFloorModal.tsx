import { groupBy } from "lodash";
import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import { updateFloor } from "../../api/admin";
import { emojiToImageTag } from "../../helpers/emojiHelper";
import Button from "../Button";
import Modal from "../Modal";

interface IProps {
    show: boolean;
    onClose: (reload:boolean) => void;
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

    const handleOnSaveButtonClick = async () => {
        try{
            const floorId = floor?.id;
            const enemyIds = floorEnemies.map((enemy) => enemy.id) as number[];
    
            if (!floorId || !enemyIds) {
                return;
            }
            await updateFloor(floorId, {
                enemyIds,
            });
            onClose(true);
            setFloorEnemies([]);
            toast('Floor edited successfuly.', {
                type: 'success',
            });
        } catch(err: any) {
            toast(`Error adding enemies to floor. ${err?.message} `, {
                type: 'error',
            })
        }
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

    const handleCloseModal = () => {
        onClose(false);
        setFloorEnemies([]);
    }
    
    useEffect(() => {
        if(floor?._floorEnemies) {
            const floorEnemies = floor._floorEnemies?.map(
                (floorEnemy) => floorEnemy._enemy
            );
            setFloorEnemies(floorEnemies);
        }
    }, [floor?._floorEnemies]);

    const groupedByEnemies = groupBy(floorEnemies, "name");

    return (
        <section>
            <Modal show={show} onClose={handleCloseModal}>
                <h2 className="text-xteamaccent font-extrabold italic text-xl">
                    Edit Enemies on Floor {floor?.number}
                </h2>

                <div className="flex space-between w-full mt-4 gap-2">
                    <div className="w-full h-96 bg-xteamaccent rounded-md">
                        <p className="text-xl text-white text-center mb-4 uppercase">
                            All enemies
                        </p>
                        <div className="grid grid-cols-4 h-80 pl-10 pt-2">
                            {allEnemies.map((enemy) => {
                                return (
                                    <span
                                        className="cursor-pointer"
                                        onClick={handleOnAddEnemyClick(enemy)}
                                        key={enemy.id}
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
                    <div className="w-full bg-green-500 relative rounded-md">
                        <p className="text-xl text-white text-center mb-4 uppercase">
                            Floor Enemies
                        </p>
                        <div className="grid grid-cols-4 pl-10 pt-2">
                        {Object.keys(groupedByEnemies).map((enemyKey) => (
                                <span
                                    className="cursor-pointer h-[76px]"
                                    onClick={handleOnRemoveEnemyClick(groupedByEnemies[enemyKey][0])}
                                    key={groupedByEnemies[enemyKey][0].id}
                                >
                                    {emojiToImageTag(
                                        groupedByEnemies[enemyKey][0].emoji,
                                        allEmoji,
                                        "h-12 w-12",
                                        groupedByEnemies[enemyKey].length,
                                    )}
                                </span>
                            ))}
                        </div>
                        {floorEnemies && floorEnemies.length > 0 && <span className="absolute cursor-pointer text-white bottom-2 left-1/2 hover:text-xteamaccent" onClick={() => setFloorEnemies([])}><AiOutlineDelete /></span>}
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
