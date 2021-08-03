import {  notification } from 'antd';

export const openNotification = props => {
  const placement = 'buttomRight';
  notification[props.type]({
    message: props.message,
    description:
      props.description,
      placement
  });
};