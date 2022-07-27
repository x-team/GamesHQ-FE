import { useFormik } from "formik";
import { useEffect } from "react";
import * as Yup from "yup";
import { SlackBlockKitSelectMenuElement, SlackBlockKitCompositionOption} from "../../SlackBlockKit";
import Dropdown from "../Dropdown";
import Button from "../Button";
import { toast } from "react-toastify";
import { handleGameResponse } from "../../helpers/slackHelper";
import { postArenaAction } from "../../api/admin";

interface IProps {
    staticSelectElement: SlackBlockKitSelectMenuElement;
    onClose: () => void;
}

interface ISlackBlockOption {
  id?: number;
  options: SlackBlockKitCompositionOption[]
}

const SlackBlockStaticSelect = ({
    staticSelectElement,
    onClose
}: IProps) => {
    const onSubmit = async (values: ISlackBlockOption) => {
      handleGameResponse({
        adminGameRequest: () => postArenaAction(staticSelectElement.action_id),
        onSuccessBlocks: (resp) => {
          toast(`OK: ${resp}`, {
            type: "success",
          });
          onClose();
        }, 
        onSuccessText: (resp) => {
          toast(`OK: ${resp}`, {
            type: "success",
          });
          onClose();
        },
        onError: (resp) => {
          toast(`Error : ${resp.text}`, {
            type: "error",
          });
        } 
      })
  };

  const initialForm: ISlackBlockOption = {
    options: [],
  };

 const { getFieldProps, handleSubmit, setValues } =
    useFormik({
      initialValues: initialForm,
      onSubmit
    });

  useEffect(() => {
    setValues({
      options: staticSelectElement.options,
    });
  }, [staticSelectElement, setValues]);

    return (
      <section>
        <form onSubmit={handleSubmit} >
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

         <div className="mt-8 w-full">
              <Button type="submit" fullWidth>
                Send Action
              </Button>
          </div>
      </form>
      </section>
    );
};

export default SlackBlockStaticSelect;
