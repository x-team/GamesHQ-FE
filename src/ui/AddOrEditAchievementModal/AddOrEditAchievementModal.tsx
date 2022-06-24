import { useFormik } from "formik";
import { useEffect } from "react";
import * as Yup from "yup";
import { useParams } from "react-router-dom";

import { upsertAchievement } from "../../api/achievements";
import Button from "../Button";
import Checkbox from "../Checkbox";
import Modal from "../Modal";
import TextInput from "../TextInput";

interface IProps {
    show: boolean;
    onClose: () => void;
    selectedAchievement?: IAchievement;
}

interface IAchievementForm {
    id?: number;
    description: string;
    targetValue: number;
    isEnabled: boolean;
}

const AddOrEditAchievementModal = ({
    show,
    onClose,
    selectedAchievement,
}: IProps) => {
    const { gameTypeId } = useParams<{ gameTypeId: string }>();

    const onSubmit = async (values: IAchievementForm) => {
        await upsertAchievement({
            ...(selectedAchievement?.id && { id: selectedAchievement?.id }),
            _gameTypeId: selectedAchievement?._gameTypeId || parseInt(gameTypeId || ""),
            ...(selectedAchievement?.createdAt && { createdAt: selectedAchievement?.createdAt }),
            description: values.description,
            targetValue: values.targetValue,
            isEnabled: values.isEnabled,
            updatedAt: new Date().toString(),
          });
        onClose();
    }

    const validationSchema = Yup.object({
        description: Yup.string().required().label("Desctiption"),
        targetValue: Yup.number().min(1).required().label("Target Value"),
      });

    const initialForm: IAchievementForm = {
        description: "",
        targetValue: 0,
        isEnabled: true,
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
            description: selectedAchievement?.description || "",
            targetValue: selectedAchievement?.targetValue || 0,
            isEnabled: selectedAchievement?.isEnabled || true,
        });
    }, [selectedAchievement, setValues])

    return (
        <section>
            <Modal show={show} onClose={onClose}>
                <h2 className="text-xteamaccent font-extrabold italic text-xl mb-8">
                    Edit Achievement
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="flex space-x-6 pb-8">
                        <div>
                            <TextInput
                            label="Description"
                            {...getFieldProps("description")}
                            {...getFieldMeta("description")}
                            />
                        </div>

                        <div>
                            <TextInput
                            label="Target Value"
                            {...getFieldProps("targetValue")}
                            {...getFieldMeta("targetValue")}
                            />
                        </div>

                        <div>
                            <label
                            className="block text-gray-700 text-sm font-bold mt-9"
                            htmlFor="isEnabled"
                            >
                            <Checkbox 
                                {...getFieldProps("isEnabled")}
                            >
                                isEnabled
                            </Checkbox>
                            </label>
                        </div>
                        <div className="mt-8 flex justify-center flex-1">
                            <Button type="submit" disabled={!isValid}>
                                Save
                            </Button>
                        </div>
                    </div>
                </form>
            </Modal>
        </section>
    );
};

export default AddOrEditAchievementModal;
