import { useFormik } from "formik";
import { useEffect } from "react";
import * as Yup from "yup";
import { useParams } from "react-router-dom";

import { upsertLeaderboard } from "../../api/leaderboards";
import Button from "../Button";
import Modal from "../Modal";
import TextInput from "../TextInput";
import Dropdown from "../Dropdown";
import {
  resetStrategies,
  scoreStrategies,
} from "../../utils/leaderboardStrategies";

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
      _gameTypeId:
        selectedLeaderboard?._gameTypeId || parseInt(gameTypeId || ""),
      name: values.name,
      scoreStrategy: values.scoreStrategy.toLowerCase(),
      resetStrategy: values.resetStrategy.toLowerCase(),
    });
    onClose();
  };

  const validationSchema = Yup.object({
    name: Yup.string().required().label("Desctiption"),
    scoreStrategy: Yup.string().required().label("Score Strategy"),
    resetStrategy: Yup.string().required().label("Reset Strategy"),
  });

  const initialForm: ILeaderboardForm = {
    name: "",
    scoreStrategy: "Highest",
    resetStrategy: "Daily",
  };

  const { getFieldProps, getFieldMeta, handleSubmit, isValid, setValues } =
    useFormik({
      initialValues: initialForm,
      onSubmit,
      validationSchema,
    });

  useEffect(() => {
    setValues({
      name: selectedLeaderboard?.name || "",
      scoreStrategy: selectedLeaderboard?.scoreStrategy || "Highest",
      resetStrategy: selectedLeaderboard?.resetStrategy || "Daily",
    });
  }, [selectedLeaderboard, setValues]);

  return (
    <section>
      <Modal show={show} onClose={onClose}>
        <h2 className="text-xteamaccent font-extrabold italic text-xl mb-8">
          { selectedLeaderboard?.id ? 'Edit' : 'New'} Leaderboard
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 pb-8 sm:flex-row sm:gap-6 sm:pb-8">
            <div className="w-full">
              <TextInput
                label="Name"
                {...getFieldProps("name")}
                {...getFieldMeta("name")}
                fullWidth
              />
            </div>

            <div className="w-full">
              <Dropdown
                fieldProps={getFieldProps("scoreStrategy")}
                label="Score Strategy"
                fullWidth
              >
                {scoreStrategies.map((scoreStrategy) => (
                  <option
                    key={scoreStrategy}
                    value={scoreStrategy.toLowerCase()}
                    label={scoreStrategy}
                  />
                ))}
              </Dropdown>
            </div>

            <div className="w-full">
              <Dropdown
                fieldProps={getFieldProps("resetStrategy")}
                label="Reset Strategy"
                fullWidth
              >
                {resetStrategies.map((resetStrategy) => (
                  <option
                    key={resetStrategy}
                    value={resetStrategy.toLowerCase()}
                    label={resetStrategy}
                  />
                ))}
              </Dropdown>
            </div>
            <div className="mt-8 w-full">
              <Button type="submit" disabled={!isValid} fullWidth>
                Save
              </Button>
            </div>
        </form>
      </Modal>
    </section>
  );
};

export default AddOrEditLeaderboardModal;
