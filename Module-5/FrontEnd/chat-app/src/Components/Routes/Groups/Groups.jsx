import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { messageActions } from "../../Store/message-slice";
import { Image } from "@chakra-ui/react";

const Groups = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(messageActions.setGroupId(props.id));
  }, []);
  return (
    <div
      className="groupPic-and-GroupName"
      onClick={() => props.switchChats(props.id, props.name)}
    >
      <Image src={props.avatar} alt="image" />
      <p>{props.name}</p>
    </div>
  );
};

export default Groups;
