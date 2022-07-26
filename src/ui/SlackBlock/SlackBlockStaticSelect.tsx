import { useFormik } from "formik";
import { useEffect } from "react";
import * as Yup from "yup";
import { SlackBlockKitSelectMenuElement, SlackBlockKitCompositionOption} from "../../SlackBlockKit";
import Dropdown from "../Dropdown";
import { toast } from "react-toastify";

interface IProps {
    staticSelectElement: SlackBlockKitSelectMenuElement;
}

interface ISlackBlockOption {
  id?: number;
  options: SlackBlockKitCompositionOption[]
}

const SlackBlockStaticSelect = ({
    staticSelectElement
}: IProps) => {
    const onSubmit = async (values: ISlackBlockOption) => {
    // try{
    //   await upsertLeaderboard({
    //     ...(selectedLeaderboard?.id && { id: selectedLeaderboard?.id }),
    //     _gameTypeId:
    //       selectedLeaderboard?._gameTypeId || parseInt(gameTypeId || ""),
    //     name: values.name,
    //     scoreStrategy: values.scoreStrategy.toLowerCase(),
    //     resetStrategy: values.resetStrategy.toLowerCase(),
    //   });
    //   onClose();
    //   toast('Leaderboard successfully saved.',{
    //     type: 'success',
    //   });

    // } catch (err: any) {
    //   toast(`Error : ${err?.message}`, {
    //     type: "error",
    //   });
    // }

    toast(`OnSubmit TBD ${values}`, {
        type: "success",
    });
  };

    const validationSchema = Yup.object({
        options: Yup.string().required().label("Reset Strategy"),
    });

  const initialForm: ISlackBlockOption = {
    options: [],
  };

 const { getFieldProps, getFieldMeta, handleSubmit, isValid, setValues } =
    useFormik({
      initialValues: initialForm,
      onSubmit,
      validationSchema,
    });

  useEffect(() => {
    setValues({
      options: staticSelectElement.options,
    });
  }, [staticSelectElement, setValues]);

    return (
        <Dropdown
            fieldProps={getFieldProps("options")}
            label={staticSelectElement.placeholder.text}
            fullWidth
            >
            {staticSelectElement.options.map((option) => (
                <option
                    key={option.value}
                    value={option.value}
                    label={option.text.text}
                />
            ))}
        </Dropdown>
    );
};

export default SlackBlockStaticSelect;
