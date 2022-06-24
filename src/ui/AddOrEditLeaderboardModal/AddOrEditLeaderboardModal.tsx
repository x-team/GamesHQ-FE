import { useFormik } from "formik";
import { useEffect } from "react";
import * as Yup from "yup";
import { useParams } from "react-router-dom";

import { upsertLeaderboard } from "../../api/leaderboards";
import Button from "../Button";
import Modal from "../Modal";
import TextInput from "../TextInput";
import Dropdown from "../Dropdown";

interface IProps {
    show: boolean;
    onClose: () => void;
    selectedLeaderboard?: ILeaderboard;
}

interface ILeaderboardForm {
    id?: number;
    name: string;
    scoreStrategy: string;
    resetStrategy: string;
}

const AddOrEditLeaderboardModal = ({
    show,
    onClose,
    selectedLeaderboard,
}: IProps) => {
    const { gameTypeId } = useParams<{ gameTypeId: string }>();

    const onSubmit = async (values: ILeaderboardForm) => {
        await upsertLeaderboard({
            ...(selectedLeaderboard?.id && { id: selectedLeaderboard?.id }),
            _gameTypeId: selectedLeaderboard?._gameTypeId || parseInt(gameTypeId || ""),
            name: values.name,
            scoreStrategy: values.scoreStrategy,
            resetStrategy: values.resetStrategy,
          });
        onClose();
    }

    const validationSchema = Yup.object({
        name: Yup.string().required().label("Desctiption"),
        scoreStrategy: Yup.string().required().label("Score Strategy"),
        resetStrategy: Yup.string().required().label("Reset Strategy"),
      });

    const initialForm: ILeaderboardForm = {
        name: "",
        scoreStrategy: "highest",
        resetStrategy: "weekly",
      };

    const {
        getFieldProps,
        getFieldMeta,
        handleSubmit,
        isValid,
        setValues,
      } = useFormik({
        initialValues: initialForm,
        onSubmit,
        validationSchema,
      });

    useEffect(() => {
        setValues({
            name: selectedLeaderboard?.name || "",
            scoreStrategy: selectedLeaderboard?.scoreStrategy || "",
            resetStrategy: selectedLeaderboard?.scoreStrategy || "",
        });
    }, [selectedLeaderboard, setValues])

    return (
        <section>
            <Modal show={show} onClose={onClose}>
                <h2 className="text-xteamaccent font-extrabold italic text-xl mb-8">
                    Edit Leaderboard
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="flex space-x-6 pb-8">
                        <div>
                            <TextInput
                            label="Name"
                            {...getFieldProps("name")}
                            {...getFieldMeta("name")}
                            />
                        </div>

                        <div>
                            <Dropdown fieldProps={getFieldProps("scoreStrategy")} label="Score Strategy">
                                <option value="highest" label="Highest" />
                                <option value="lowest" label="Lowest" />
                                <option value="sum" label="Sum" />
                                <option value="latest" label="Latest" />
                            </Dropdown>
                        </div>

                        <div>
                            <Dropdown fieldProps={getFieldProps("resetStrategy")} label="Reset Strategy">
                                <option value="daily" label="Daily" />
                                <option value="weekly" label="Weekly" />
                                <option value="monthly" label="Monthly" />
                                <option value="never" label="Never" />
                            </Dropdown>
                        </div>
                        <div className="mt-8 flex justify-center flex-1">
                            <Button type="submit" disabled={!isValid} >
                                Save
                            </Button>
                        </div>
                    </div>
                </form>
            </Modal>
        </section>
    );
};

export default AddOrEditLeaderboardModal;
