import { FormikHelpers, useFormik } from "formik";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { SyncLoader } from "react-spinners";
import * as Yup from "yup";
import { getGameType, upsertGameType } from "../api/gamedev";

import Button from "../ui/Button";
import TextInput from "../ui/TextInput";

interface IForm {
  id?: number;
  name: string,
  clientSecret: string;
  signingSecret: string;
  _createdById: number;
}

interface IProps {
  editMode?: boolean;
}

const GameEditorPage = function GameEditorPage({ editMode }: IProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [currentGameType, setGameType] = useState<IGameType | undefined>(undefined);
    const history = useHistory();

    const { gameTypeId } = useParams<{ gameTypeId: string }>();

    const onSubmit = async (values: IForm, _actions: FormikHelpers<IForm>) => {
        setIsLoading(true);
        const upserGameTypeParams: IGameTypeEditorData = {
          id: (editMode && gameTypeId) ? values.id : undefined,
          name: values.name ?? undefined,
          // TODO: This needs to be implementes
          // _createdById: values._createdById,
          
          // TODO: These 2 are probably not going to be implemented
          // clientSecret: values.clientSecret,
          // signingSecret: values.signingSecret,
        }
        if(!upserGameTypeParams.name) {
          history.push("/games");
        }
        await upsertGameType(upserGameTypeParams);
        history.push("/games");
    };

    const initialForm: IForm = {
        name: '',
        clientSecret: '',
        signingSecret: '',
        _createdById: 0,
    };

    const validationSchema = Yup.object({
        name: Yup.string().max(20).required().label("Game Type Name"),
    });

    const {
        getFieldProps,
        getFieldMeta,
        handleSubmit,
        dirty,
        isValid,
        setValues,
    } = useFormik({
        initialValues: initialForm,
        onSubmit,
        validationSchema,
    });

    useEffect(() => {
        async function fetchGameTypeData() {
            if (!gameTypeId) {
                return;
            }
            const gameType = await getGameType(Number(gameTypeId));
            setValues({
                id: gameType.id,
                name: gameType.name,
                clientSecret: gameType.clientSecret,
                signingSecret: gameType.signingSecret,
                _createdById: gameType._createdById,
            } as IForm);

            setGameType(gameType);
            setIsLoading(false);
            return gameType;
        }

        fetchGameTypeData();
    }, [gameTypeId, setValues]);

    if (isLoading) {
        return <SyncLoader />;
    }

    const isSubmitDisabled = !dirty || !isValid;

    return (
        <div>
            <h2 className="text-2xl font-bold italic font-sans mb-8">
                {editMode ? "UPDATE GAME" : "NEW GAME"}
            </h2>

            <form onSubmit={handleSubmit}>
                <div className="flex">
                    <div>
                        <TextInput
                            label="Game Name"
                            {...getFieldProps("name")}
                            {...getFieldMeta("name")}
                        />
                    </div>
                </div>
                <div className="flex  mt-4">
                    <section className="flex flex-col">
                      <strong>Client Secret</strong>
                      <span>{currentGameType?.clientSecret}</span>
                    </section>
                </div>
                <div className="flex mt-4">
                    <section className="flex flex-col">
                      <strong>Signing Secret</strong>
                      <span>{currentGameType?.signingSecret}</span>
                    </section>
                </div>

                <div className="mt-4">
                    <Button disabled={isSubmitDisabled} type="submit">
                        {editMode ? "Update Game" : "Create Game"}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default GameEditorPage;
