import { useFormik } from "formik";
import { useEffect } from "react";
import { SlackBlockKitSelectMenuElement} from "../../SlackBlockKit";
import Dropdown from "../Dropdown";
import Button from "../Button";
import { toast } from "react-toastify";
import { handleGameResponse, separateEmojisFromText } from "../../helpers/slackHelper";
import { postArenaAction } from "../../api/admin";

interface IProps {
    staticSelectElement: SlackBlockKitSelectMenuElement;
    onClose: () => void;
}

interface ISlackBlockOption {
  selectedOptionId?: string
}

const SlackBlockStaticSelect = ({
    staticSelectElement,
    onClose
}: IProps) => {
    const onSubmit = async (values: ISlackBlockOption) => {

      await handleGameResponse({
        adminGameRequest: () => postArenaAction(staticSelectElement.action_id, values.selectedOptionId ? [values.selectedOptionId] : []),
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
          onClose();
        } 
      })
  };

  const initialForm: ISlackBlockOption = {
    selectedOptionId: staticSelectElement.initial_option?.value || ""
  };

 const { getFieldProps, handleSubmit, setValues} =
    useFormik({
      initialValues: initialForm,
      onSubmit
    });

  useEffect(() => {
    setValues({
      selectedOptionId: staticSelectElement.initial_option?.value || ""
    });
  }, [staticSelectElement, setValues]);

    return (
      <section>
        <form onSubmit={handleSubmit} >
        <Dropdown
            fieldProps={getFieldProps("selectedOptionId")}
            label={staticSelectElement.placeholder.text}
            fullWidth
            >
            {staticSelectElement.options.map((option) => {
              const label = separateEmojisFromText(option.text).filter(i => !i.emoji).map(i => i.text).join(' ')
              
              return (
                    <option
                        key={option.value}
                        value={option.value}
                        label={label}
                    />
              )
            })}
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
