import {
  IDisplayModals,
  IDisableInputs,
  IError,
} from "../pages/Profile/Profile";
import { User } from "./types";
import { updateUserExceptPassword } from "./api";
import Joi from "joi";

interface IArgs {
  disableInputs: IDisableInputs;
  setDisableInputs: (arg0: IDisableInputs) => void;
  userInfo: User | null;
  setUserInfo: (arg0: User) => void;
  setDisplayModals: (arg0: IDisplayModals) => void;
  displayModals: IDisplayModals;
  errors: { [key: string]: IError };
  setErrors: (arg0: { [key: string]: IError }) => void;
  profile: User | null;
}

export const handleFormErrors = async ({
  userInfo,
  setUserInfo,
  disableInputs,
  setDisableInputs,
  displayModals,
  setDisplayModals,
  profile,
  errors,
  setErrors,
}: IArgs) => {
  // VALIDATE DATA WITH JOI
  const schema = Joi.object({
    city: Joi.string().allow(null, ""),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .messages({
        "string.email": `L'email doit être valide`,
        "string.empty": `Ce champ ne peut pas être vide`,
      }),
    password: Joi.string()
      .min(8)
      .pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/)
      .messages({
        "string.empty": `Ce champ ne peut être vide`,
        "string.min": `Le mot de passe doit contenir au moins 8 caractères`,
        "string.pattern.base": `Le mot de passe doit contenir au moins 8 caractères, 1 chiffre, une majuscule et 1 symbole`,
      }),
    username: Joi.string()
      .pattern(/^(?=.*[a-zA-Z]{1,})(?=.*[\d]{0,})[a-zA-Z0-9]{3,20}$/)
      .min(3)
      .max(20)
      .messages({
        "string.empty": `Ce champ ne peut pas être vide`,
        "string.pattern.base": `Le pseudo doit faire entre 3 et 20 caractères et ne peut contenir que des lettres et des chiffres`,
        "string.min": `Le pseudo doit faire au moins 3 caractères`,
        "string.max": `Le pseudo doit faire au max 20 caractères`,
      }),
    bio: Joi.string().allow(null, ""),
    id: Joi.string(),
    image: Joi.string().allow(null, ""),
    role: Joi.string(),
    createdPoi: Joi.array(),
    favouriteCities: Joi.array(),
    favouritePoi: Joi.array(),
  });
  const checkFormDatas = schema.validate(userInfo);
  if (checkFormDatas.error) {
    const error = {
      key: checkFormDatas.error.details[0].context?.key,
      message: checkFormDatas.error.details[0].message,
    };
    setErrors({
      ...errors,
      [error.key as string]: {
        status: true,
        message: error.message,
      },
    });
    setDisableInputs({ ...disableInputs, [error.key as string]: true });
    setDisplayModals({ ...displayModals, error: true });
    if (profile) setUserInfo(profile);
    return;
  } else {
    await updateUserExceptPassword(userInfo?.id as string, userInfo, "json");
    setDisableInputs({
      city: true,
      email: true,
      password: true,
      username: true,
      bio: true,
    });
    setDisplayModals({
      ...displayModals,
      validation: true,
    });
  }
};
