import React, { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Card } from 'reactstrap';

const MobileNavbar = (props) => {
  const history = useHistory();
  const [selected, setSelected] = useState(0);
  const { menuData } = props;
  console.log(menuData);
  const handleNavigate = (item, i) => {
    setSelected(i);
    history.push(item.navLink);
  };
  return (
    <Fragment>
      <div className="mobileTablateView-container" style={{}}>
        <div className="d-flex mobileTablateView">
          {menuData.map((item, i) => {
            return (
              <Button
                outline={selected === i ? false : true}
                color={selected === i ? 'primary' : ''}
                key={i}
                onClick={() => handleNavigate(item, i)}
              >
                <b>{item.icon}</b>
                <b className="ms-1">{item?.title}</b>
              </Button>
            );
          })}
        </div>
      </div>
    </Fragment>
  );
};
export default MobileNavbar;
