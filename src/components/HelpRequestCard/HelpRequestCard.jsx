
import React from "react";
import { differenceInMinutes, parseISO } from "date-fns";
import { useStore } from "../../contexts";
import * as S from "./HelpRequestCardStyled";
import { orderStatusName } from "../../utils/constants";

export const HelpRequestCard = ({
  helpRequestData, isVoluntary,
}) => {
  const { elderlys } = useStore();

  const {
    elderly: { id: elderlyId }, order, createdAt, status,
  } = helpRequestData;

  const elderlyProfile = elderlys
    .find((elderly) => elderly.id === elderlyId);

  const {
    name,
    photoURL,
  } = elderlyProfile;

  const runningTime = differenceInMinutes(new Date(), parseISO(createdAt));

  const verifyWaitingStatus = orderStatusName[status] === "aguardando" && !isVoluntary;

  const hasEmergency = order?.key === "emergency";

  const verifyOrderStatus = (hasEmergency && "emergency")
   || (verifyWaitingStatus && "aguardando")
   || "default";

  const actionsTypes = (hasEmergency && "emergência")
   || (verifyWaitingStatus && "aguardando")
   || "ajudando";

  return (
    <>
      <S.CardWrapper>
        <S.Card
          $variant={verifyOrderStatus}
        >
          <S.UserInfos>
            <S.Request>
              <S.NameTask>
                <S.UserName>
                  {name}
                </S.UserName>
                <S.RequestedTask
                  $colorTask={hasEmergency && "#BC1610"}
                >
                  {order.option}
                </S.RequestedTask>
              </S.NameTask>
              <S.DistanceTimeContainer>
                <S.Distance>
                  Há 0km de distancia
                </S.Distance>
                <S.TaskTime>
                  {`Pedido feito há ${runningTime}MIN`}
                </S.TaskTime>
              </S.DistanceTimeContainer>
            </S.Request>
            <S.UserImage>
              <S.Image
                src={photoURL}
              />
            </S.UserImage>
          </S.UserInfos>
          <S.UserAction
            $variant={verifyOrderStatus}
          >
            <S.ActionDescription
              color={isVoluntary && "#4e3681"}
            >
              {actionsTypes}
              {!isVoluntary
                 && <img src="assets/svg/Vector.svg" alt="next" loading="lazy" />}
            </S.ActionDescription>
          </S.UserAction>
        </S.Card>
      </S.CardWrapper>
    </>
  );
};
