import { emailProviderLogin, emailProviderRegister } from "./firebase/authEmail";
import { googleProviderLogin } from "./firebase/authGoogle";
import { getByKey, save, update } from "./firebase/handlers";

const basePath = "#21/ajudaqui";

export const loginWithGoogle = async (profileType, profileData) => {
  const {
    user,
    idToken,
    isNewUser,
  } = await googleProviderLogin();

  if (isNewUser) {
    const newUser = await save(
      `${basePath}/${profileType}s`,
      { ...profileData, ...user, profileType },
    );

    return {
      user: newUser,
      idToken,
    };
  }

  const userData = await getByKey(
    `${basePath}/${profileType}s`,
    "email",
    user.email,
  );

  return {
    user: userData,
    idToken,
  };
};

export const registerWithEmailAndPassword = async (credentials, profileType, profileData) => {
  const {
    user,
    idToken,
    isNewUser,
  } = await emailProviderRegister(credentials);

  const { name } = credentials;

  if (isNewUser) {
    const newUser = await save(
      `${basePath}/${profileType}s`,
      {
        ...profileData, ...user, name, profileType,
      },
    );

    return {
      user: newUser,
      idToken,
    };
  }

  const userData = await getByKey(
    `${basePath}/${profileType}s`,
    "email",
    user.email,
  );

  return {
    user: userData,
    idToken,
  };
};

export const loginWithEmailAndPassword = async (credentials, profileType, profileData) => {
  const {
    user,
    idToken,
    isNewUser,
  } = await emailProviderLogin(credentials);

  if (isNewUser) {
    const newUser = await save(
      `${basePath}/${profileType}s`,
      { ...profileData, ...user, profileType },
    );

    return {
      user: newUser,
      idToken,
    };
  }

  const userData = await getByKey(
    `${basePath}/${profileType}s`,
    "email",
    user.email,
  );

  return {
    user: userData,
    idToken,
  };
};

export const updateUserData = async (profileType, id, profileData) => {
  const response = await update(
    `${basePath}/${profileType}s`,
    id,
    profileData,
  );

  return response;
};
