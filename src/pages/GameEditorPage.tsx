import { FormikHelpers, useFormik } from "formik";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import * as Yup from "yup";
import { getAchievements } from "../api/acheivements";
import { getGameType, upsertGameType } from "../api/gamedev";

import Button from "../ui/Button";
import TextInput from "../ui/TextInput";

interface IForm {
  id?: number;
  name: string;
  clientSecret: string;
  signingSecret: string;
  _createdById: number;
}

interface IProps {
  editMode?: boolean;
}

const GameEditorPage = function GameEditorPage({ editMode }: IProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [currentGameType, setGameType] = useState<IGameType | undefined>(
    undefined
  );
  const [achievements, setAchievements] = useState<IAchievement[]>([]);
  const [isUpdatingGameName, setIsUpdatingGameName] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const { gameTypeId } = useParams<{ gameTypeId: string }>();

  const onSubmit = async (values: IForm, _actions: FormikHelpers<IForm>) => {
    setIsLoading(true);
    const upserGameTypeParams: IGameTypeEditorData = {
      id: editMode && gameTypeId ? values.id : undefined,
      name: values.name ?? undefined,

      // TODO: This needs to be implementes
      // _createdById: values._createdById,

      // TODO: These 2 are probably not going to be implemented
      // clientSecret: values.clientSecret,
      // signingSecret: values.signingSecret,
    };
    if (!upserGameTypeParams.id) {
      navigate("/games");
    }
    try {
      await upsertGameType(upserGameTypeParams);
      navigate("/games");
    } catch (error: any) {
      console.log({ error });
      setIsLoading(false);
      setErrorMessage(error.message);
    }
  };

  const initialForm: IForm = {
    name: "",
    clientSecret: "",
    signingSecret: "",
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
      try {
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
          _leaderboards: gameType._leaderboards,
        } as IForm);

        setGameType(gameType);
        setIsLoading(false);
        return gameType;
      } catch (error: any) {
        console.log({ error });
        setIsLoading(false);
        setErrorMessage(error.message);
      }
    }

    fetchGameTypeData();
  }, [gameTypeId, setValues]);

  useEffect(() => {
    async function fetchAchievementsData() {
      try {
        if (!gameTypeId) {
          return;
        }
        const achievements = await getAchievements(Number(gameTypeId));
        setAchievements(achievements)
        return achievements;
      } catch (error: any) {
        console.log({ error });
        setIsLoading(false);
        setErrorMessage(error.message);
      }
    }

    fetchAchievementsData();
  }, [gameTypeId]);

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  if (isLoading) {
    return <SyncLoader />;
  }

  const isSubmitDisabled = !dirty || !isValid;

  return (
    <div>
      <h2 className="text-2xl font-bold italic font-sans mb-8">
        {editMode ? "UPDATE GAME" : "NEW GAME"}
      </h2>
      <div className="flex flex-wrap">
        <form onSubmit={handleSubmit} className="py-10 mr-8">
          <div className="flex">
            <div>
              {isUpdatingGameName ? 
              ( 
                <TextInput
                  label="Game Name"
                  {...getFieldProps("name")}
                  {...getFieldMeta("name")}
                />
              ) :
              (      
                <h2 className="text-2xl font-bold italic font-sans mb-8">
                  {currentGameType?.name}
                </h2>
              )
            }
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
            {/* FIX THIS LOGIC */}
            <Button onClick={() => setIsUpdatingGameName(true)}>
              {editMode ? "Update Game" : "Create Game"}
            </Button>
          </div>
        </form>

        <div className="col-span-7 py-10">
          <h2 className="text-2xl font-bold italic font-sans mb-8">
            Leaderboards
          </h2>
          <div className="my-4">
            <Button
              onClick={() => {
                console.log('NEW LEADERBOARD PAGE')
              }}
            >
              New Leaderboard
            </Button>
          </div>
          <table className="shadow-lg bg-white border-collapse w-full">
            <tr>
              <th className="bg-gray-100 border text-left px-8 py-4">id</th>
              <th className="bg-gray-100 border text-left px-8 py-4">name</th>
              <th className="bg-gray-100 border text-left px-8 py-4">
                scoreStrategy
              </th>
              <th className="bg-gray-100 border text-left px-8 py-4">
                resetStrategy
              </th>
              <th className="bg-gray-100 border text-left px-8 py-4">Edit</th>
            </tr>
            {currentGameType?._leaderboards?.map(
              (leaderboard: ILeaderboard) => (
                <tr>
                  <td className="border px-8 py-4">{leaderboard.id}</td>
                  <td className="border px-8 py-4">{leaderboard.name}</td>
                  <td className="border px-8 py-4">
                    {leaderboard.scoreStrategy}
                  </td>
                  <td className="border px-8 py-4">
                    {leaderboard.resetStrategy}
                  </td>
                  <td className="border px-8 py-4">
                    <Button
                      onClick={() => {
                        console.log("Handle New Leaderboard Click");
                      }}
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              )
            )}
          </table>
        </div>
      
        <div className="py-10 w-full">
          <h2 className="text-2xl font-bold italic font-sans mb-8">
            Achievements
          </h2>
          <div className="my-4">
              <Button
                onClick={() => {
                  console.log("Handle New Achievement Click");
                }}
              >
                New Achievement
              </Button>
            </div>
          <table className="shadow-lg bg-white border-collapse max-w-xs">
            <tr>
              <th className="bg-gray-100 border text-left px-8 py-4">id</th>
              <th className="bg-gray-100 border text-left px-8 py-4">
                Description
              </th>
              <th className="bg-gray-100 border text-left px-8 py-4">
                isEnabled
              </th>
              <th className="bg-gray-100 border text-left px-8 py-4">
                targetValue
              </th>
              <th className="bg-gray-100 border text-left px-8 py-4">
                createdAt
              </th>
              <th className="bg-gray-100 border text-left px-8 py-4">
                updatedAt
              </th>
              <th className="bg-gray-100 border text-left px-8 py-4">Edit</th>
            </tr>
              {achievements?.map((achievement => 
                <tr>
                    <td className="border px-8 py-4">{achievement.id}</td>
                    <td className="border px-8 py-4">{achievement.description || "-"}</td>
                    <td className="border px-8 py-4">{achievement.isEnabled ? "✅" : "❌"}</td>
                    <td className="border px-8 py-4">{achievement.targetValue || "-"}</td>
                    <td className="border px-8 py-4">{achievement.createdAt || "-"}</td>
                    <td className="border px-8 py-4">{achievement.updatedAt || "-"}</td>
                    <td className="border px-8 py-4">
                      <Button
                        onClick={() => {
                          console.log("Handle edit");
                        }}
                      >
                        Edit
                      </Button>
                    </td>
                    
                </tr>
              ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default GameEditorPage;
