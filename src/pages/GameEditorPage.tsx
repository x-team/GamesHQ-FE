import { FormikHelpers, useFormik } from "formik";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import * as Yup from "yup";
import { AiOutlineCheck, AiOutlineClose, AiOutlineCopy } from "react-icons/ai";

import { getAchievements } from "../api/achievements";
import { getGameType, upsertGameType } from "../api/gamedev";
import AddOrEditAchievementModal from "../ui/AddOrEditAchievementModal";
import AddOrEditLeaderboardModal from "../ui/AddOrEditLeaderboardModal";

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
  const [shouldLoadAchievements, setShouldLoadAchievements] = useState<boolean>(true);
  const [shouldLoadGameType, setShouldGameType] = useState<boolean>(true);
  const [selectedAchievement, setSelectedAchievement] = useState<IAchievement>();
  const [selectedLeaderboard, setSelectedLeaderboard] = useState<ILeaderboard>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showLeaderboardModal, setShowLeaderboardModal] = useState<boolean>(false);
  const [hasCopiedSigninSecret, setHasCopiedSigninSecret] = useState<boolean>(false);
  const [hasCopiedClientSecret, setHasCopiedClientSecret] = useState<boolean>(false);

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
        if (!gameTypeId || !shouldLoadGameType) {
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
        setShouldGameType(false);
        return gameType;
      } catch (error: any) {
        console.log({ error });
        setIsLoading(false);
        setErrorMessage(error.message);
      }
    }

    fetchGameTypeData();
  }, [gameTypeId, setValues, shouldLoadGameType]);

  useEffect(() => {
    async function fetchAchievementsData() {
      try {
        if (!gameTypeId || !shouldLoadAchievements) {
          return;
        }
        const achievements = await getAchievements(Number(gameTypeId));
        setAchievements(achievements);
        setShouldLoadAchievements(false);
        return achievements;
      } catch (error: any) {
        console.log({ error });
        setIsLoading(false);
        setErrorMessage(error.message);
      }
    }

    fetchAchievementsData();
  }, [gameTypeId, shouldLoadAchievements]);

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  if (isLoading) {
    return <SyncLoader />;
  }

  const handleEditButtonClick = () => {
    if(isUpdatingGameName && isValid) {
      handleSubmit();
    } else {
      setIsUpdatingGameName(true);
    }
  }

  const openAchievementModal = (achievement?: IAchievement) => {
    setSelectedAchievement(achievement);
    setShowModal(true);
  }

  const openLeaderboardModal = (leaderboard?: ILeaderboard) => {
    setSelectedLeaderboard(leaderboard);
    setShowLeaderboardModal(true);
  }

  const handlePostSubmitAchievement = () => {
    setSelectedAchievement(undefined);
    setShowModal(false);
    setShouldLoadAchievements(true)
  }

  const handlePostSubmitLeaderboard = () => {
    setSelectedLeaderboard(undefined);
    setShowLeaderboardModal(false);
    setShouldGameType(true)
  }

  const handleCopyBtnClickSigningSecret = (value?: string) => {
    navigator.clipboard.writeText(value ?? "");
    setHasCopiedSigninSecret(true);
  }

  const handleCopyBtnClickClientSecret = (value?: string) => {
    navigator.clipboard.writeText(value ?? "");
    setHasCopiedClientSecret(true);
  }

  return (
    <>
      <h2 className="text-2xl font-bold italic font-sans mb-8">
        {editMode ? "UPDATE GAME" : "NEW GAME"}
      </h2>
      <div className="flex flex-wrap">
        <form className="py-10 mr-8">
          <div className="flex">
            <div>
              {isUpdatingGameName || !editMode ? 
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

          <div className={`flex  mt-4 ${!editMode && 'hidden'}`}>
            <section className="flex flex-col">
              <strong>Client Secret</strong>
              <div className="flex gap-1">
                <span className="text-xs">{currentGameType?.clientSecret} </span>
                <span className={`cursor-pointer w-4`} onClick={() => handleCopyBtnClickClientSecret(currentGameType?.clientSecret)}>{hasCopiedClientSecret ? <AiOutlineCheck color="green"/> : <AiOutlineCopy/>}</span>
              </div>
            </section>
          </div>
          <div className={`flex  mt-4 ${!editMode && 'hidden'}`}>
            <section className="flex flex-col">
              <strong>Signing Secret</strong>
              <div className="flex gap-1">
                <span className="text-xs">{currentGameType?.signingSecret} </span>
                <span className={`cursor-pointer w-4`} onClick={() => handleCopyBtnClickSigningSecret(currentGameType?.signingSecret)}>{hasCopiedSigninSecret ? <AiOutlineCheck color="green"/> : <AiOutlineCopy/>}</span>
              </div>
            </section>
          </div>

          <div className="mt-4">
            <Button type="button" onClick={handleEditButtonClick}>
              {editMode ? "Update Game" : "Create Game"}
            </Button>
          </div>
        </form>

        <div className={`col-span-7 py-10 ${!editMode && 'hidden'}`}>
          <h2 className="text-2xl font-bold italic font-sans mb-8">
            Leaderboards
          </h2>
          <div className="my-4">
            <Button onClick={openLeaderboardModal}>
              New Leaderboard
            </Button>
          </div>
          <table className="shadow-lg bg-white border-collapse w-full">
            <thead>
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
            </thead>
            <tbody>
              {currentGameType && currentGameType?._leaderboards?.map(
                (leaderboard: ILeaderboard) => (
                  <tr key={leaderboard.id} className="hover:bg-coolGray-50 cursor-pointer" >
                    <td className="border px-8 py-4" onClick={() => navigate(`/games/${gameTypeId}/leaderboards/${leaderboard.id}`)}>
                      {leaderboard.id}
                    </td>
                    <td className="border px-8 py-4" onClick={() => navigate(`/games/${gameTypeId}/leaderboards/${leaderboard.id}`)}>
                      {leaderboard.name}
                    </td>
                    <td className="border px-8 py-4 capitalize" onClick={() => navigate(`/games/${gameTypeId}/leaderboards/${leaderboard.id}`)}>
                      {leaderboard.scoreStrategy}
                    </td>
                    <td className="border px-8 py-4 capitalize" onClick={() => navigate(`/games/${gameTypeId}/leaderboards/${leaderboard.id}`)}>
                      {leaderboard.resetStrategy}
                    </td>
                    <td className="border px-8 py-4">
                      <Button
                        onClick={() => {
                          openLeaderboardModal(leaderboard)
                        }}
                      >
                        Edit
                      </Button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      
        <div className={`py-10 w-full ${!editMode && 'hidden'}`}>
          <h2 className="text-2xl font-bold italic font-sans mb-8">
            Achievements
          </h2>
          <div className="my-4">
            <Button onClick={openAchievementModal}>
              New Achievement
            </Button>
            </div>
          <table className="shadow-lg bg-white border-collapse max-w-xs">
            <thead>
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
            </thead>
            <tbody>
              {achievements && achievements?.map((achievement => 
                <tr key={achievement.id} className="hover:bg-coolGray-50 cursor-pointer">
                    <td className="border px-8 py-4" onClick={() => navigate(`/games/${gameTypeId}/achievements/${achievement.id}`)}>
                      {achievement.id}
                    </td>
                    <td className="border px-8 py-4" onClick={() => navigate(`/games/${gameTypeId}/achievements/${achievement.id}`)}>
                      {achievement.description || "-"}
                    </td>
                    <td className="border px-8 py-4" onClick={() => navigate(`/games/${gameTypeId}/achievements/${achievement.id}`)}>
                      {achievement.isEnabled ? <AiOutlineCheck color="green"/> : <AiOutlineClose color="red"/>}
                    </td>
                    <td className="border px-8 py-4" onClick={() => navigate(`/games/${gameTypeId}/achievements/${achievement.id}`)}>
                      {achievement.targetValue || "-"}
                    </td>
                    <td className="border px-8 py-4" onClick={() => navigate(`/games/${gameTypeId}/achievements/${achievement.id}`)}>
                      {new Date(achievement?.createdAt || "").toLocaleString() }
                    </td>
                    <td className="border px-8 py-4" onClick={() => navigate(`/games/${gameTypeId}/achievements/${achievement.id}`)}>
                      {new Date(achievement?.updatedAt || "").toLocaleString() }
                    </td>
                    <td className="border px-8 py-4">
                      <Button
                        onClick={() => {
                          openAchievementModal(achievement)
                        }}
                      >
                        Edit
                      </Button>
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showModal && <AddOrEditAchievementModal show={showModal} onClose={handlePostSubmitAchievement}  selectedAchievement={selectedAchievement}/>}
      {showLeaderboardModal && <AddOrEditLeaderboardModal show={showLeaderboardModal} onClose={handlePostSubmitLeaderboard}  selectedLeaderboard={selectedLeaderboard}/>}
    </>
  );
};

export default GameEditorPage;
