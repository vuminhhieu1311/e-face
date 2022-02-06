import styled from 'styled-components';
import { screenWidth } from '../../utils/Dimensions';

export const Container = styled.View`
    flex: 1;
    padding-left: 10px;
    padding-right: 10px;
    align-items: center;
    background-color: #ffffff;
    padding-bottom: 78px;
`;

export const Card = styled.TouchableOpacity`
    width: 100%;
`;

export const UserInfo = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

export const UserImgWrapper = styled.View`
    padding-top: 15px;
    padding-bottom: 15px;
`;

export const TextSection = styled.View`
    flex-direction: column;
    justify-content: center;
    padding: 15px;
    padding-left: 0;
    margin-left: 10px;
    width: ${screenWidth - 100}px;
    border-bottom-width: 1px;
    border-bottom-color: #f5d0fe;
`;

export const UserInfoText = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 5px;
`;

export const RoomName = styled.Text`
    font-size: 14px;
    font-weight: bold;
`;

export const PostTime = styled.Text`
    font-size: 12px;
    color: #666;
`;

export const MessageText = styled.Text`
    font-size: 14px;
    color: #333333;
`;

export const NotificationText = styled.Text`
    font-size: 14px;
    color: #333333;
    width: 80%;
`;
