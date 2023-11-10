import {
  IDisplayModals,
  IDisableInputs,
  IError,
} from "../pages/Profile/Profile";
import { User } from "./types";
import { updateUserExceptPassword } from "./api";

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
  if (userInfo !== null && userInfo.id !== null) {
    const update = await updateUserExceptPassword(
      userInfo.id,
      userInfo,
      "json"
    );
    if (update !== undefined && update.error) {
      setErrors({
        ...errors,
        [update.key]: {
          status: true,
          message: update.error,
        },
      });
      if (profile) setUserInfo(profile);
      setDisableInputs({ ...disableInputs, bio: true });
      setDisplayModals({ ...displayModals, error: true });
    } else {
      if (errors.bio.status)
        setErrors({
          ...errors,
          bio: { message: "", status: false },
        });
      setDisableInputs({ ...disableInputs, bio: true });
      setDisplayModals({
        ...displayModals,
        validation: true,
      });
    }
  }
};
