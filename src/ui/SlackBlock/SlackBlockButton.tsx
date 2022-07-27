import { useFormik } from "formik";
import { SlackBlockKitButtonElement} from "../../SlackBlockKit";
import Button from "../Button";
import { toast } from "react-toastify";
import { handleGameResponse } from "../../helpers/slackHelper";
import { postArenaAction } from "../../api/admin";

interface IProps {
    buttonElement: SlackBlockKitButtonElement;
    onClose: () => void;
}

const SlackBlockButton = ({
    buttonElement,
    onClose
}: IProps) => {
    const onSubmit = async () => {
      handleGameResponse({
        adminGameRequest: () => postArenaAction(buttonElement.action_id),
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

 const { handleSubmit } =
    useFormik({
      initialValues: {},
      onSubmit,
    });

    return (
      <section>
        <form onSubmit={handleSubmit} >
         <div className="mt-8 w-full">
              <Button type="submit" fullWidth>
              {buttonElement.text.text}
              </Button>
          </div>
      </form>
      </section>
    );
};

export default SlackBlockButton;
