import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, ProfilePhoto, Typography } from '../../components';
import 'antd/dist/antd.css';
import * as S from './InformationStyled';
import { useAuth } from '../../contexts';

interface State {
  defaultActiveKey: string;
}

interface Location {
  state: State;
}

interface IUserInformationProps {
  location?: Location
}

export const UserInformation = ({ location, ...restProps }: IUserInformationProps) => {
  const { user, isAuthenticated, logout } = useAuth();

  const navigation = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigation('select-profile');
    }
  }, []);

  return (
    <Layout
      hasTabBar
      {...restProps}
    >
      <S.ContainerDesktop>
        <S.ContainerForm>
          <S.UserInformationTitle>
            Informações Pessoais
          </S.UserInformationTitle>
          <S.ContainerProfilePhoto>
            {user.photoURL ? (
              <S.ImgProfile src={user.photoURL} alt={user.name} />
            ) : (
              <ProfilePhoto icon="/assets/svg/icon camera.svg" alt={user.name} />
            )}
            <S.ProfilePhotoText>MUDAR FOTO DE PERFIL</S.ProfilePhotoText>
          </S.ContainerProfilePhoto>
          <S.TabsRegister defaultActiveKey={location?.state?.defaultActiveKey || '1'}>
            <S.TabsChoiced tab="Pessoal" key="1" />
            <S.TabsChoiced tab="Saúde" key="2" />
            <S.TabsChoiced tab="Contatos" key="3" />
          </S.TabsRegister>
          <Typography
            style={{ alignSelf: 'start' }}
            variant="body1"
            onClick={logout}
          >
            Sair
          </Typography>
        </S.ContainerForm>
        <S.Aside>
          <S.AsideImage src="/assets/svg/arte idoso desktop.svg" />
        </S.Aside>
      </S.ContainerDesktop>
    </Layout>
  );
};
