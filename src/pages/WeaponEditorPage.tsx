import { FormikHelpers, useFormik } from "formik";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { SyncLoader } from "react-spinners";
import * as Yup from "yup";

import { getWeapon, upsertWeapon } from "../api/admin";
import { getGameTypes } from "../api/gamedev";
import { RARITY } from "../helpers/rarityHelper";
import { AVAILABLE_TRAITS } from "../helpers/traitsHelper";
import Button from "../ui/Button";
import Checkbox from "../ui/Checkbox";
import Dropdown from "../ui/Dropdown";
import TextInput from "../ui/TextInput";

interface IForm {
    weaponName: string;
    emoji: string;
    minorDamageRate: number;
    majorDamageRate: number;
    usageLimit: number | null;
    isArchived: boolean;
    traits: string[];
    gameTypeIds: string[];
    rarity: string;
}

interface IProps {
    editMode?: boolean;
}

const WeaponEditorPage = function WeaponEditorPage({ editMode }: IProps) {
    const [isLoading, setLoading] = useState(false);
    const [gameTypes, setGameTypes] = useState<
        IGameType[]
    >([]);
    const [remoteWeaponItem, setRemoteWeaponItem] = useState<
        IWeapon | undefined
    >(undefined);

    const history = useHistory();
    const { weaponId } = useParams<{ weaponId: string }>();

    if (editMode && !isLoading && !remoteWeaponItem) {
        setLoading(true);
    }

    const onSubmit = async (values: IForm, actions: FormikHelpers<IForm>) => {
        setLoading(true);
        const numericWeaponId = parseInt(weaponId);
        await upsertWeapon({
            ...(editMode && numericWeaponId && { id: numericWeaponId }),
            name: values.weaponName,
            emoji: values.emoji,
            isArchived: values.isArchived,
            minorDamageRate: values.minorDamageRate,
            majorDamageRate: values.majorDamageRate,
            usageLimit: values.usageLimit || null,
            rarity: values.rarity,
            gameTypeIds: values.gameTypeIds.map(gt => Number(gt)),
            traits: values.traits,
        });
        history.push("/weapons");
    };

    const initialForm: IForm = {
        weaponName: "",
        emoji: "",
        minorDamageRate: 0,
        majorDamageRate: 0,
        usageLimit: null,
        isArchived: false,
        gameTypeIds: [],
        traits: [],
        rarity: "",
    };

    const validationSchema = Yup.object({
        weaponName: Yup.string().max(30).required().label("Weapon Name"),
        emoji: Yup.string()
            .max(30)
            .required()
            .matches(/^:.*:$/, "Must begin and end with :, e.g :my-emoji:")
            .label("Emoji"),
        gameTypeIds: Yup.array()
            .of(Yup.number())
            .min(1)
            .label("Game Availability"),
        traits: Yup.array().of(Yup.string()).label("Traits"),
        minorDamageRate: Yup.number().required().label("Minor Damage Rate"),
        majorDamageRate: Yup.number().required().label("Major Damage Rate"),
        rarity: Yup.string().required().label("Rarity"),
        usageLimit: Yup.mixed(),
        isArchived: Yup.boolean().required().label("Is Archived"),
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
        async function fetchWeapon() {
            if (!weaponId) {
                return;
            }
            const weapon = await getWeapon(parseInt(weaponId));
            setValues({
                weaponName: weapon.name,
                emoji: weapon.emoji,
                gameTypeIds: weapon._gameItemAvailability.map(
                    (gameAvailability) => String(gameAvailability._gameType.id)
                ),
                isArchived: weapon._gameItemAvailability.some(
                    (gameAvailability) => gameAvailability.isArchived
                ),
                minorDamageRate: weapon._weapon.minorDamageRate,
                majorDamageRate: weapon._weapon.majorDamageRate,
                rarity: weapon._itemRarityId,
                traits: weapon._traits.map((trait) => trait.id),
                usageLimit: weapon.usageLimit,
            } as IForm);

            setRemoteWeaponItem(weapon);
            setLoading(false);
            return weapon;
        }

        async function fetchGameTypes() {
            const gameTypes = await getGameTypes();
            setGameTypes(gameTypes)
            setLoading(false);
            return gameTypes;
        }
        
        fetchGameTypes();
        fetchWeapon();
  
    }, [weaponId, setValues]);

    if (isLoading) {
        return <SyncLoader />;
    }

    const isSubmitDisabled = !dirty || !isValid;

    const renderTraitCheckbox = (trait: IAvailableTrait) => {
        return (
            <div className="mt-2">
                <Checkbox id={trait.id} {...getFieldProps("traits")}>
                    {trait.displayName}
                </Checkbox>
            </div>
        );
    };

    const renderGameTypeCheckbox = (gameType: IGameType) => {
        return (
            <div className="mt-2">
                <Checkbox id={String(gameType.id)} {...getFieldProps("gameTypeIds")}>
                    {gameType.name}
                </Checkbox>
            </div>
        );
    };

    return (
        <div>
            <h2 className="text-2xl font-bold italic font-sans mb-8">
                {editMode ? "UPDATE WEAPON" : "NEW WEAPON"}
            </h2>

            <form onSubmit={handleSubmit}>
                <div className="flex space-x-6">
                    <div>
                        <TextInput
                            label="Weapon Name"
                            {...getFieldProps("weaponName")}
                            {...getFieldMeta("weaponName")}
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
                        <label
                            className="block text-gray-700 text-sm font-bold mt-9"
                            htmlFor="isArchived"
                        >
                            <Checkbox {...getFieldProps("isArchived")}>
                                Archived{" "}
                                <span className="text-xs font-normal">
                                    (won't show up on games by default)
                                </span>
                            </Checkbox>
                        </label>
                    </div>
                </div>

                <div className="flex mt-4">
                    <div className="mr-12">
                        <Dropdown
                            fieldProps={getFieldProps("rarity")}
                            label="Rarity"
                        >
                            <option
                                value=""
                                label="Select a rarity..."
                                disabled
                            />
                            {Object.values(RARITY).map((rarity) => (
                                <option
                                    key={rarity}
                                    value={rarity}
                                    label={rarity}
                                />
                            ))}
                        </Dropdown>
                    </div>
                </div>

                <div className="flex mt-2 space-x-6">
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

                    <div>
                        <TextInput
                            label="Usage Limit"
                            helperText="(blank for infinite)"
                            {...getFieldProps("usageLimit")}
                            {...getFieldMeta("usageLimit")}
                            type="number"
                        />
                    </div>
                </div>

                <div className="mt-2">
                    <div>
                        <strong className="text-sm">Traits</strong>
                    </div>
                    <div className="grid grid-cols-4 gap-0">
                        {AVAILABLE_TRAITS.map(renderTraitCheckbox)}
                    </div>
                </div>

                <div className="mt-2">
                    <div>
                        <strong className="text-sm">
                            Game Availability (min. 1)
                        </strong>
                    </div>
                     {gameTypes.map(renderGameTypeCheckbox)}
                </div>

                <div className="mt-8">
                    <Button disabled={isSubmitDisabled} type="submit">
                        {editMode ? "Update Weapon" : "Create Weapon"}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default WeaponEditorPage;
