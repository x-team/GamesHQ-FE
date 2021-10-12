import { FormikHelpers, useFormik } from "formik";
import * as Yup from "yup";

import { newWeapon } from "../api/admin";
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
    gameAvailability: string[];
    rarity: string;
}

const onSubmit = async (values: IForm, actions: FormikHelpers<IForm>) => {
    console.log({ values });
    await newWeapon({
        name: values.weaponName,
        emoji: values.emoji,
        isArchived: values.isArchived,
        minorDamageRate: values.minorDamageRate,
        majorDamageRate: values.majorDamageRate,
        usageLimit: values.usageLimit,
        rarity: values.rarity,
        gameAvailability: values.gameAvailability,
        traits: values.traits,
    });
};

const WeaponEditorPage = function WeaponEditorPage(props: any) {
    const initialForm: IForm = {
        weaponName: "",
        emoji: "",
        minorDamageRate: 0,
        majorDamageRate: 0,
        usageLimit: null,
        isArchived: false,
        gameAvailability: [],
        traits: [],
        rarity: "",
    };

    const validationSchema = Yup.object({
        weaponName: Yup.string().max(30).required().label("Weapon Name"),
        emoji: Yup.string().max(30).required().label("Emoji"),
        gameAvailability: Yup.array()
            .of(Yup.string())
            .label("Game Availability"),
        traits: Yup.array().of(Yup.string()).label("Traits"),
        minorDamageRate: Yup.number().required().label("Minor Damage Rate"),
        majorDamageRate: Yup.number().required().label("Major Damage Rate"),
        rarity: Yup.string().required().label("Rarity"),
        usageLimit: Yup.mixed(),
        isArchived: Yup.boolean().required().label("Is Archived"),
    });

    const { getFieldProps, touched, errors, handleSubmit } = useFormik({
        initialValues: initialForm,
        onSubmit,
        validationSchema,
    });

    const renderTraitCheckbox = (trait: IAvailableTrait) => {
        return (
            <div className="mt-2">
                <Checkbox id={trait.id} fieldProps={getFieldProps("traits")}>
                    {trait.displayName}
                </Checkbox>
            </div>
        );
    };

    return (
        <div>
            <h2 className="text-2xl font-bold italic font-sans mb-8">
                NEW WEAPON
            </h2>

            <form onSubmit={handleSubmit}>
                <div className="flex space-x-6">
                    <div>
                        <TextInput
                            label="Weapon Name"
                            fieldProps={getFieldProps("weaponName")}
                            error={errors.weaponName}
                            touched={touched.weaponName}
                        />
                    </div>

                    <div>
                        <TextInput
                            label="Emoji"
                            fieldProps={getFieldProps("emoji")}
                            error={errors.emoji}
                            touched={touched.emoji}
                        />
                    </div>

                    <div>
                        <label
                            className="block text-gray-700 text-sm font-bold mt-9"
                            htmlFor="isArchived"
                        >
                            <Checkbox fieldProps={getFieldProps("isArchived")}>
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
                            error={errors.minorDamageRate}
                            touched={touched.minorDamageRate}
                            fieldProps={getFieldProps("minorDamageRate")}
                            type="number"
                        />
                    </div>

                    <div>
                        <TextInput
                            label="Major Damage Rate"
                            error={errors.majorDamageRate}
                            touched={touched.majorDamageRate}
                            fieldProps={getFieldProps("majorDamageRate")}
                            type="number"
                        />
                    </div>

                    <div>
                        <TextInput
                            label="Usage Limit"
                            helperText="(blank for infinite)"
                            error={errors.usageLimit}
                            fieldProps={getFieldProps("usageLimit")}
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
                        <strong className="text-sm">Game Availability</strong>
                    </div>
                    <div className="mt-2">
                        <Checkbox
                            fieldProps={getFieldProps("gameAvailability")}
                        >
                            The Arena
                        </Checkbox>
                    </div>
                    <div>
                        <Checkbox
                            fieldProps={getFieldProps("gameAvailability")}
                        >
                            The Tower
                        </Checkbox>
                    </div>
                </div>

                <div className="mt-8">
                    <Button type="submit">Create Weapon</Button>
                </div>
            </form>
        </div>
    );
};

export default WeaponEditorPage;
