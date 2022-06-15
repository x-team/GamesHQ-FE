import { FormikHelpers, useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import * as Yup from "yup";

import { getEnemy, upsertEnemy } from "../api/admin";
import Button from "../ui/Button";
import Checkbox from "../ui/Checkbox";
import TextInput from "../ui/TextInput";

interface IForm {
  name: string;
  emoji: string;
  gifUrl: string;
  minorDamageRate: number;
  majorDamageRate: number;
  health: number;
  isBoss: boolean;
  actionPattern: string;
}

interface IProps {
  editMode?: boolean;
}

const EnemyEditorPage = function EnemyEditorPage({ editMode }: IProps) {
  const [isLoading, setLoading] = useState(false);
  const [remoteEnemy, setRemoteEnemy] = useState<IEnemy | undefined>(undefined);

  const navigate = useNavigate();
  const { enemyId } = useParams<{ enemyId: string }>();

  if (editMode && !isLoading && !remoteEnemy) {
    setLoading(true);
  }

  const onSubmit = async (values: IForm, actions: FormikHelpers<IForm>) => {
    setLoading(true);
    const numericEnemyId = parseInt(enemyId || "");
    await upsertEnemy({
      ...(editMode && numericEnemyId && { id: numericEnemyId }),
      name: values.name,
      emoji: values.emoji,
      gifUrl: values.gifUrl,
      health: values.health,
      isBoss: values.isBoss,
      majorDamageRate: values.majorDamageRate,
      minorDamageRate: values.minorDamageRate,
      abilitiesJson: {},
      actionPattern: values.actionPattern.toUpperCase(),
    });
    navigate("/enemies");
  };

  const initialForm: IForm = {
    name: "",
    emoji: "",
    gifUrl: "",
    health: 1,
    isBoss: false,
    majorDamageRate: 0,
    minorDamageRate: 0,
    actionPattern: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().max(30).required().label("Enemy Name"),
    gifUrl: Yup.string().url().max(512).required().label("GIF Url"),
    emoji: Yup.string()
      .max(30)
      .required()
      .matches(/^:.*:$/, "Must begin and end with :, e.g :my-emoji:")
      .label("Emoji"),
    health: Yup.number().required().label("Health"),
    actionPattern: Yup.string()
      .required()
      .min(1)
      .max(20)
      .matches(
        /^[HAChac]*$/,
        "Must be a combination of 'H', 'A' and 'C' (e.g 'AAHC')"
      )
      .label("Action Pattern"),
    minorDamageRate: Yup.number().required().label("Minor Damage Rate"),
    majorDamageRate: Yup.number().required().label("Major Damage Rate"),
    isBoss: Yup.boolean().required().label("Is Archived"),
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
    async function fetchEnemy() {
      if (!enemyId) {
        return;
      }
      const enemy = await getEnemy(parseInt(enemyId));
      setValues({
        name: enemy.name,
        emoji: enemy.emoji,
        gifUrl: enemy.gifUrl,
        health: enemy.health,
        isBoss: enemy.isBoss,
        majorDamageRate: enemy.majorDamageRate,
        minorDamageRate: enemy.minorDamageRate,
        actionPattern: enemy._enemyPatternId,
      } as IForm);

      setRemoteEnemy(enemy);
      setLoading(false);
      return enemy;
    }

    fetchEnemy();
  }, [enemyId, setValues]);

  if (isLoading) {
    return <SyncLoader />;
  }

  const isSubmitDisabled = !dirty || !isValid;

  return (
    <div>
      <h2 className="text-2xl font-bold italic font-sans mb-8">
        {editMode ? "UPDATE ENEMY" : "NEW ENEMY"}
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="flex space-x-6">
          <div>
            <TextInput
              label="Enemy Name"
              {...getFieldProps("name")}
              {...getFieldMeta("name")}
            />
          </div>

          <div>
            <TextInput
              label="Emoji"
              {...getFieldProps("emoji")}
              {...getFieldMeta("emoji")}
            />
          </div>

          <div>
            <Checkbox id="isBoss" {...getFieldProps("isBoss")}>
              Boss
            </Checkbox>
          </div>
        </div>

        <div className="flex mt-2 space-x-6">
          <div>
            <TextInput
              label="GIF Url"
              extraClass="w-5/6"
              {...getFieldProps("gifUrl")}
              {...getFieldMeta("gifUrl")}
            />
          </div>

          <div>
            <TextInput
              label="Action Pattern"
              {...getFieldProps("actionPattern")}
              {...getFieldMeta("actionPattern")}
            />
          </div>
        </div>

        <div className="flex mt-2 space-x-6">
          <div>
            <TextInput
              label="Health"
              {...getFieldProps("health")}
              {...getFieldMeta("health")}
              type="number"
            />
          </div>

          <div>
            <TextInput
              label="Minor Damage Rate"
              {...getFieldProps("minorDamageRate")}
              {...getFieldMeta("minorDamageRate")}
              type="number"
            />
          </div>

          <div>
            <TextInput
              label="Major Damage Rate"
              {...getFieldProps("majorDamageRate")}
              {...getFieldMeta("majorDamageRate")}
              type="number"
            />
          </div>
        </div>

        <div className="mt-8">
          <Button disabled={isSubmitDisabled} type="submit">
            {editMode ? "Update Enemy" : "Create Enemy"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EnemyEditorPage;
