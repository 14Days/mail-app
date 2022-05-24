import React from 'react';
import ManuItem from './manuItem';

const ManuList = ({array}) => {
  return (
    <>
      {array.map((item) => (
        <ManuItem
          key={item.title}
          title={item.title}
          action={item.press}
          icon={item.icon}
        />
      ))}
    </>
  );
};

export default ManuList;
