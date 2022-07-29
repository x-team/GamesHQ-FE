import { useFormik } from "formik";
import { useEffect } from "react";
import { SlackBlockKitMultiSelectMenuElement, SlackBlockKitCompositionOption} from "../../SlackBlockKit";
import Button from "../Button";
import { toast } from "react-toastify";
import { handleGameResponse, separateEmojisFromText } from "../../helpers/slackHelper";
import { postArenaAction } from "../../api/admin";
import Checkbox from "../Checkbox";
import { emojiToImageLabel } from "../../helpers/emojiHelper";

interface IProps {
    multiStaticSelectElement: SlackBlockKitMultiSelectMenuElement;
    onClose: () => void;
}

interface ISlackBlockOption {
  optionIds: string[];
}

const SlackBlockMultiStaticSelect = ({
    multiStaticSelectElement,
    onClose
}: IProps) => {

  
    const onSubmit = async (values: ISlackBlockOption) => {
      await handleGameResponse({
        adminGameRequest: () => postArenaAction(multiStaticSelectElement.action_id, values.optionIds),
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

  const renderOptionCheckbox = (option: SlackBlockKitCompositionOption) => {
    const emojisAndTexts = separateEmojisFromText(option.text)
    
    return (
      <div className="mt-2">
        <Checkbox id={String(option.value)} {...getFieldProps("optionIds")}>
          {emojisAndTexts.map(i => {
              if(i.emoji){
                return emojiToImageLabel(i.text, {}, "h-5 w-5")
              }else{
                return i.text
              }
          })} 
        </Checkbox>
      </div>
    );
  };

  const initialForm: ISlackBlockOption = {
    optionIds: [],
  };

 const { getFieldProps, handleSubmit, setValues } =
    useFormik({
      initialValues: initialForm,
      onSubmit
    });

  useEffect(() => {
    setValues({
      optionIds: multiStaticSelectElement.options.map(o => o.value),
    });
  }, [multiStaticSelectElement, setValues]);

    return (
      <section>
        <form onSubmit={handleSubmit} >
        <div className="mt-2">
          {multiStaticSelectElement.options.map(renderOptionCheckbox)}
        </div>

         <div className="mt-8 w-full">
              <Button type="submit" fullWidth>
                Send Action
              </Button>
          </div>
      </form>
      </section>
    );
};

export default SlackBlockMultiStaticSelect;
