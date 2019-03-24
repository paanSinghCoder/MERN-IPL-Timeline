import React from "react";
import { UserCard } from 'react-ui-cards';

const HoverCard = (props) => {

  return (
      <div>
        <UserCard
          cardClass='float'
          href='#'
          header={props.data_coverImgUrl}
          avatar={props.data_dpImgUrl}
          name={props.data_name}
          positionName={props.data_location}
        />
    </div>
  );
};

export default HoverCard;